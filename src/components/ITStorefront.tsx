import React from "react";
import Image from "next/image";
import Link from "next/link";
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
          <div className="bg-blue-50 rounded-lg p-12 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left side - Text content */}
              <div className="flex-1 text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Our Newest Laptop
                </h2>
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-4">
                  Surface Pro 11, Copilot+ PC, 13-inch
                </h3>
                <p className="text-gray-600 text-base mb-6">
                  A flexible design and larger display, ideal for those wanting the portability of a tablet and the power of a laptop. Powered by Windows 11.
                </p>
                <Link href="/product/Surface%20Pro%2011?from=catalog">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    See Details
                  </button>
                </Link>
              </div>
              
              {/* Right side - Product image */}
              <div className="flex-1 flex justify-center mr-12 lg:justify-end">
                <div className="relative">
                  {/* Background circle */}
                  <div className="absolute w-full h-full bg-blue-100 rounded-full opacity-50"></div>
                  {/* Surface Pro 11 image */}
                  <div className="relative z-10 w-full h-full transform rotate-6">
                    <Image
                      src="/images/microsoft_surface_pro_11.png"
                      alt="Surface Pro 11"
                      width={256}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Orders */}
          <RecentOrders maxOrders={3} />
          {/* <SearchBarClient /> */}
          {/* <Categories /> */}
          {/* <QuickActionsClient actions={quickActions} /> */}
          {/* Featured Items */}
          <FeaturedItems displayedProducts={featuredProducts} />
          {/* Recommended Items */}
          <RecommendedItems displayedProducts={displayedProducts} showCompareButton={showCompareButton} />

          {/* <EligibilityInfo data={eligibilityData} /> */}
      </main>
      <Footer />
    </div>
  );
} 