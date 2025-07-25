"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { hardwareData } from "@/data/hardwareData";
import { headphoneData } from "@/data/headphoneData";
import { monitorData } from "@/data/monitorData";
import { mouseData } from "@/data/mouseData";
import { keyboardData } from "@/data/keyboardData";
import { webcamData } from "@/data/webcamData";
import { dockStationData } from "@/data/dockStationData";
import { backpackData } from "@/data/backpackData";
import { ProductCard } from "@/components/ui/ProductCard";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Combine all product data for fallback search
function getAllProductsForFallback() {
  const hardwareProducts = hardwareData.map((item) => ({
    ...item,
    category: item.category || "Hardware",
  }));

  const headphoneProducts = headphoneData.map((item) => ({
    ...item,
    category: "Headphones",
  }));

  const monitorProducts = monitorData.map((item) => ({
    ...item,
    category: "Monitors",
  }));

  const mouseProducts = mouseData.map((item) => ({
    ...item,
    category: "Mice",
  }));

  const keyboardProducts = keyboardData.map((item) => ({
    ...item,
    category: "Keyboards",
  }));

  const webcamProducts = webcamData.map((item) => ({
    ...item,
    category: "Webcams",
  }));

  const dockStationProducts = dockStationData.map((item) => ({
    ...item,
    category: "Docking Stations",
  }));

  const backpackProducts = backpackData.map((item) => ({
    ...item,
    category: "Backpacks",
  }));

  return [
    ...hardwareProducts,
    ...headphoneProducts,
    ...monitorProducts,
    ...mouseProducts,
    ...keyboardProducts,
    ...webcamProducts,
    ...dockStationProducts,
    ...backpackProducts
  ];
}

export default function SearchClient() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const feature = searchParams.get("feature");
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalFound, setTotalFound] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (q) {
        try {
          const response = await fetch("/api/ai-product-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: q }),
          });
          const data = await response.json();
          console.log("AI Product Search API response:", data);
          if (data.results && data.results.length > 0) {
            setResults(data.results);
            setTotalFound(data.totalFound || data.results.length);
          } else {
            // Fallback: local search if AI returns nothing
            const allProducts = getAllProductsForFallback();
            const fallback = allProducts.filter((p) =>
              Object.values(p).some(
                (val) =>
                  typeof val === "string" &&
                  val.toLowerCase().includes(q.toLowerCase())
              )
            );
            setResults(fallback);
            setTotalFound(fallback.length);
          }
        } catch (error) {
          console.error("Search API error:", error);
          // Fallback to local search on error
          const allProducts = getAllProductsForFallback();
          const fallback = allProducts.filter((p) =>
            Object.values(p).some(
              (val) =>
                typeof val === "string" &&
                val.toLowerCase().includes(q.toLowerCase())
            )
          );
          setResults(fallback);
          setTotalFound(fallback.length);
        }
      } else {
        // Fallback to basic filtering if no query
        const allProducts = getAllProductsForFallback();
        let filteredResults = allProducts;
        if (brand) {
          filteredResults = filteredResults.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
        }
        if (category) {
          filteredResults = filteredResults.filter((p) => p.category.toLowerCase() === category.toLowerCase());
        }
        if (feature) {
          filteredResults = filteredResults.filter((p) =>
            Object.values(p).some((val) =>
              typeof val === "string" && val.toLowerCase().includes(feature.toLowerCase())
            )
          );
        }
        setResults(filteredResults);
        setTotalFound(filteredResults.length);
      }
      setLoading(false);
    };

    fetchResults();
  }, [q, brand, category, feature]);

  const backHref = "/";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <MainNavigation />
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
        <Link
          href={backHref}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium">
            Search results for: <span className="font-medium text-blue-600">{q || brand || category || feature || "All"}</span>
          </h2>
          <span className="text-gray-600 text-base font-regular">{totalFound} item{totalFound === 1 ? "" : "s"} found</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">Loading...</div>
          ) : results.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No products found.</div>
          ) : (
            results.map((product, idx) => (
              <ProductCard key={`${product.model}-${idx}`} product={{ ...product, price: String(product.price) }} />
            ))
          )}
        </div>
      </main>
    </div>
  );
} 