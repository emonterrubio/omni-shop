"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { hardwareData, HardwareSpec } from "@/data/hardwareData";
import { ComparisonProductCard } from "@/components/product/ProductComparisonCard";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { Footer } from "@/components/layout/Footer";
import { SupportBanner } from "@/components/product/SupportBanner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CompareClient() {
  const searchParams = useSearchParams();
  const modelsParam = searchParams.get("models");
  const brandParam = searchParams.get("brand");

  const selectedProducts = useMemo(() => {
    let filtered = hardwareData;
    if (brandParam) {
      filtered = hardwareData.filter((product) => product.brand.toLowerCase() === brandParam.toLowerCase());
    }
    if (modelsParam) {
      const models = modelsParam.split(",").map(decodeURIComponent);
      const products = models
        .map((model) => filtered.find((p) => p.model === model))
        .filter((p): p is HardwareSpec => p !== undefined);
      return products;
    }
    // Otherwise, randomize 3 from the filtered brand
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [modelsParam, brandParam]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <MainNavigation />
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <div className="text-left">
          <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4">Compare with similar items</h1>
          <h4 className="font-base text-gray-600 mb-8">Compare processor speed, battery life, and portability to find your ideal laptop.</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {selectedProducts.filter(Boolean).map((product) => (
            <div key={product.model} className="flex flex-col items-center h-full">
              <ComparisonProductCard
                image={product.image}
                brand={product.brand}
                model={product.model}
                description={product.description}
                card_description={product.card_description}
                features={product.features}
                subFeatures={[
                  product.processor,
                  product.memory,
                  product.storage,
                  product.display,
                  product.graphics,
                  product.operating_system,
                  product.ports,
                  product.battery,
                  product.other,
                ]}
                price={product.price}
                chip={
                  product.processor
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")
                    .replace(/[\,\s:]+$/, "") || "Unavailable"
                }
                specs={[
                  { label: "Processor", value: product.processor },
                  { label: "Memory", value: product.memory },
                  { label: "Storage", value: product.storage },
                  { label: "Display", value: product.display },
                  { label: "Graphics", value: product.graphics },
                  { label: "Operating System", value: product.operating_system },
                  { label: "Ports", value: product.ports },
                  { label: "Battery", value: product.battery },
                  { label: "Other", value: product.other },
                ]}
              />
            </div>
          ))}
        </div>
        <SupportBanner />
      </main>
      <Footer />
    </div>
  );
} 