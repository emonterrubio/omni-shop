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

export function ProductCard({ product, fromCatalog = false }: { product: ProductCardProps, fromCatalog?: boolean }) {
  const category = inferCategory(product.model, product.category);
  // Eligibility is now based on the recommended property
  const isEligible = product.recommended === true;

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
        <div className="space-y-1 pb-4 flex-1">
          {product.description && <div className="text-gray-700 text-sm leading-tight">{product.description}</div>}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className={`flex items-center font-medium text-sm ${isEligible ? "text-green-600" : "text-gray-600"}`}>
            {isEligible ? (
              <CheckCircle className="w-5 h-5 mr-1" />
            ) : (
              // <AlertCircle className="w-5 h-5 mr-1" />
              ""
            )}
            {isEligible ? "Recommended" : ""}
          </div>
          <Link
            href={fromCatalog ? `/product/${encodeURIComponent(product.model)}?from=catalog` : `/product/${encodeURIComponent(product.model)}`}
            className="flex items-center justify-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors w-auto"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
} 