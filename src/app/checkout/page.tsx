"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { CheckoutPage } from "@/components/developer-setup/CheckoutPage";

interface CheckoutData {
  items: any[];
  costCenter?: string;
  shippingCost: number;
}

export default function CheckoutPageWrapper() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    const savedCheckoutData = localStorage.getItem("cartCheckout");
    if (savedCheckoutData) {
      try {
        const parsed = JSON.parse(savedCheckoutData);
        setCheckoutData(parsed);
      } catch (error) {
        console.error("Error loading checkout data:", error);
        router.push("/cart");
      }
    } else {
      router.push("/cart");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/cart");
  };

  if (!checkoutData) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <MainNavigation />
        <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
          <div className="text-center text-gray-500 text-xl mt-12">Loading checkout...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <MainNavigation />
      <main>
        <CheckoutPage
          items={checkoutData.items}
          shippingCost={checkoutData.shippingCost}
          costCenter={checkoutData.costCenter}
          onBack={handleBack}
        />
      </main>
    </div>
  );
} 