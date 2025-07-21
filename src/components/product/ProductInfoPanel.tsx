import React from 'react';

interface ProductInfoPanelProps {
  title: string;
  sku: string;
  price: number;
  available: boolean;
  deliveryTime: string;
  description: string;
  quantity: number;
  onQuantityChange?: (qty: number) => void;
  onAddToCart?: () => void;
  onCompare?: () => void;
}

export function ProductInfoPanel({
  title,
  sku,
  price,
  available,
  deliveryTime,
  description,
  quantity,
  onQuantityChange,
  onAddToCart,
  onCompare,
}: ProductInfoPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl font-medium tracking-normal">{title}</h1>
        <div className="text-gray-500 text-base font-medium mt-2">SKU: {sku}</div>
        <div className="text-3xl font-semibold mt-2">${price.toLocaleString()}</div>
        <div className={available ? "font-base text-green-600 font-medium mt-1" : "text-red-600 font-medium mt-1"}>
          {available ? 'Available Now.' : 'Out of Stock'}
        </div>
        <div className="text-gray-600 text-base">Delivery time: <span className="font-semibold">{deliveryTime}</span></div>
      </div>
      <div className="text-gray-700">{description}</div>
      <div className="flex items-center gap-2">
        <span>Quantity:</span>
        <select
          className="border rounded px-2 py-1"
          value={quantity}
          onChange={e => onQuantityChange && onQuantityChange(Number(e.target.value))}
        >
          {[1,2,3,4,5].map(q => <option key={q} value={q}>{q}</option>)}
        </select>
      </div>
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onAddToCart}>Add to Cart</button>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded" onClick={onCompare}>Compare</button>
      </div>
    </div>
  );
} 