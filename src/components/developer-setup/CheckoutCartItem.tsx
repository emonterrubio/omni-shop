import React from 'react';
import Image from 'next/image';

interface CheckoutCartItemProps {
  item: {
    model: string;
    brand: string;
    image: string;
    price: number | string;
    quantity: number;
    recommended: boolean;
  };
}

export function CheckoutCartItem({ item }: CheckoutCartItemProps) {
  const price = typeof item.price === 'string' ? Number(item.price.replace(/,/g, '')) : item.price;

  return (
    <div className="flex items-start gap-2 py-3 border-b border-gray-200">
      {/* Image */}
      <div className="w-16 h-12 flex-shrink-0 relative">
        <Image src={item.image} alt={item.model} fill className="object-contain" />
      </div>
      {/* Product Details */}
      <div className="flex-1">
        <p className="font-medium text-sm text-gray-900 leading-tight mb-1">{item.brand} {item.model}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-800">Qty {item.quantity}</p>
          {/* {item.recommended && (
            <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-md ml-2">Recommended</span>
          )} */}
        </div>
      </div>
      {/* Price */}
      <p className="font-medium text-sm text-gray-900">${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    </div>
  );
} 