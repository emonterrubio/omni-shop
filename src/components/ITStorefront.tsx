import React from "react";
import { Header } from "./layout/Header";
import { Categories } from "./home/Categories";
import { RecommendedItems } from "./home/RecommendedItems";
import { RecentOrders } from "./home/RecentOrders";
import { EligibilityInfo } from "./home/EligibilityInfo";
import { SearchBarClient } from "./search/SearchBarClient";
import { QuickActionsClient } from "./home/QuickActionsClient";
import { BottomNavigationClient } from "./layout/BottomNavigationClient";

interface ITStorefrontProps {
  categories: any[];
  products: any[];
  recentOrders: any[];
  quickActions: any[];
  eligibilityData: any;
}

function getRecommendedProducts(products: any[], n = 3) {
  const eligibleProducts = products.filter((product) => Boolean(product.battery));
  const brands = Array.from(new Set(eligibleProducts.map((p) => p.brand)));
  const selectedBrand = brands[Math.floor(Math.random() * brands.length)];
  const brandProducts = eligibleProducts.filter((p) => p.brand === selectedBrand);
  function getRandomItems(arr: any[], n: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  const displayedProducts = getRandomItems(brandProducts, n);
  const showCompareButton = eligibleProducts.length > 3;
  return { displayedProducts, showCompareButton };
}

export function ITStorefront({
  categories,
  products,
  recentOrders,
  quickActions,
  eligibilityData,
}: ITStorefrontProps) {
  const { displayedProducts, showCompareButton } = getRecommendedProducts(products);
  const names = ["Ed", "Marlon", "Marcus", "Lekkedra", "Natashia", "Krish", "Alea", "Kamal"];
  const randomName = names[Math.floor(Math.random() * names.length)];

  return (
    <div className="flex flex-col h-screen bg-gray-50 mb-12">
      <Header cartItems={0} />
      <main className="flex-1 overflow-y-auto px-3 sm:px-10 md:px-16 py-3">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-4xl font-medium mt-12 mb-6">Hello {randomName}, Welcome to Omni Shopping</h2>
          <SearchBarClient />
          <Categories />
          <QuickActionsClient actions={quickActions} />
          <RecommendedItems displayedProducts={displayedProducts} showCompareButton={showCompareButton} />
          <RecentOrders orders={recentOrders} />
          <EligibilityInfo data={eligibilityData} />
        </div>
      </main>
      <BottomNavigationClient />
    </div>
  );
} 