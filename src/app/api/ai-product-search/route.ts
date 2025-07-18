import { NextRequest, NextResponse } from "next/server";
import { hardwareData } from "@/data/hardwareData";
import { headphoneData } from "@/data/headphoneData";
import { monitorData } from "@/data/monitorData";
import { mouseData } from "@/data/mouseData";
import { keyboardData } from "@/data/keyboardData";
import { webcamData } from "@/data/webcamData";
import { dockStationData } from "@/data/dockStationData";
import { backpackData } from "@/data/backpackData";

// Combine all product data into a unified format
function getAllProducts() {
  // Map hardwareData to unified format
  const hardwareProducts = hardwareData.map((item) => ({
    ...item,
    category: item.category || "Hardware",
    searchableText: `${item.brand} ${item.model} ${item.processor || ""} ${item.graphics || ""} ${item.display || ""} ${item.description || ""}`.toLowerCase(),
    // Add spec-based scoring properties
    processorTier: getProcessorTier(item.processor),
    graphicsTier: getGraphicsTier(item.graphics),
    displaySize: extractDisplaySize(item.display),
    priceTier: getPriceTier(item.price),
  }));

  // Map headphoneData to unified format
  const headphoneProducts = headphoneData.map((item) => ({
    ...item,
    category: "Headphones",
    searchableText: `${item.brand} ${item.model} ${item.features || ""} ${item.description || ""}`.toLowerCase(),
    // Add spec-based scoring properties
    priceTier: getPriceTier(item.price),
    recommended: item.recommended,
  }));

  // Map monitorData to unified format
  const monitorProducts = monitorData.map((item) => ({
    ...item,
    category: "Monitors",
    searchableText: `${item.brand} ${item.model} ${item.display_resolution || ""} ${item.display_type || ""} ${item.description || ""}`.toLowerCase(),
    // Add spec-based scoring properties
    resolutionTier: getResolutionTier(item.display_resolution),
    sizeTier: getMonitorSizeTier(item.display_resolution),
    priceTier: getPriceTier(item.price),
    refreshRate: extractRefreshRate(item.refresh_rate),
  }));

  // Map mouseData to unified format
  const mouseProducts = mouseData.map((item) => ({
    ...item,
    category: "Mice",
    searchableText: `${item.brand} ${item.model} ${item.description || ""} ${item.connectivity || ""} ${item.compatibility || ""}`.toLowerCase(),
    // Add spec-based scoring properties
    priceTier: getPriceTier(item.price),
    buttonCount: item.button_quantity,
    recommended: item.recommended,
  }));

  // Map keyboardData to unified format
  const keyboardProducts = keyboardData.map((item) => ({
    ...item,
    category: "Keyboards",
    searchableText: `${item.brand} ${item.model} ${item.connectivity || ""} ${item.compatibility || ""} ${item.description || ""}`.toLowerCase(),
    // Add spec-based scoring properties
    priceTier: getPriceTier(item.price),
    keyCount: item.number_keys,
    recommended: item.recommended,
  }));

  // Map webcamData to unified format
  const webcamProducts = webcamData.map((item) => ({
    ...item,
    category: "Webcams",
    searchableText: `${item.brand} ${item.model} ${item.video_resolution || ""} ${item.display_resolution || ""} ${item.description || ""}`.toLowerCase(),
    // Add spec-based scoring properties
    priceTier: getPriceTier(item.price),
    resolutionTier: getResolutionTier(item.video_resolution),
    recommended: item.recommended,
  }));

  // Map dockStationData to unified format
  const dockStationProducts = dockStationData.map((item) => ({
    ...item,
    category: "Docking Stations",
    searchableText: `${item.brand} ${item.model} ${item.ports || ""} ${item.power || ""} ${item.description || ""}`.toLowerCase(),
    // Add spec-based scoring properties
    priceTier: getPriceTier(item.price),
    recommended: item.recommended,
  }));

  // Map backpackData to unified format
  const backpackProducts = backpackData.map((item) => ({
    ...item,
    category: "Backpacks",
    searchableText: `${item.brand} ${item.model} ${item.features || ""} ${item.size || ""} ${item.capacity || ""} ${item.description || ""}`.toLowerCase(),
    // Add spec-based scoring properties
    priceTier: getPriceTier(item.price),
    recommended: item.recommended,
  }));

  return [
    ...hardwareProducts,
    ...headphoneProducts,
    ...monitorProducts,
    ...mouseProducts,
    ...keyboardProducts,
    ...webcamProducts,
    ...dockStationProducts,
    ...backpackProducts
  ];
}

