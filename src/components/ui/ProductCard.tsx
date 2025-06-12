import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { ProductCardProps } from "@/types/ProductCardProps";
import Link from "next/link";

const PLACEHOLDER_IMAGE = "https://placehold.co/128x128?text=No+Image";

function inferCategory(model: string, category: string): string {
  // First try to use the provided category
  if (category) return category;
  
  // Fallback to model-based inference
  const name = model.toLowerCase();
  if (name.includes("macbook") || name.includes("latitude") || name.includes("xps") || name.includes("surface")) return "Laptops";
  if (name.includes("tower") || name.includes("precision")) return "Desktops";
  if (name.includes("monitor") || name.includes("display")) return "Monitors";
  if (name.includes("headphone") || name.includes("earbud")) return "Audio";
  if (name.includes("mouse") || name.includes("keyboard")) return "Accessories";
  return "Other";
}

export function ProductCard({ product }: { product: ProductCardProps }) {
  const category = inferCategory(product.model, product.category);
  // For demo, treat all as eligible if price exists (or you can adjust this logic)
  const isEligible = Boolean(product.price);

  console.log("ProductCard brand:", product.brand);
  console.log("SERVER/CLIENT", typeof window === "undefined" ? "server" : "client", product.model);

  return (
    <div className="flex flex-col max-w-md w-full mx-auto h-full bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="w-full bg-gray-200 relative mb-3 rounded-t-lg">
        <img
          src={product.image || PLACEHOLDER_IMAGE}
          alt={product.model}
          className="w-full h-40 object-contain mt-6 -mb-3"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 w-full h-full">
        {/* Category */}
        <span className="text-blue-600 text-sm font-medium mb-1">{product.brand}</span>
        {/* Model Name */}
        <h3 className="text-xl font-medium text-gray-900 mb-1">{product.model}</h3>
        <div className="space-y-1 pb-4">
          {product.description && <div className="text-gray-700 text-sm leading-tight">{product.description}</div>}
        </div>
        <div className={`flex items-center font-medium text-sm mb-1 ${isEligible ? "text-green-600" : "text-red-600"}`}>
          {isEligible ? (
            <CheckCircle className="w-5 h-5 mr-1" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-1" />
          )}
          {isEligible ? "Eligible" : "Not Eligible"}
        </div>
        <div className="text-gray-400 text-sm mb-2">
          {isEligible ? "Recommended based on your role" : "Not recommended"}
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-end gap-2 mt-4">
          <Link
            href={`/product/${encodeURIComponent(product.model)}`}
            // className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-auto"
            className="flex items-center justify-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors w-auto"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
} 