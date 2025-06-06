import { NextRequest, NextResponse } from "next/server";
import { hardwareData } from "@/data/hardwareData";
import OpenAI from "openai";
import { z } from "zod";

// Initialize OpenAI client (singleton)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Precompute numeric tiers for all hardwareData entries on module load
hardwareData.forEach((p) => {
  // Extract display size (in inches) from the display string
  const sizeMatch = p.display?.match(/(\d+(\.\d+)?)/);
  (p as any).displaySize = sizeMatch ? parseFloat(sizeMatch[1]) : 0;

  // Determine processor tier: i9 => 3, i7 => 2, else => 1
  const proc = p.processor?.toLowerCase() || "";
  (p as any).processorTier = proc.includes("i9")
    ? 3
    : proc.includes("i7")
    ? 2
    : 1;

  // Determine graphics tier: RTX => 3, GTX => 2, else => 1
  const gfx = p.graphics?.toUpperCase() || "";
  (p as any).graphicsTier = gfx.includes("RTX")
    ? 3
    : gfx.includes("GTX")
    ? 2
    : 1;
});

// Helper: Compute a simple numeric score for a laptop
function laptopScore(p: any): number {
  const procTier = p.processorTier || 1;
  const gfxTier = p.graphicsTier || 1;
  const dispTier =
    p.displaySize > 15 ? 3 : p.displaySize > 13 ? 2 : 1;
  return procTier + gfxTier + dispTier;
}

// Zod schema for intent classification
const IntentSchema = z.object({
  type: z.enum([
    "brand_specific",
    "best_of",
    "use_case",
    "feature_specific",
    "general",
  ]),
  category: z.string().nullable(),
});

// Zod schema for filtering response: array of strings
const ModelsArraySchema = z.array(z.string());

// ========================
// API Route Handler
// ========================
export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query) {
    return NextResponse.json(
      { error: "Missing query" },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OpenAI API key" },
      { status: 500 }
    );
  }

  // Normalize query text
  const normalizedQuery = query.toLowerCase();

  // 1) Classify intent (e.g., best_of + laptops)
  const classifyPrompt = `
You are a search intent classifier for an IT hardware store. 
Given the user query, return exactly one JSON object:
{
  "type": (string, one of ["brand_specific","best_of","use_case","feature_specific","general"]),
  "category": (string|null)   // e.g., "laptops" or null if not clear
}
Only output JSON. Do not include any commentary.

User query: "${query}"

Note: If the query includes terms like 'best', 'top', or 'recommended', classify it as 'best_of'.
`;

  let intentObj;
  try {
    const intentResp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.0,
      max_tokens: 50,
      messages: [
        {
          role: "system",
          content:
            "You are a search intent classifier for an IT hardware store.",
        },
        { role: "user", content: classifyPrompt },
      ],
    });
    const rawIntent = intentResp.choices[0].message.content?.trim();
    intentObj = IntentSchema.parse(
      JSON.parse(rawIntent || "{}")
    );
    console.log("Intent classification:", intentObj);
  } catch (e) {
    return NextResponse.json(
      { error: "Intent classification failed" },
      { status: 500 }
    );
  }

  // 2) If "best_of" + "laptops", locally rank and return top 5
  if (
    intentObj.type === "best_of" &&
    intentObj.category &&
    intentObj.category.toLowerCase().includes("laptop")
  ) {
    const allLaptops = hardwareData.filter(
      (p) => p.category && p.category.toLowerCase().includes("laptop")
    );
    const top5 = allLaptops
      .sort((a, b) => laptopScore(b) - laptopScore(a))
      .slice(0, 5);
    return NextResponse.json({ results: top5 });
  }

  // 3) Otherwise, for other intents, filter by category first if provided
  let candidates = hardwareData;
  if (intentObj.category) {
    candidates = hardwareData.filter(
      (p) => p.category === intentObj.category
    );
  }
  console.log("Number of candidates after category filter:", candidates.length);

  // Limit to first 20 items to avoid large payloads
  const sampleProducts = candidates.slice(0, 20);

  // Only include essential fields for AI filtering
  const slimProducts = sampleProducts.map((p) => ({
    model: p.model,
    brand: p.brand,
    processor: p.processor,
    graphics: p.graphics,
    display: p.display,
    price: p.price,
  }));

  // 4) Ask AI to return matching models
  const filterPrompt = `
You are a product search assistant. Given a user query and an array of hardware products (with attributes: model, brand, processor, graphics, display, price), return exactly one JSON array of the most relevant models.

User query: "${query}"

Products:
${JSON.stringify(slimProducts, null, 2)}

Output: ["Model A", "Model B", ...]. Only output valid JSON—no commentary.
`;

  let models: string[];
  try {
    const filterResp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.0,
      max_tokens: 100,
      messages: [
        {
          role: "system",
          content: "You are a product search assistant.",
        },
        { role: "user", content: filterPrompt },
      ],
    });
    const rawModels = filterResp.choices[0].message.content?.trim();
    models = ModelsArraySchema.parse(JSON.parse(rawModels || "[]"));
    console.log("Models returned by AI:", models);
  } catch (e) {
    return NextResponse.json(
      { error: "Filtering AI response failed" },
      { status: 500 }
    );
  }

  // 5) Retrieve full product objects for matching models
  const matched = hardwareData.filter((p) =>
    models.includes(p.model)
  );
  console.log("Number of matched products:", matched.length);

  return NextResponse.json({ results: matched });
}