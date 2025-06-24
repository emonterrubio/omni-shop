import React from 'react';
import { CheckoutCartItem } from './CheckoutCartItem';

interface Item {
  model: string;
  brand: string;
  image: string;
  price: number | string;
  quantity: number;
  recommended: boolean;
}

interface CheckoutCartProps {
  items: Item[];
  shippingCost: number;
  costCenter?: string;
  disabled?: boolean;
  onPlaceOrder?: () => void;
}

export function CheckoutCart({ items, shippingCost, costCenter, disabled, onPlaceOrder }: CheckoutCartProps) {
  const subtotal = items.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const total = subtotal + shippingCost;

  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight mb-4">Your Cart</h3>
      <div className="bg-white rounded-md border border-gray-200 p-6">
        <div className="flex justify-between font-semibold text-lg text-gray-900 border-b border-gray-200 pb-4">
          <span className="text-base font-semibold text-gray-600">Product</span>
          <span className="text-base font-semibold text-gray-600">Price</span>
        </div>
        <div className="flex flex-col border-b border-gray-200 pb-2">
          {items.map(item => <CheckoutCartItem key={item.model} item={item} />)}
        </div>
        <div className="py-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Shipping Cost (+)</span>
            <span>${shippingCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          {costCenter && (
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Cost Center</span>
              <span>{costCenter}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-lg text-gray-900 border-t border-gray-200 pt-4">
            <span>Total</span>
            <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled} onClick={() => { if (!disabled && onPlaceOrder) onPlaceOrder(); }}>
          Place an Order
        </button>
      </div>    
    </div>
  );
} 