import { CheckCircle, AlertCircle } from "lucide-react";
import React, { useContext } from "react";
import { CartContext, CartItem } from "@/components/CartContext";
import Link from "next/link";

interface ComparisonProductCardProps {
  image: string;
  brand: string;
  model: string;
  description: string;
  features: string;
  subFeatures: string[];
  price: number;
  chip: string;
  specs: { label: string; value: any }[];
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
  specs,
}: ComparisonProductCardProps) {
  // Split features string into array by comma
  const featureList = features.split(',').map(f => f.trim());
  const isEligible = true;
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    console.log("[Comparison Debug] Adding to cart:", model, "Price:", price, "Type:", typeof price);
    const cartItem: CartItem = {
      model,
      brand,
      image,
      price: price,
      quantity: 1,
      recommended: isEligible,
      description,
    };
    addToCart(cartItem);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md w-full flex flex-col">
      <div className="w-full text-center bg-gray-100 relative mb-3 p-4 pt-6">
        {/* Brand (clickable link) */}
        <Link href={`/catalog/brand/${encodeURIComponent(brand)}`} className="text-sm font-medium text-blue-600 mb-2 hover:underline block">
          {brand}
        </Link>
        {/* Product Title (clickable link) */}
        <Link
          href={`/product/${encodeURIComponent(model)}`}
          className="block"
        >
          <h2 className="text-2xl font-medium pb-4 hover:text-blue-600 transition-colors cursor-pointer">{model}</h2>
        </Link>
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
        {/* Full Specs */}
        <div className="flex flex-col items-start w-full">
          <ul className="text-left mb-2 list-none">
            {specs.filter(s => s.value).map((spec, i) => (
              <li key={i} className="text-sm text-gray-800 mb-1 text-left ml-4 list-disc list-outside">
                <span className="font-semibold">{spec.label}:</span> {spec.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Footer anchored to bottom */}
      <div className="flex flex-col w-full items-center mt-auto space-y-2 pb-6 px-6">
        <div className={`flex items-center font-medium text-sm ${isEligible ? "text-green-600" : "text-red-600"}`}>
          {isEligible ? <CheckCircle className="w-5 h-5 mr-1" /> : <AlertCircle className="w-5 h-5 mr-1" />}
          {isEligible ? "Available" : ""}
        </div>
        <div className="text-gray-600 text-sm">Recommended based on your role</div>
        <div className="text-2xl font-semibold">${price.toLocaleString()}.00</div>
        <button 
          className="w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 