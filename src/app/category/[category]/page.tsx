"use client";
import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
import { headphoneData } from "@/data/headphoneData";
import { mouseData } from "@/data/mouseData";
import { keyboardData } from "@/data/keyboardData";
import { webcamData } from "@/data/webcamData";
import { dockStationData } from "@/data/dockStationData";
import { backpackData } from "@/data/backpackData";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardProps } from "@/types/ProductCardProps";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { ArrowLeft } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

function getProductsForCategory(category: string): ProductCardProps[] {
  switch (category.toLowerCase()) {
    case "laptops":
    case "desktops":
      return hardwareData
        .filter(item => item.category.toLowerCase() === category.toLowerCase())
        .map(item => ({
          brand: item.brand,
          model: item.model,
          category: item.category,
          description: item.description,
          card_description: item.card_description,
          features: item.features,
          image: item.image,
          price: item.price,
          recommended: item.recommended,
        }));
    case "monitors":
      return monitorData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Monitors",
        description: item.description,
        card_description: item.card_description,
        features: `${item.display_resolution}, ${item.aspect_ratio}, ${item.display_type}`,
        image: item.image,
        price: item.price,
        recommended: item.recommended,
      }));
    case "headphones":
      return headphoneData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Headphones",
        description: item.description,
        card_description: item.card_description,
        features: item.features,
        image: item.image,
        price: item.price,
        recommended: item.recommended,
      }));
    case "mice":
      return mouseData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Mice",
        description: item.description,
        card_description: item.description,
        features: item.description,
        image: item.image,
        price: item.price,
        recommended: item.recommended,
      }));
    case "keyboards":
      return keyboardData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Keyboards",
        description: item.description,
        card_description: item.card_description,
        features: `${item.connectivity}, ${item.compatibility}, ${item.number_keys} keys`,
        image: item.image,
        price: item.price,
        recommended: item.recommended,
      }));
    case "webcams":
      return webcamData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Webcams",
        description: item.description,
        card_description: item.card_description,
        features: `${item.video_resolution}, ${item.display_resolution}, ${item.image_capture_rate}`,
        image: item.image,
        price: item.price,
        recommended: item.recommended,
      }));
    case "docking stations":
      return dockStationData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Docking Stations",
        description: item.description,
        card_description: item.card_description,
        features: `${item.ports}, ${item.power}`,
        image: item.image,
        price: item.price,
        recommended: item.recommended,
      }));
    case "backpacks":
      return backpackData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Backpacks",
        description: item.description,
        card_description: item.card_description,
        features: `${item.size}, ${item.capacity}`,
        image: item.image,
        price: item.price,
        recommended: item.recommended,
      }));
    default:
      return [];
  }
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const categoryParam = typeof resolvedParams.category === "string" ? resolvedParams.category : Array.isArray(resolvedParams.category) ? resolvedParams.category[0] : "";
  // Decode URL-encoded category name (e.g., "docking%20stations" -> "docking stations")
  const category = decodeURIComponent(categoryParam);
  const products: ProductCardProps[] = getProductsForCategory(category);

  // --- Brand Filter & Sort State ---
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Unique brands for filter dropdown
  const brands = Array.from(new Set(products.map(p => p.brand)));

  // --- Filtering ---
  let filteredProducts = brandFilter === "all" ? products : products.filter(p => p.brand === brandFilter);

  // --- Sorting ---
  let sortedProducts = [...filteredProducts];
  if (sortOption === "price-low") {
    sortedProducts.sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(String(a.price).replace(/,/g, '')) : Number(a.price);
      const priceB = typeof b.price === 'string' ? parseFloat(String(b.price).replace(/,/g, '')) : Number(b.price);
      return priceA - priceB;
    });
  } else if (sortOption === "price-high") {
    sortedProducts.sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(String(a.price).replace(/,/g, '')) : Number(a.price);
      const priceB = typeof b.price === 'string' ? parseFloat(String(b.price).replace(/,/g, '')) : Number(b.price);
      return priceB - priceA;
    });
  } else if (sortOption === "az") {
    sortedProducts.sort((a, b) => a.model.localeCompare(b.model));
  } else if (sortOption === "za") {
    sortedProducts.sort((a, b) => b.model.localeCompare(a.model));
  }

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [brandFilter, sortOption]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <MainNavigation />
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
        {/* <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link> */}
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Catalog", href: "/catalog" },
            { label: category.charAt(0).toUpperCase() + category.slice(1), isActive: true }
          ]}
          className="mb-6"
        />
        
        <div className="text-left">
          <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4 capitalize">{category} <span className="normal-case">available</span></h1>
          <h4 className="font-base text-gray-600 mb-8">Boost your productivity with high-performance equipment.</h4>
        </div>
        {/* --- Filter & Sort Controls (match catalog page) --- */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap w-full">
        <div className="text-sm font-regular text-gray-900 min-w-max">
          Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} item{sortedProducts.length === 1 ? "" : "s"}
        </div>
          <div className="flex items-center gap-4 ml-auto">
            <div>
              <label htmlFor="brand-filter" className="mr-2 text-sm font-regular text-gray-700">Filter by:</label>
              <select
                id="brand-filter"
                value={brandFilter}
                onChange={e => setBrandFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="mr-2 text-sm font-regular text-gray-700">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProducts.length === 0 ? (
            <div className="col-span-full font-medium text-lg text-center text-gray-500 mt-12">No products found in this category.</div>
          ) : (
            paginatedProducts.map((product, idx) => (
              <ProductCard key={`${product.model}-${idx}`} product={product} />
            ))
          )}
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
} 