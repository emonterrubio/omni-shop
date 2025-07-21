"use client";

import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
import { headphoneData } from "@/data/headphoneData";
import { mouseData } from "@/data/mouseData";
import { keyboardData } from "@/data/keyboardData";
import { webcamData } from "@/data/webcamData";
import { dockStationData } from "@/data/dockStationData";
import { backpackData } from "@/data/backpackData";
import { ProductCard } from "@/components/ui/ProductCard";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import Link from "next/link";
import { ArrowLeft, Filter, SortAsc } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function CatalogPage() {
  // Map monitorData to ProductCardProps
  const monitorProducts = monitorData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Monitors",
    description: item.description,
    features: `${item.display_resolution}, ${item.aspect_ratio}, ${item.display_type}`,
    image: item.image,
    price: item.price,
    recommended: item.recommended,
  }));

  // Map headphoneData to ProductCardProps
  const headphoneProducts = headphoneData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Headphones",
    description: item.description, // or item.description if available
    features: item.features,
    image: item.image,
    price: item.price,
    recommended: item.recommended,
  }));

  // Map mouseData to ProductCardProps
  const mouseProducts = mouseData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Mice",
    description: item.description,
    features: item.description, // Using description as features
    image: item.image,
    price: item.price,
    recommended: item.recommended,
  }));

  // Map keyboardData to ProductCardProps
  const keyboardProducts = keyboardData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Keyboards",
    description: item.description,
    features: `${item.connectivity}, ${item.compatibility}, ${item.number_keys} keys`,
    image: item.image,
    price: item.price,
    recommended: item.recommended,
  }));

  // Map webcamData to ProductCardProps
  const webcamProducts = webcamData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Webcams",
    description: item.description,
    features: `${item.video_resolution}, ${item.display_resolution}, ${item.image_capture_rate}`,
    image: item.image,
    price: item.price,
    recommended: item.recommended,
  }));

  // Map dockStationData to ProductCardProps
  const dockStationProducts = dockStationData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Docking Stations",
    description: item.description,
    features: `${item.ports}, ${item.power}`,
    image: item.image,
    price: item.price,
    recommended: item.recommended,
  }));

  // Map backpackData to ProductCardProps
  const backpackProducts = backpackData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Backpacks",
    description: item.description,
    features: `${item.size}, ${item.capacity}`,
    image: item.image,
    price: item.price,
    recommended: item.recommended,
  }));

  // Combine all products (add more as you expand)
  const allProducts = [
    ...hardwareData,
    ...monitorProducts,
    ...headphoneProducts,
    ...mouseProducts,
    ...keyboardProducts,
    ...webcamProducts,
    ...dockStationProducts,
    ...backpackProducts
  ];

  // Group products by brand
  const productsByBrand: { [brand: string]: typeof allProducts } = {};
  allProducts.forEach((product) => {
    if (!productsByBrand[product.brand]) {
      productsByBrand[product.brand] = [];
    }
    productsByBrand[product.brand].push(product);
  });

  const [sortOption, setSortOption] = useState("all");
  const [filterOption, setFilterOption] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filterMenuRef = useRef<HTMLDivElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node) &&
        showFilterMenu
      ) {
        setShowFilterMenu(false);
      }
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node) &&
        showSortMenu
      ) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterMenu, showSortMenu]);

  // Flatten all products for sorting
  const flatProducts = [...allProducts];

  // Eligibility logic: eligible if price exists
  const isEligible = (product: any) => Boolean(product.price);

  // Filter logic
  let filteredProducts = flatProducts;
  if (filterOption !== "all") {
    filteredProducts = flatProducts.filter((product) =>
      product.category && product.category.toLowerCase() === filterOption
    );
  }

  // Sorting logic
  let sortedProducts = filteredProducts;
  if (sortOption === "eligibility") {
    sortedProducts = [...filteredProducts].sort((a, b) => Number(b.recommended) - Number(a.recommended));
  } else if (sortOption === "az") {
    sortedProducts = [...filteredProducts].sort((a, b) => a.model.localeCompare(b.model));
  } else if (sortOption === "za") {
    sortedProducts = [...filteredProducts].sort((a, b) => b.model.localeCompare(a.model));
  } else if (sortOption === "brand") {
    sortedProducts = [...filteredProducts].sort((a, b) => a.brand.localeCompare(b.brand));
  } // 'all' just shows the original order

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <MainNavigation />
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
        <h2 className="font-medium text-5xl text-center text-gray-900 mt-6 mb-4">All Products</h2>
        <h4 className="max-w-2xl mx-auto font-base text-center text-gray-600 text-gray-600 mb-8">Browse our catalog of products and find the perfect item for your needs.</h4>
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap w-full">
          <div className="text-sm font-regular text-gray-900 min-w-max">{sortedProducts.length} item{sortedProducts.length === 1 ? "" : "s"} found</div>
          {/* Desktop filter/sort dropdowns */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <div>
              <label htmlFor="filter" className="mr-2 text-sm font-regular text-gray-700">Filter by:</label>
              <select
                id="filter"
                value={filterOption}
                onChange={e => setFilterOption(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="laptops">Laptops</option>
                <option value="desktops">Desktops</option>
                <option value="monitors">Monitors</option>
                <option value="headphones">Headphones</option>
                <option value="mice">Mice</option>
                <option value="keyboards">Keyboards</option>
                <option value="webcams">Webcams</option>
                <option value="docking stations">Docking Stations</option>
                <option value="backpacks">Backpacks</option>
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
                <option value="brand">By brand</option>
                <option value="eligibility">By eligibility</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
          {/* Mobile filter/sort icons */}
          <div className="flex md:hidden items-center gap-4 ml-auto relative">
            <button
              aria-label="Filter"
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setShowFilterMenu((v) => !v)}
            >
              <Filter className="w-6 h-6" />
            </button>
            <button
              aria-label="Sort"
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setShowSortMenu((v) => !v)}
            >
              <SortAsc className="w-6 h-6" />
            </button>
            {/* Filter menu */}
            {showFilterMenu && (
              <div ref={filterMenuRef} className="absolute right-12 top-10 z-50 bg-white border border-gray-200 rounded shadow-md w-40">
                {[
                  { value: "all", label: "All" },
                  { value: "laptops", label: "Laptops" },
                  { value: "desktops", label: "Desktops" },
                  { value: "monitors", label: "Monitors" },
                  { value: "headphones", label: "Headphones" },
                  { value: "mice", label: "Mice" },
                  { value: "keyboards", label: "Keyboards" },
                  { value: "webcams", label: "Webcams" },
                  { value: "docking stations", label: "Docking Stations" },
                  { value: "backpacks", label: "Backpacks" },
                ].map(opt => (
                  <button
                    key={opt.value}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${filterOption === opt.value ? "bg-gray-100 font-semibold" : ""}`}
                    onClick={() => { setFilterOption(opt.value); setShowFilterMenu(false); }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            {/* Sort menu */}
            {showSortMenu && (
              <div ref={sortMenuRef} className="absolute right-0 top-10 z-50 bg-white border border-gray-200 rounded shadow-md w-40">
                {[
                  { value: "all", label: "All" },
                  { value: "brand", label: "By brand" },
                  { value: "eligibility", label: "By eligibility" },
                  { value: "az", label: "A-Z" },
                  { value: "za", label: "Z-A" },
                ].map(opt => (
                  <button
                    key={opt.value}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortOption === opt.value ? "bg-gray-100 font-semibold" : ""}`}
                    onClick={() => { setSortOption(opt.value); setShowSortMenu(false); }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.map((product, idx) => (
            <ProductCard key={`${product.model}-${idx}`} product={product} fromCatalog={true} />
          ))}
        </div>
      </main>
    </div>
  );
} 