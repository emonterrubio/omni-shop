"use client";

import React, { useState, useEffect } from "react";
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
  // Use deterministic sorting based on current date to avoid hydration issues
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const shuffled = [...arr].sort((a, b) => {
    // Use a hash of the item's model to create deterministic but varied ordering
    const hashA = (a.model || '').split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const hashB = (b.model || '').split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return (hashA + dayOfYear) % 3 - 1; // Creates varied but deterministic ordering
  });
  return shuffled.slice(0, n);
}

function getFeaturedProducts(products: any[], n = 3) {
  return getRandomItems(products, n);
}

function getRecommendedProducts(products: any[], n = 3) {
  const eligibleProducts = products.filter((product) => Boolean(product.battery));
  const brands = Array.from(new Set(eligibleProducts.map((p) => p.brand)));
  // Use deterministic selection based on current date to avoid hydration issues
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const selectedBrand = brands[dayOfYear % brands.length] || brands[0];
  const brandProducts = eligibleProducts.filter((p) => p.brand === selectedBrand);
  const displayedProducts = getRandomItems(brandProducts, n);
  const showCompareButton = eligibleProducts.length > 3;
  return { displayedProducts, showCompareButton };
}

// Hero banner functions moved to HeroBanner component

export function ITStorefront({
  categories,
  products,
  quickActions,
  eligibilityData,
}: ITStorefrontProps) {
  const featuredProducts = getFeaturedProducts(products);
  const { displayedProducts, showCompareButton } = getRecommendedProducts(products);
  const names = ["Ed", "Marlon", "Marcus", "Lekeedra", "Eric", "Krish", "Michael", "Kamal", "Eve"];
  // Use deterministic selection based on current date to avoid hydration issues
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const randomName = names[dayOfYear % names.length];

  // No longer need hero banner state since it's handled internally by the component

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Header />
        <MainNavigationClient />
      </div>  
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8">
          {/* Hero Banner */}
          <HeroBanner products={products} />
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