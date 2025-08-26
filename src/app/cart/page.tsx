"use client";

import React, { useContext } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CartContext } from "@/components/CartContext";
import { ShoppingCart } from "@/components/developer-setup/ShoppingCart";
import { useRouter } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Shopping Cart", isActive: true }
        ]}
        className="mb-6"
      />
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-6">
              <PackageSearch className="w-20 h-20 mx-auto" />
            </div>
            <h1 className="text-3xl font-medium text-gray-900 mb-3">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Ready to build your perfect setup? Browse our catalog of laptops, monitors, accessories, and more to get started.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/catalog")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-base"
              >
                Browse Catalog
              </button>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Popular categories to explore:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Laptops", "Monitors", "Keyboards", "Mice", "Headphones"].map((category) => (
                  <button
                    key={category}
                    onClick={() => router.push(`/category/${category.toLowerCase()}`)}
                    className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
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