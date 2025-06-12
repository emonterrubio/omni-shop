"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { hardwareData } from "@/data/hardwareData";
import { ProductCard } from "@/components/ui/ProductCard";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const feature = searchParams.get("feature");
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState(hardwareData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (q) {
        const response = await fetch("/api/ai-product-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        const data = await response.json();
        console.log("AI Product Search API response:", data);
        if (data.results && data.results.length > 0) {
          setResults(data.results);
        } else {
          // Fallback: local search if AI returns nothing
          const fallback = hardwareData.filter((p) =>
            Object.values(p).some(
              (val) =>
                typeof val === "string" &&
                val.toLowerCase().includes(q.toLowerCase())
            )
          );
          setResults(fallback);
        }
      } else {
        // Fallback to basic filtering if no query
        let filteredResults = hardwareData;
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
      }
      setLoading(false);
    };

    fetchResults();
  }, [q, brand, category, feature]);

  const backHref = "/";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItems={0} />
      <MainNavigation />
      <main className="flex-1 max-w-5xl mx-auto py-8 w-full">
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
          <span className="text-gray-600 text-base font-regular">{results.length} item{results.length === 1 ? "" : "s"} found</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">Loading...</div>
          ) : results.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No products found.</div>
          ) : (
            results.map((product, idx) => (
              <ProductCard key={`${product.model}-${idx}`} product={product} />
            ))
          )}
        </div>
      </main>
    </div>
  );
} 