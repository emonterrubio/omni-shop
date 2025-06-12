import { CheckCircle, AlertCircle } from "lucide-react";
import React from "react";

interface ComparisonProductCardProps {
  image: string;
  brand: string;
  model: string;
  description: string;
  features: string;
  subFeatures: string[];
  price: string;
  chip: string;
}

export function ComparisonProductCard({
  image,
  brand,
  model,
  description,
  features,
  subFeatures,
  price,
  chip,
}: ComparisonProductCardProps) {
  // Split features string into array by comma
  const featureList = features.split(',').map(f => f.trim());
  const isEligible = true;

  return (
    <div className="bg-white rounded-2xl shadow-md w-full flex flex-col h-full">
      <div className="w-full text-center bg-gray-100 relative mb-3 p-4">
        {/* Brand */}
        <div className="text-sm font-medium text-blue-600 mb-2">{brand}</div>

        {/* Product Title */}
        <h2 className="text-2xl font-medium pb-4">{model}</h2>

        {/* Product Image */}
        <img src={image} alt={model} className="w-48 h-32 object-contain mx-auto mb-4" />
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center text-center py-4 px-6 w-full">
        {/* Chip/Badge */}
        <div className="flex items-center mb-2">
          <span className="bg-gray-200 text-gray-900 text-xs px-2 py-1 rounded-md font-medium">{chip}</span>
        </div>

        {/* Description */}
        <div className="text-sm leading-snug font-medium text-gray-900 text-center mt-2">{description}</div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 my-6"></div>

        <div className="flex flex-col items-start w-full">
          {/* Features */}
            {/* <div className="text-sm text-gray-800 mb-2 text-left">{features}</div> */}

            {/* Sub-features */}
            <ul className="text-left mb-2 list-none">
              {subFeatures.map((sf, i) => (
                <li key={i} className="text-sm text-gray-800 mb-1 text-left ml-4 list-disc list-outside">{sf}</li>
              ))}
            </ul>
        </div>
      </div>
      {/* Footer anchored to bottom */}
      <div className="flex flex-col w-full items-center mt-auto space-y-2 pb-4 px-6">
        <div className={`flex items-center font-medium text-sm ${isEligible ? "text-green-600" : "text-red-600"}`}>
          {isEligible ? <CheckCircle className="w-5 h-5 mr-1" /> : <AlertCircle className="w-5 h-5 mr-1" />}
          {isEligible ? "Recommended" : ""}
        </div>
        <div className="text-gray-600 text-sm">Recommended based on your role</div>
        <div className="text-2xl font-semibold">${price}.00</div>
        <button className="w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition">
          Select
        </button>
      </div>
    </div>
  );
} 