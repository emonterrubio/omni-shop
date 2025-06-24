"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import Image from "next/image";

function generateOrderNumber() {
  return `#${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");

  useEffect(() => {
    // Read order data from localStorage
    const orderData = localStorage.getItem("devSetupOrder");
    if (orderData) {
      const parsed = JSON.parse(orderData);
      setOrder(parsed);
      setOrderNumber(generateOrderNumber());
      setOrderDate(new Date().toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" }));
      // Clear order data and cart/selection
      localStorage.removeItem("devSetupOrder");
      localStorage.removeItem("devSetupCart");
    }
  }, []);

  if (!order) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header cartItems={0} />
        <MainNavigation />
        <main className="max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-semibold mb-4">No Order Found</h1>
          <p className="mb-6 text-gray-600">It looks like you haven't placed an order yet.</p>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition"
            onClick={() => router.push("/")}
          >
            Back to Home
          </button>
        </main>
      </div>
    );
  }

  const { billing, shipping, shippingType, items, subtotal, shippingCost, total } = order;

  return (
    <div className="flex flex-col h-screen bg-gray-50 mb-12">
      <Header cartItems={0} />
      <MainNavigation />
      <main className="max-w-7xl flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
        >
          &larr; Back
        </button>
        <div className="mb-12">
          <h2 className="font-medium text-5xl text-center text-gray-900 mt-6 mb-4">Your Order Confirmed!</h2>
          <div>
            <h3 className="font-medium text-2xl text-gray-900 mb-1">Hello {billing.name}!</h3>
            <h4 className="font-lg font-semibold text-gray-600 text-gray-600 mb-4">Your order has been confirmed and will be shipping soon.</h4>
            <h4 className="font-base text-gray-600 mb-4">We'll send you shipping confirmation when your item(s) are on the way!</h4>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap w-full">
          <div className="flex flex-wrap gap-8 justify-start">
            <div>
              <div className="font-semibold text-gray-700">Order Date</div>
              <div>{orderDate}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Order Number</div>
              <div>{orderNumber}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Ordered For</div>
              <div>{
                shipping?.firstName && shipping?.lastName
                  ? `${shipping.firstName} ${shipping.lastName}`
                  : billing?.name || "-"
              }</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Shipping to {shippingType === "office" ? "Office" : "Residential"} Address</div>
              <div>
                {shippingType === "office"
                  ? `${shipping.officeLocation || ""} ${shipping.buildingNumber || ""} ${shipping.workspaceLocation || ""}`
                  : [
                      shipping.address1,
                      shipping.city,
                      shipping.state,
                      shipping.zip,
                      shipping.country
                    ].filter(Boolean).join(', ')}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-6 mb-8">
          {items.map((item: any) => (
            <div key={item.model} className="flex items-center border-b last:border-b-0 border-gray-100 py-4 gap-4">
              <div className="w-24 h-16 relative flex-shrink-0">
                <Image src={item.image} alt={item.model} fill className="object-contain rounded" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-lg text-gray-900 flex items-center gap-2">
                  {item.brand} {item.model}
                  {item.recommended && (
                    <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-md ml-2">Recommended</span>
                  )}
                </div>
              </div>
              <div className="text-right min-w-[60px]">Qty {item.quantity || 1}</div>
              <div className="text-right min-w-[80px] font-semibold text-gray-900">
                {typeof item.price === 'string'
                  ? `$${Number((item.price as string).replace(/,/g, "")).toLocaleString()}`
                  : `$${item.price.toLocaleString()}`}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start max-w-xl ml-auto px-6">
          <div className="flex justify-between w-full text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>${subtotal?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between w-full text-gray-600 mb-2">
            <span>Shipping Cost (+)</span>
            <span>${shippingCost?.toLocaleString()}</span>
          </div>
          <div className="border-t border-gray-200 my-4 w-full"></div>
          <div className="flex justify-between w-full font-bold text-xl mt-2">
            <span>Total</span>
            <span>${total?.toLocaleString()}</span>
          </div>
        </div>
      </main>
    </div>
  );
} 