// Helper functions for spec analysis
function getProcessorTier(processor: string | undefined): number {
  if (!processor) return 1;
  const proc = processor.toLowerCase();
  if (proc.includes("i9") || proc.includes("ryzen 9")) return 5;
  if (proc.includes("i7") || proc.includes("ryzen 7")) return 4;
  if (proc.includes("i5") || proc.includes("ryzen 5")) return 3;
  if (proc.includes("i3") || proc.includes("ryzen 3")) return 2;
  return 1;
}

function getGraphicsTier(graphics: string | undefined): number {
  if (!graphics) return 1;
  const gfx = graphics.toUpperCase();
  if (gfx.includes("RTX 4090") || gfx.includes("RTX 4080")) return 5;
  if (gfx.includes("RTX 4070") || gfx.includes("RTX 4060")) return 4;
  if (gfx.includes("RTX 30") || gfx.includes("GTX 1660")) return 3;
  if (gfx.includes("GTX") || gfx.includes("MX")) return 2;
  return 1;
}

function extractDisplaySize(display: string | undefined): number {
  if (!display) return 0;
  const sizeMatch = display.match(/(\d+(\.\d+)?)/);
  return sizeMatch ? parseFloat(sizeMatch[1]) : 0;
}

function getPriceTier(price: number): number {
  if (price >= 2000) return 5; // Premium
  if (price >= 1000) return 4; // High-end
  if (price >= 500) return 3;  // Mid-range
  if (price >= 200) return 2;  // Budget
  return 1; // Entry-level
}

function getResolutionTier(resolution: string | undefined): number {
  if (!resolution) return 1;
  const res = resolution.toLowerCase();
  if (res.includes("4k") || res.includes("3840")) return 5;
  if (res.includes("2k") || res.includes("2560")) return 4;
  if (res.includes("1080") || res.includes("1920")) return 3;
  if (res.includes("720")) return 2;
  return 1;
}

function getMonitorSizeTier(resolution: string | undefined): number {
  if (!resolution) return 1;
  const res = resolution.toLowerCase();
  if (res.includes("34") || res.includes("ultrawide")) return 5;
  if (res.includes("32") || res.includes("27")) return 4;
  if (res.includes("24") || res.includes("22")) return 3;
  return 2;
}

function extractRefreshRate(refreshRate: string | undefined): number {
  if (!refreshRate) return 60;
  const rateMatch = refreshRate.match(/(\d+)/);
  return rateMatch ? parseInt(rateMatch[1]) : 60;
}

