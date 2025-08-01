"use client";

import React, { useContext } from "react";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { Footer } from "@/components/layout/Footer";
import { CartContext } from "@/components/CartContext";
import { ShoppingCart } from "@/components/developer-setup/ShoppingCart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  const handleCheckout = (costCenter?: string, shippingMethod?: 'free' | 'express') => {
    // Calculate shipping cost based on method
    const shippingCost = shippingMethod === 'free' ? 0 : 14;
    
    // Store cart items in localStorage for checkout page
    const checkoutData = {
      items: cartItems,
      costCenter: costCenter,
      shippingCost: shippingCost,
    };
    localStorage.setItem("cartCheckout", JSON.stringify(checkoutData));
    router.push("/checkout");
  };



  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <MainNavigation />
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-xl mt-12">No items have been added to your cart</div>
        ) : (
          <ShoppingCart
            selectedItems={cartItems.map(item => ({
              ...item,
              description: item.description ?? "",
              recommended: !!item.recommended,
            }))}
            onEdit={() => {}}
            onCheckout={handleCheckout}
            onRemove={removeFromCart}
          />
        )}
      </main>
      <Footer />
    </div>
  );
} 