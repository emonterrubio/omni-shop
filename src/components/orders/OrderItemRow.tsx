import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { OrderItem } from '@/types/orders';
import { CartContext } from '@/components/CartContext';

interface OrderItemRowProps {
  item: OrderItem;
}

export function OrderItemRow({ item }: OrderItemRowProps) {
  const { addToCart } = useContext(CartContext);

  const handleBuyAgain = () => {
    addToCart({
      model: item.model,
      brand: item.brand,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      recommended: false,
      description: item.description,
      card_description: item.description,
    });
  };

  return (
    <div className="px-6 py-6">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="w-16 h-12 relative flex-shrink-0">
          <Image 
            src={item.image} 
            alt={item.model} 
            fill 
            className="object-contain rounded" 
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-lg font-medium text-gray-900 truncate">
                {item.brand} {item.model}
              </div>
              <div className="text-base text-gray-800 truncate">
                {item.description}
              </div>
            </div>
            
            {/* Price and Actions */}
            <div className="flex items-center gap-4">
              {/* <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${item.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </div>
              </div> */}
              
              {/* Action Buttons */}
              <div className="flex gap-2">
              <button
                  onClick={handleBuyAgain}
                  className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                  Buy it again
                </button>
                <Link
                  href={`/product/${encodeURIComponent(item.model)}`}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-600 hover:text-blue-800 hover:bg-blue-200 font-medium"
                >
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 