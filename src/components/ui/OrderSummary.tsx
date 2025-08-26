import React from 'react';

interface OrderSummaryProps {
  subtotal: number;
  tax?: number;
  shippingCost: number;
  costCenter?: string;
  total: number;
  onCheckout?: () => void;
  checkoutButtonText?: string;
  showCheckoutButton?: boolean;
  disabled?: boolean;
  className?: string;
  itemCount?: number;
  showContinueShopping?: boolean;
  onContinueShopping?: () => void;
}

export function OrderSummary({
  subtotal,
  tax = 0,
  shippingCost,
  costCenter,
  total,
  onCheckout,
  checkoutButtonText = "Checkout",
  showCheckoutButton = true,
  disabled = false,
  className = "",
  itemCount,
  showContinueShopping = true,
  onContinueShopping
}: OrderSummaryProps) {
  return (
    <div className={`bg-white rounded-md border border-gray-200 p-6 h-fit ${className}`}>
      <div>
        <h3 className="text-2xl font-regular tracking-normal mb-4">Order Summary</h3>
        <div className="flex justify-between font-regular text-gray-800 mb-2">
          <span>Subtotal {itemCount ? `(${itemCount} items)` : ''}</span>
          <span>${Math.round(subtotal).toLocaleString()}</span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between font-regular text-gray-800 mb-2">
            <span>Tax</span>
            <span>${Math.round(tax).toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between font-regular text-gray-800 mb-2">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : `$${Math.round(shippingCost).toLocaleString()}`}</span>
        </div>
        {costCenter && (
          <div className="flex justify-between text-gray-800 mb-2">
            <span>Cost Center</span>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="font-bold">{costCenter}</span>
                <button className="text-blue-600 text-sm hover:underline">Edit</button>
              </div>
            </div>
          </div>
        )}
        <div className="border-t border-gray-200 my-4"></div>
        <div className="flex justify-between font-bold text-xl mt-2">
          <span>Total</span>
          <span>${Math.round(total).toLocaleString()}</span>
        </div>
        

      </div>
      <div className="mt-1">
      {showCheckoutButton && onCheckout && (
                <button 
          onClick={onCheckout}
          disabled={disabled}
          className={`w-full mt-4 text-base py-2 font-medium rounded-md transition ${
            disabled 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {checkoutButtonText}
        </button>
      )}
      
      {showContinueShopping && onContinueShopping && (
        <button 
          onClick={onContinueShopping}
          className="w-full mt-2 flex-1 bg-blue-50 text-blue-600 text-base rounded-md py-2 font-medium hover:bg-blue-100 transition text-center"
        >
          Continue shopping
        </button>
      )}
      </div>
    </div>
  );
} 