// Smart search function
function smartSearch(query: string, allProducts: any[]) {
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);
  
  // Extract potential brand and category from query
  const brands = ['apple', 'dell', 'hp', 'lenovo', 'microsoft', 'razer', 'bose', 'sony', 'jbl', 'skullcandy', 'logitech', 'cherry', 'arteck', 'keychron', 'nulea', 'acer', 'alienware', 'lg', 'samsung'];
  const categories = ['laptop', 'laptops', 'desktop', 'desktops', 'monitor', 'monitors', 'headphone', 'headphones', 'mouse', 'mice', 'keyboard', 'keyboards', 'webcam', 'webcams', 'dock', 'docking', 'station', 'stations', 'backpack', 'backpacks', 'bag', 'bags', 'product', 'products', 'pc'];
  
  const queryBrand = queryWords.find(word => brands.includes(word));
  const queryCategory = queryWords.find(word => categories.includes(word));
  
  // Check for "best" or "top" queries
  const isBestQuery = queryWords.some(word => ['best', 'top', 'premium', 'high-end', 'elite', 'pro'].includes(word));
  
  // If a specific brand is mentioned, filter to that brand first
  let candidates = allProducts;
  if (queryBrand) {
    candidates = allProducts.filter(product => 
      product.brand.toLowerCase() === queryBrand
    );
  }
  
  // If a specific category is also mentioned, filter further
  if (queryCategory && candidates.length > 0) {
    const categorySingular = queryCategory.replace(/s$/, '');
    candidates = candidates.filter(product => {
      const productCategory = product.category.toLowerCase();
      return productCategory.includes(categorySingular);
    });
  }
  
  // If we have filtered results and it's a "best" query, rank by specs
  if (candidates.length > 0 && isBestQuery) {
    const rankedCandidates = candidates.map(product => {
      let score = 0;
      
      // Base score for being in the filtered set
      score += 100;
      
      // Add spec-based scoring
      if (product.category === "Hardware" || product.category === "Laptops" || product.category === "Desktops") {
        score += (product.processorTier || 1) * 20;
        score += (product.graphicsTier || 1) * 20;
        score += (product.priceTier || 1) * 10;
        if (product.displaySize > 15) score += 10;
      } else if (product.category === "Monitors") {
        score += (product.resolutionTier || 1) * 25;
        score += (product.sizeTier || 1) * 15;
        score += (product.priceTier || 1) * 10;
        if (product.refreshRate >= 144) score += 15;
      } else if (product.category === "Headphones") {
        score += (product.priceTier || 1) * 20;
        if (product.recommended) score += 25;
      } else if (product.category === "Mice") {
        score += (product.priceTier || 1) * 15;
        score += (product.buttonCount || 2) * 5;
        if (product.recommended) score += 20;
      } else if (product.category === "Keyboards") {
        score += (product.priceTier || 1) * 15;
        score += (product.keyCount || 87) / 10;
        if (product.recommended) score += 20;
      } else if (product.category === "Webcams") {
        score += (product.priceTier || 1) * 15;
        score += (product.resolutionTier || 1) * 20;
        if (product.recommended) score += 20;
      } else if (product.category === "Docking Stations") {
        score += (product.priceTier || 1) * 15;
        if (product.recommended) score += 20;
      } else if (product.category === "Backpacks") {
        score += (product.priceTier || 1) * 10;
        if (product.recommended) score += 15;
      }
      
      return { ...product, score };
    });
    
    // For "best" queries, return only top 3 results
    return rankedCandidates.sort((a, b) => b.score - a.score).slice(0, 3);
  }
  
  // If we have filtered results, return them directly
  if (candidates.length > 0) {
    return candidates.map(product => ({ ...product, score: 100 }));
  }
  
  // Fallback: Score each product based on relevance (only if no specific brand/category match)
  const scoredProducts = allProducts.map(product => {
    let score = 0;
    const productText = product.searchableText;
    
    // Exact brand match gets high score
    if (queryBrand && product.brand.toLowerCase() === queryBrand) {
      score += 100;
    }
    
    // Partial brand match
    if (queryBrand && product.brand.toLowerCase().includes(queryBrand)) {
      score += 50;
    }
    
    // Category match
    if (queryCategory) {
      const productCategory = product.category.toLowerCase();
      if (productCategory.includes(queryCategory.replace(/s$/, ''))) {
        score += 75;
      }
    }
    
    // Exact phrase match
    if (productText.includes(normalizedQuery)) {
      score += 200;
    }
    
    // Individual word matches
    queryWords.forEach(word => {
      if (productText.includes(word)) {
        score += 10;
      }
    });
    
    // Special handling for "products" queries
    if (queryWords.includes('product') || queryWords.includes('products')) {
      if (queryBrand && product.brand.toLowerCase() === queryBrand) {
        score += 150; // High score for brand + products query
      }
    }
    
    // Special handling for brand + category combinations
    if (queryBrand && queryCategory) {
      const productCategory = product.category.toLowerCase();
      if (product.brand.toLowerCase() === queryBrand && 
          productCategory.includes(queryCategory.replace(/s$/, ''))) {
        score += 300; // Very high score for exact brand + category match
      }
    }
    
    return { ...product, score };
  });
  
  // Filter out products with no relevance and sort by score
  const relevantProducts = scoredProducts
    .filter(product => product.score > 0)
    .sort((a, b) => b.score - a.score);
  
  return relevantProducts;
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json(
        { error: "Missing query" },
        { status: 400 }
      );
    }

    // Get all products
    const allProducts = getAllProducts();
    
    // Perform smart search
    const searchResults = smartSearch(query, allProducts);
    
    // Return top results - cap "best" queries at 3, others at 20
    const isBestQuery = query.toLowerCase().includes('best') || query.toLowerCase().includes('top') || query.toLowerCase().includes('premium') || query.toLowerCase().includes('high-end') || query.toLowerCase().includes('elite') || query.toLowerCase().includes('pro');
    const maxResults = isBestQuery ? 3 : 20;
    const results = searchResults.slice(0, maxResults);
    
    console.log(`Search for "${query}" returned ${results.length} results`);
    
    return NextResponse.json({ 
      results,
      totalFound: searchResults.length,
      query: query
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}