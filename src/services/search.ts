import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
import { ProductCardProps } from "@/types/ProductCardProps";
import { analyzeSearchQuery, scoreProductByIntent, generateSuggestions, SearchIntent } from "./ai";

export interface SearchResult {
  results: ProductCardProps[];
  suggestions: string[];
  intent?: SearchIntent;
}

function getAllProducts(): any[] {
  const computers = hardwareData.map(item => ({ ...item }));
  const monitors = monitorData.map(item => ({
    ...item,
    category: "Monitors",
    features: `${item.display_resolution}, ${item.aspect_ratio}, ${item.display_type}`,
  }));
  return [...computers, ...monitors];
}

function normalizeProduct(product: any): any {
  return {
    ...product,
    searchableText: Object.values(product)
      .filter(value => typeof value === "string")
      .join(" ")
      .toLowerCase(),
    specs: {
      processor: product.processor?.toLowerCase() || "",
      memory: product.memory?.toLowerCase() || "",
      storage: product.storage?.toLowerCase() || "",
      display: product.display?.toLowerCase() || "",
      graphics: product.graphics?.toLowerCase() || "",
      brand: product.brand?.toLowerCase() || "",
      category: product.category?.toLowerCase() || "",
    }
  };
}

function getInitialMatches(products: any[], query: string): any[] {
  const normalizedQuery = query.toLowerCase().trim();
  return products
    .map(normalizeProduct)
    .filter(product => product.searchableText.includes(normalizedQuery));
}

export async function searchProducts(query: string): Promise<SearchResult> {
  console.log('Starting search for query:', query);
  
  try {
    // 1. Analyze search intent
    console.log('Analyzing search intent...');
    const intent = await analyzeSearchQuery(query);
    console.log('Search intent:', intent);
    
    // 2. Get initial matches based on text search
    console.log('Getting initial matches...');
    const allProducts = getAllProducts();
    const initialMatches = getInitialMatches(allProducts, query);
    console.log('Initial matches:', initialMatches.length);
    
    // 3. Score and rank products based on intent
    console.log('Scoring products...');
    const scoredProducts = await Promise.all(
      initialMatches.map(async (product) => {
        const score = await scoreProductByIntent(product, intent);
        return { ...product, score };
      })
    );
    console.log('Scored products:', scoredProducts.length);
    
    // 4. Sort by score and convert to ProductCardProps
    const results = scoredProducts
      .sort((a, b) => b.score - a.score)
      .map(product => ({
        brand: product.brand,
        model: product.model,
        category: product.category,
        description: product.description,
        features: product.features,
        image: product.image,
        price: product.price,
        recommended: typeof product.recommended === 'boolean' ? product.recommended : false,
      }));

    // 5. Generate suggestions if no results or for refinement
    console.log('Generating suggestions...');
    const suggestions = await generateSuggestions(intent, allProducts);
    console.log('Generated suggestions:', suggestions);

    return {
      results: results.map(product => ({
        ...product,
        recommended: typeof product.recommended === 'boolean' ? product.recommended : false,
      })),
      suggestions,
      intent
    };
  } catch (error) {
    console.error('Search error:', error);
    // Fallback to basic search if AI analysis fails
    console.log('Falling back to basic search...');
    const normalizedQuery = query.toLowerCase().trim();
    const allProducts = getAllProducts();
    const results = allProducts.filter(product => {
      const searchableText = Object.values(product)
        .filter(value => typeof value === "string")
        .join(" ")
        .toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    const availableBrands = Array.from(new Set(allProducts.map(p => p.brand)));
    const availableCategories = Array.from(new Set(allProducts.map(p => p.category)));
    const suggestions = [...availableBrands, ...availableCategories];

    return { results, suggestions };
  }
}