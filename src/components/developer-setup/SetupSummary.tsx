import React, { useState, useEffect } from 'react';
import { SummaryProductCard } from './SummaryProductCard';

// This should be a shared type, but for now, we define it here.
interface Item {
  model: string;
  brand: string;
  description: string;
  image: string;
  price: number | string;
  recommended: boolean;
  quantity?: number;
}

interface SetupSummaryProps {
  selectedItems: Item[];
  onEdit: () => void;
  onCheckout: (costCenter?: string) => void;
}

export function SetupSummary({ selectedItems, onEdit, onCheckout }: SetupSummaryProps) {
  const [cart, setCart] = useState(selectedItems.map(item => ({ ...item, quantity: 1 })));
  const [costCenterInput, setCostCenterInput] = useState('');
  const [costCenter, setCostCenter] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'free' | 'express'>('express');

  useEffect(() => {
    setCart(selectedItems.map(item => ({ ...item, quantity: 1 })));
  }, [selectedItems]);

  const handleQuantityChange = (model: string, quantity: number) => {
    setCart(prev => prev.map(item =>
      item.model === model ? { ...item, quantity } : item
    ));
  };

  const handleRemove = (model: string) => {
    setCart(prev => prev.filter(item => item.model !== model));
  };

  const handleApplyCostCenter = () => {
    setCostCenter(costCenterInput.trim());
  };

  const subtotal = cart.reduce((sum, item) => {
    let price = 0;
    if (typeof item.price === 'string') {
      price = Number((item.price as string).replace(/,/g, ''));
    } else if (typeof item.price === 'number') {
      price = item.price;
    }
    return sum + price * (item.quantity || 1);
  }, 0);

  const shippingCost = shippingMethod === 'express' ? 14 : 0;
  const total = subtotal + shippingCost;

  return (
    <div>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4">Summary</h1>
        <h4 className="max-w-2xl mx-auto font-base text-center text-gray-600 mb-8">Review and confirm your Developer Setup bundle details.</h4>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Left Column: Products and Shipping */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Your Order</h2>
              <p className="text-gray-600">There are {cart.length} products in your cart</p>
            </div>
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 font-medium text-base">Edit</button>
          </div>
          {/* Products */}
          <div className="flex flex-col gap-2">
            {cart.map(item => (
              <SummaryProductCard
                key={item.model}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Shipping Method */}
          <div className="mt-4">
            <h3 className="text-2xl font-semibold tracking-tight mb-4">Shipping Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${shippingMethod === 'free' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-300'}`}>
                <input type="radio" name="shipping" value="free" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <div className="ml-4 flex-grow">
                  <p className="font-semibold text-gray-800">Free Shipping</p>
                  <p className="text-sm text-gray-500">7-20 days</p>
                </div>
                <p className="font-semibold text-gray-800">$0</p>
              </label>
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-300'}`}>
                <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <div className="ml-4 flex-grow">
                  <p className="font-semibold text-gray-800">Express Shipping</p>
                  <p className="text-sm text-gray-500">1-3 days</p>
                </div>
                <p className="font-semibold text-gray-800">$14</p>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Cost Center and Order Checkout */}
        <div className="flex flex-col gap-2">
          {/* Cost Center */}
          <div className="bg-white rounded-md border border-gray-200 p-6 h-fit">
            <label className="block font-medium text-gray-700 mb-2">Cost Center</label>
            <p className="text-gray-500 mb-2">Expedite your check out</p>
            <div className="flex gap-2">
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Enter cost center"
                value={costCenterInput}
                onChange={e => setCostCenterInput(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-blue-700 transition" type="button" onClick={handleApplyCostCenter}>Apply</button>
            </div>
          </div>
          {/* Order Checkout */}
          <div className="bg-white rounded-md border border-gray-200 p-6 h-fit">
            <div>
              <h3 className="font-semibold text-lg mb-2">Total</h3>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Shipping Cost [+]</span>
                <span>${shippingCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              {costCenter && (
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Cost Center</span>
                  <span className="font-bold">{costCenter}</span>
                </div>
              )}
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between font-bold text-xl mt-2">
                <span>Total</span>
                <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button 
              onClick={() => onCheckout(costCenter)}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 