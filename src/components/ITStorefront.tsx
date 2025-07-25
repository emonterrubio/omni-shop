import React from "react";
import { Header } from "./layout/Header";
import { Categories } from "./home/Categories";
import { RecommendedItems } from "./home/RecommendedItems";
import { RecentOrders } from "./home/RecentOrders";
import { EligibilityInfo } from "./home/EligibilityInfo";
import { SearchBarClient } from "./search/SearchBarClient";
import { QuickActionsClient } from "./home/QuickActionsClient";
import { MainNavigationClient } from "./layout/MainNavigationClient";

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
  const names = ["Ed", "Marlon", "Marcus", "Lekeedra", "Natashia", "Krish", "Alea", "Kamal", "Gaby"];
  const randomName = names[Math.floor(Math.random() * names.length)];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Header />
        <MainNavigationClient />
      </div>  
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16">
          <h2 className="text-3xl font-medium mt-12 mb-2">Hello
            <span className="text-heritageBlue"> {randomName}</span>, welcome to</h2>
          <h3 className="text-5xl sm:text-6xl md:text-7xl font-medium mb-8">Omni Shopping</h3>
          <SearchBarClient />
          <Categories />
          <QuickActionsClient actions={quickActions} />
          <RecommendedItems displayedProducts={displayedProducts} showCompareButton={showCompareButton} />
          <RecentOrders orders={recentOrders} />
          <EligibilityInfo data={eligibilityData} />
      </main>
    </div>
  );
} 