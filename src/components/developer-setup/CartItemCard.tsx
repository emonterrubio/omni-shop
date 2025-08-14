import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface CartItemCardProps {
  item: {
    model: string;
    brand: string;
    description?: string;
    card_description?: string;
    image: string;
    price: number | string;
    recommended?: boolean;
    quantity: number;
    sku?: string;
    category?: string;
  };
  onQuantityChange: (model: string, quantity: number) => void;
  onRemove: (model: string) => void;
  onCompare: (model: string) => void;
  onShare?: (model: string) => void;
}

export function CartItemCard({ item, onQuantityChange, onRemove, onCompare, onShare }: CartItemCardProps) {
  // Helper function to infer category from model name if not provided
  const inferCategory = (model: string): string => {
    const name = model.toLowerCase();
    if (name.includes("macbook") || name.includes("latitude") || name.includes("xps") || name.includes("surface") || name.includes("laptop") || name.includes("thinkpad") || name.includes("yoga")) return "Laptops";
    if (name.includes("tower") || name.includes("precision") || name.includes("desktop") || name.includes("thinkcentre")) return "Desktops";
    return "Other";
  };
  
  // Check if item is a laptop or desktop (to disable + button)
  const itemCategory = item.category || inferCategory(item.model);
  const isLaptopOrDesktop = itemCategory === 'Laptops' || itemCategory === 'Desktops';
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      onQuantityChange(item.model, newQuantity);
    }
  };

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') {
      return `$${Number(price.replace(/,/g, '')).toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleShare = () => {
    if (onShare) {
      onShare(item.model);
    } else {
      // Default share behavior - copy product URL to clipboard
      const productUrl = `${window.location.origin}/product/${item.model}`;
      navigator.clipboard.writeText(productUrl).then(() => {
        // You could add a toast notification here
        console.log('Product URL copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy URL: ', err);
      });
    }
  };

  return (
    <div className="flex items-start gap-4 py-6 px-2 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 relative">
        <Image 
          src={item.image} 
          alt={item.model} 
          fill 
          className="object-contain rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-medium text-gray-900">
              {item.brand} {item.model}
            </h3>
            {item.sku && (
              <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
            )}
            {(item.card_description || item.description) && (
              <p className="text-sm text-gray-600 mb-3">{item.card_description || item.description}</p>
            )}

            
            {/* Quantity Controls and Action Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Controls */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => item.quantity === 1 ? onRemove(item.model) : handleQuantityChange(item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    {item.quantity === 1 ? (
                      <Trash2 className="w-4 h-4" />
                    ) : (
                      "-"
                    )}
                  </button>
                  <span className="px-2 py-1 text-gray-900 font-medium min-w-[2rem] text-sm text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={item.quantity >= 10 || isLaptopOrDesktop}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                {isLaptopOrDesktop && (
                  <p className="text-xs text-gray-500 italic">
                    Limited to 1 per order
                  </p>
                )}
              </div>
              
              {/* Action Links */}
              <div className="flex items-center text-sm">
                <button
                  onClick={() => onRemove(item.model)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Delete
                </button>
                <span className="mx-2 text-gray-400">|</span>
                <button
                  onClick={() => onCompare(item.model)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  <span className="hidden lg:inline">Compare with similar items</span>
                  <span className="lg:hidden">Compare</span>
                </button>
                <span className="mx-2 text-gray-400">|</span>
                <button
                  onClick={handleShare}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-right ml-4">
            <p className="text-xl font-medium text-gray-900">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 