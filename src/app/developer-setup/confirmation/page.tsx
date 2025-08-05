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

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    // Read order data from localStorage
    const orderData = localStorage.getItem("devSetupOrder");
    if (orderData) {
      const parsed = JSON.parse(orderData);
      setOrder(parsed);
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
      // Clear order data and cart/selection
      localStorage.removeItem("devSetupOrder");
      localStorage.removeItem("devSetupCart");
      clearCart(); // Hide cart bubble after order is confirmed
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
      {/* Order Confirmation Header */}
      <div className="text-left mb-8">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-2">Order Confirmation</h1>
        <p className="font-base text-gray-800 mb-4">
          Your order has been submitted for manager approval. We'll send you confirmation of approval and when your item(s) will be on the way.
        </p>
        {/* <div className="pt-4">
          <div className="flex flex-col">
              <div className="text-2xl font-regular text-gray-900">Order {orderNumber}</div>
              <div className="text-gray-600">Submitted on {orderDate}</div>
          </div>
        </div> */}
      </div>

      {/* Product Details Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
        {/* Order Number and Date */}
        <div className="flex flex-col pt-6 px-6">
          <div className="text-xl font-regular text-gray-900">Order {orderNumber}</div>
          <div className="text-gray-600">Submitted on {orderDate}</div>
        </div>
        {/* Product Details Table */}
        <div className="p-6 overflow-x-auto">
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

      {/* Order Summary */}
      <div className="max-w-md ml-auto">
        <OrderSummary
          subtotal={subtotal}
          tax={tax}
          shippingCost={shippingCost}
          total={subtotal + tax + shippingCost}
          itemCount={items.length}
          showCheckoutButton={false}
          showContinueShopping={false}
        />
      </div>
    </PageLayout>
  );
} 