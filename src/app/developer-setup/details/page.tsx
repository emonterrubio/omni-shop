"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { OrderSummary } from "@/components/ui/OrderSummary";
import Image from "next/image";
import { CartContext } from "@/components/CartContext";

function generateOrderNumber() {
  return `112-${Math.floor(1000000 + Math.random() * 9000000)}`;
}

export default function OrderDetailsPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('orderId');
    
    if (orderId) {
      // Viewing an existing order
      const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const existingOrder = savedOrders.find((order: any) => order.id === orderId);
      
      if (existingOrder) {
        setOrderNumber(existingOrder.orderNumber);
        setOrderDate(existingOrder.orderDate);
        // Convert the saved order back to the format expected by the page
        const orderedByParts = existingOrder.orderedBy.split(' ');
        const orderedForParts = existingOrder.orderedFor.split(' ');
        
        const convertedOrder = {
          billing: {
            name: orderedByParts[0] || '',
            lastName: orderedByParts.slice(1).join(' ') || ''
          },
          shipping: {
            firstName: orderedForParts[0] || '',
            lastName: orderedForParts.slice(1).join(' ') || '',
            address1: existingOrder.shippingAddress.address,
            city: '',
            country: '',
            zip: ''
          },
          shippingType: existingOrder.shippingAddress.type,
          items: existingOrder.items,
          subtotal: existingOrder.total,
          shippingCost: 0,
          total: existingOrder.total
        };
        setOrder(convertedOrder);
      }
    } else {
      // New order from checkout
      const orderData = localStorage.getItem("devSetupOrder");
      if (orderData) {
        const parsed = JSON.parse(orderData);
        setOrder(parsed);
        
        // Get the actual order number from the saved order
        const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        const latestOrder = savedOrders[0]; // Most recent order
        if (latestOrder) {
          setOrderNumber(latestOrder.orderNumber);
          setOrderDate(latestOrder.orderDate);
        } else {
          setOrderNumber(generateOrderNumber());
          setOrderDate(new Date().toLocaleDateString("en-US", { 
            day: "2-digit", 
            month: "long", 
            year: "numeric" 
          }) + " at " + new Date().toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit", 
            hour12: true 
          }) + " PST");
        }
        
        // Clear order data and cart/selection
        localStorage.removeItem("devSetupOrder");
        localStorage.removeItem("devSetupCart");
        clearCart(); // Hide cart bubble after order is confirmed
      }
    }
  }, [clearCart]);

  if (!order) {
    return (
      <PageLayout>
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-semibold mb-4">No Order Found</h1>
          <p className="mb-6 text-gray-600">It looks like you haven't placed an order yet.</p>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition"
            onClick={() => router.push("/")}
          >
            Back to Home
          </button>
        </div>
      </PageLayout>
    );
  }

  const { billing, shipping, shippingType, items, subtotal, shippingCost, total } = order;
  const tax = Math.round((subtotal * 0.0725) * 100) / 100; // 7.25% tax rate

  return (
    <PageLayout>
      {/* Order Details Header */}
      <div className="text-left mb-4 lg:mb-8 px-4 lg:px-0">
        <h1 className="text-3xl lg:text-5xl font-medium text-gray-900 mt-4 lg:mt-6 mb-4">Order Details</h1>
        <p className="text-base lg:text-lg font-regular text-gray-800 mb-4">
          Your order has been submitted for manager approval. We'll send you confirmation of approval and when your item(s) will be on the way.
        </p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 px-4 lg:px-0">
        {/* Order Number Header */}
        <div className="pt-6 lg:pt-8 px-4 lg:px-8 pb-4">
          <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Order #{orderNumber}</div>
          <div className="border-b border-gray-200"></div>
          
          {/* Mobile: Two-column grid layout */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="font-regular text-sm text-gray-700">Order Number</span>
                <span className="text-base text-gray-900 font-bold">{orderNumber}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-regular text-sm text-gray-700">Order Date</span>
                <span className="text-base text-gray-900 font-bold">{orderDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-regular text-sm text-gray-700">Ordered for</span>
                <span className="text-base text-gray-900 font-bold">{shipping.firstName} {shipping.lastName}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-regular text-sm text-gray-700">Ordered by</span>
                <span className="text-base text-gray-900 font-bold">{billing.name} {billing.lastName}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-regular text-sm text-gray-700">Order Total</span>
                <span className="text-base text-gray-900 font-bold">${total.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-regular text-sm text-gray-700">Shipping to</span>
                <span className="text-base text-gray-900 font-bold">
                  {shippingType === 'residential' ? 'Residential' : 'Office'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Desktop: Original horizontal layout */}
          <div className="hidden lg:flex mt-4 gap-12">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-gray-900">Ordered by</h2>
              <div className="text-base font-regular text-gray-900">
                {billing.name} {billing.lastName}
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-gray-900">Ordered for</h2>
              <div className="text-base font-regular text-gray-900">
                {shipping.firstName} {shipping.lastName}
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-gray-900">Order submitted</h2>
              <div className="text-base font-regular text-gray-900">{orderDate}</div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-gray-900">
                Shipping to {shippingType === 'residential' ? 'Residential Address' : 'Office Address'}: &nbsp;
              </h2>
              <div className="text-base font-regular text-gray-900">
                {shipping.address1}
              </div>
            </div>
          </div>
        </div>
        {/* Product Details Section */}
        <div className="px-4 lg:px-6 py-4">
          {/* Mobile: Product list layout */}
          <div className="lg:hidden">
            <div className="bg-gray-100 rounded-t-lg px-4 py-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Product Details</h3>
            </div>
            <div className="space-y-4">
              {items.map((item: any, index: number) => (
                <div key={item.model} className={`pb-4 ${index < items.length - 1 ? "border-b border-gray-200" : ""}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-12 relative flex-shrink-0">
                      <Image src={item.image} alt={item.model} fill className="object-contain rounded" />
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-bold text-gray-900 mb-1">{item.brand} {item.model}</div>
                      <div className="text-sm text-gray-600 mb-2">{item.card_description || item.description}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Quantity: {item.quantity || 1}</span>
                        <span className="text-base font-bold text-gray-900">
                          {typeof item.price === 'string'
                            ? `$${Number((item.price as string).replace(/,/g, "")).toLocaleString()}`
                            : `$${item.price.toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop: Table layout */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-base text-left px-6 py-4 font-semibold text-gray-900">Product Details</th>
                  <th className="text-base text-center px-6 py-4 font-semibold text-gray-900">Quantity</th>
                  <th className="text-base text-right px-6 py-4 font-semibold text-gray-900">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any, index: number) => (
                  <tr key={item.model} className={index < items.length - 1 ? "border-b border-gray-200" : ""}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 relative flex-shrink-0">
                          <Image src={item.image} alt={item.model} fill className="object-contain rounded" />
                        </div>
                        <div>
                          <div className="text-lg font-regular text-gray-900">{item.brand} {item.model}</div>
                          <div className="text-base text-gray-600">{item.card_description || item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-gray-900">{item.quantity || 1}</td>
                    <td className="text-right px-6 py-4 font-semibold text-gray-900">
                      {typeof item.price === 'string'
                        ? `$${Number((item.price as string).replace(/,/g, "")).toLocaleString()}`
                        : `$${item.price.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <OrderSummary
          subtotal={subtotal}
          tax={tax}
          shippingCost={shippingCost}
          total={subtotal + tax + shippingCost}
          itemCount={items.length}
          showCheckoutButton={false}
          showContinueShopping={false}
        />
    </PageLayout>
  );
} 