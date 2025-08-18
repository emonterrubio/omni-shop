import React from 'react';
import Link from 'next/link';

interface ProductInfoPanelProps {
  brand: string;
  title: string;
  sku: string;
  price: number;
  available: boolean;
  deliveryTime: string;
  description: string;
  quantity: number;
  category?: string;
  onQuantityChange?: (qty: number) => void;
  onAddToCart?: () => void;
  onCompare?: () => void;
}

export function ProductInfoPanel({
  brand,
  title,
  sku,
  price,
  available,
  deliveryTime,
  description,
  quantity,
  category,
  onQuantityChange,
  onAddToCart,
  onCompare,
}: ProductInfoPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link href={`/catalog/brand/${encodeURIComponent(brand)}`} className="text-lg font-regular text-blue-600 hover:underline block">
          {brand}
        </Link>
        <h1 className="text-4xl font-regular tracking-normal">{title}</h1>
        <div className="text-gray-500 text-base font-normal mt-1">SKU: {sku}</div>
        <div className="text-3xl font-regular mt-2">${price.toLocaleString()}</div>
        <div className={available ? "font-base text-green-600 font-medium mt-2" : "text-red-600 font-medium mt-1"}>
          {available ? 'Available Now' : 'Out of Stock'}
        </div>
        <div className="text-gray-600 text-base">Delivery time: <span className="font-semibold">{deliveryTime}</span></div>
      </div>
      <div className="text-base text-gray-800 leading-snug">{description}</div>
      <div className="flex items-center gap-2">
        <span>Quantity:</span>
        <select
          className="border rounded px-2 py-1"
          value={quantity}
          onChange={e => onQuantityChange && onQuantityChange(Number(e.target.value))}
          disabled={category === "Laptops" || category === "Desktops"}
        >
          {category === "Laptops" || category === "Desktops" 
            ? [1].map(q => <option key={q} value={q}>{q}</option>)
            : [1,2,3,4,5].map(q => <option key={q} value={q}>{q}</option>)
          }
        </select>
        {(category === "Laptops" || category === "Desktops") && (
          <span className="text-sm text-gray-500 italic">Limited to 1 per order</span>
        )}
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors rounded-md font-medium" onClick={onAddToCart}>Add to Cart</button>
        <button className="flex-1 bg-blue-50 text-blue-600 rounded-md py-2 font-medium hover:bg-blue-100 transition text-center" onClick={onCompare}>Compare</button>
      </div>
      <div className="text-gray-600 text-xs">
        <p>Disclaimer: Specifications, pricing, and availability are subject to change without notice. Product images are for illustrative purposes only and may differ from the actual item. All warranties, if offered, are provided solely by the manufacturer; please refer to the manufacturer’s documentation for full warranty terms. We make no guarantees regarding compatibility with third-party hardware or software. Taxes, shipping, handling, and other fees (if applicable) are calculated at checkout and are not included in the displayed price. By completing your purchase, you acknowledge that you have read and agree to these terms.</p>
      </div>
    </div>
  );
} 