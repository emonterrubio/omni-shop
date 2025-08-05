"use client";

import React, { useContext } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
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
    <PageLayout>
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
    </PageLayout>
  );
} 