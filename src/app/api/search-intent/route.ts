import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  // Call OpenAI API
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
  }

  const prompt = `You are an intent parser for an IT equipment store. Given a user search query, return a JSON object with the intent and any relevant parameters.\n\nExamples:\nQuery: 'apple computers'\n{ "intent": "brand_search", "brand": "Apple", "category": "Laptops" }\nQuery: 'best laptops available'\n{ "intent": "best_of", "category": "Laptops", "top": 5 }\nQuery: 'monitors with 4k resolution'\n{ "intent": "feature_search", "category": "Monitors", "feature": "4k resolution" }\n\nQuery: '${query}'\n`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful intent parser for an IT equipment store." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
      temperature: 0,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "OpenAI API error" }, { status: 500 });
  }

  const data = await response.json();
  // Extract JSON from the AI's response
  let intentResult = {};
  try {
    const text = data.choices[0].message.content.trim();
    intentResult = JSON.parse(text);
  } catch (e) {
    return NextResponse.json({ error: "Failed to parse intent JSON" }, { status: 500 });
  }

  return NextResponse.json(intentResult);
} 