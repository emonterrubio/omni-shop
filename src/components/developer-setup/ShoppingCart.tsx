import React, { useState, useEffect, useContext } from 'react';
import { SummaryProductCard } from './SummaryProductCard';
import { CartItemCard } from './CartItemCard';
import { OrderSummary } from '../ui/OrderSummary';
import { CostCenter } from '../ui/CostCenter';
import { SquarePen } from "lucide-react";
import { CartContext } from '../CartContext';
import { useRouter } from 'next/navigation';

// This should be a shared type, but for now, we define it here.
interface Item {
  model: string;
  brand: string;
  description?: string;
  image: string;
  price: number | string;
  recommended: boolean;
  quantity?: number;
}

interface ShoppingCartProps {
  selectedItems: Item[];
  onEdit: () => void;
  onCheckout: (costCenter?: string, shippingMethod?: 'free' | 'express') => void;
  onRemove?: (model: string) => void;
}

export function ShoppingCart({ selectedItems, onEdit, onCheckout, onRemove }: ShoppingCartProps) {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const router = useRouter();
  const [costCenter, setCostCenter] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'free' | 'express'>('express');

  // Use cartItems from context instead of local state
  const cart = cartItems.length > 0 ? cartItems : selectedItems.map(item => ({ ...item, quantity: item.quantity || 1 }));

  const handleQuantityChange = (model: string, quantity: number) => {
    updateQuantity(model, quantity);
  };

  const handleRemove = (model: string) => {
    if (onRemove) {
      // Use the external remove function (e.g., from CartContext)
      onRemove(model);
    } else {
      // Use CartContext remove function
      removeFromCart(model);
    }
  };

  const handleCompare = (model: string) => {
    router.push(`/compare/cart-item/${encodeURIComponent(model)}`);
  };

  const handleCostCenterChange = (newCostCenter: string) => {
    setCostCenter(newCostCenter);
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

  const tax = Math.round((subtotal * 0.047) * 100) / 100; // 4.7% tax rate, rounded to 2 decimal places
  const shippingCost = shippingMethod === 'express' ? 14 : 0;
  const total = Math.round((subtotal + tax + shippingCost) * 100) / 100; // Total rounded to 2 decimal places

  return (
    <div>
      {/* Header */}
      <div className="text-left">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-2">Shopping Cart</h1>
        <h4 className="font-base text-gray-800 mb-8">Review your items and proceed to checkout.</h4>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Left Column: Products and Shipping */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div>
            <h2 className="text-base font-regular">Items in cart ({cart.length})</h2>
          </div>
          {/* Products */}
          <div className="bg-white rounded-lg border border-gray-200 px-4">
            {cart.map(item => (
              <CartItemCard
                key={item.model}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
                onCompare={handleCompare}
              />
            ))}
          </div>

          {/* Shipping Method */}
          <div className="mt-4">
            <h3 className="text-2xl font-medium tracking-normal mb-4">Shipping Method</h3>
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
        <div className="flex flex-col gap-4">
          {/* Cost Center */}
          <CostCenter 
            value={costCenter}
            onChange={handleCostCenterChange}
          />
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            shippingCost={shippingCost}
            costCenter={costCenter}
            total={total}
            onCheckout={() => onCheckout(costCenter, shippingMethod)}
          />
        </div>
      </div>
    </div>
  );
} 