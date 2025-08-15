import React from "react";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Categories } from "./home/Categories";
import { FeaturedItems } from "./home/FeaturedItems";
import { RecommendedItems } from "./home/RecommendedItems";
import { RecentOrders } from "./home/RecentOrders";
import { EligibilityInfo } from "./home/EligibilityInfo";
import { SearchBarClient } from "./search/SearchBarClient";
import { QuickActionsClient } from "./home/QuickActionsClient";
import { MainNavigationClient } from "./layout/MainNavigationClient";
import { HeroBanner } from "./home/HeroBanner";
import { RequestHardwareBanner } from "./product/RequestHardwareBanner";
interface ITStorefrontProps {
  categories: any[];
  products: any[];
  quickActions: any[];
  eligibilityData: any;
}

function getRandomItems(arr: any[], n: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function getFeaturedProducts(products: any[], n = 3) {
  return getRandomItems(products, n);
}

function getRecommendedProducts(products: any[], n = 3) {
  const eligibleProducts = products.filter((product) => Boolean(product.battery));
  const brands = Array.from(new Set(eligibleProducts.map((p) => p.brand)));
  const selectedBrand = brands[Math.floor(Math.random() * brands.length)];
  const brandProducts = eligibleProducts.filter((p) => p.brand === selectedBrand);
  const displayedProducts = getRandomItems(brandProducts, n);
  const showCompareButton = eligibleProducts.length > 3;
  return { displayedProducts, showCompareButton };
}

export function ITStorefront({
  categories,
  products,
  quickActions,
  eligibilityData,
}: ITStorefrontProps) {
  const featuredProducts = getFeaturedProducts(products);
  const { displayedProducts, showCompareButton } = getRecommendedProducts(products);
  const names = ["Ed", "Marlon", "Marcus", "Lekeedra", "Eric", "Krish", "Michael", "Kamal", "Eve"];
  const randomName = names[Math.floor(Math.random() * names.length)];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Header />
        <MainNavigationClient />
      </div>  
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8">
          {/* Hero Banner */}
          <HeroBanner
            title="Our Newest Laptop"
            subtitle="Surface Pro 11, Copilot+ PC, 13-inch"
            description="A flexible design and larger display, ideal for those wanting the portability of a tablet and the power of a laptop. Powered by Windows 11."
            buttonText="See Details"
            buttonLink="/product/Surface%20Pro%2011?from=catalog"
            imageSrc="/images/microsoft_surface_pro_11.png"
            imageAlt="Surface Pro 11"
          />
          {/* Recent Orders */}
          <RecentOrders maxOrders={2} />
          {/* <SearchBarClient /> */}
          {/* <Categories /> */}
          {/* <QuickActionsClient actions={quickActions} /> */}
          {/* Featured Items */}
          <FeaturedItems displayedProducts={featuredProducts} />
          {/* Recommended Items */}
          <RecommendedItems displayedProducts={displayedProducts} showCompareButton={showCompareButton} />
          {/* Request Hardware Banner */}
          <RequestHardwareBanner />
          {/* <EligibilityInfo data={eligibilityData} /> */}
      </main>
      <Footer />
    </div>
  );
} 