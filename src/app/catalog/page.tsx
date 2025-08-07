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
import { PageLayout } from "@/components/layout/PageLayout";
import { Pagination } from "@/components/ui/Pagination";
import { CatalogSidebar } from "@/components/catalog/CatalogSidebar";
import { SortAsc } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function CatalogPage() {
  // Map monitorData to ProductCardProps
  const monitorProducts = monitorData.map((item) => ({
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

  // Map headphoneData to ProductCardProps
  const headphoneProducts = headphoneData.map((item) => ({
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

  // Map mouseData to ProductCardProps
  const mouseProducts = mouseData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Mice",
    description: item.description,
    card_description: item.description, // Use description as card_description for now
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
    card_description: item.card_description,
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
    card_description: item.card_description,
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
    card_description: item.card_description,
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
    card_description: item.card_description,
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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
  }, [showSortMenu]);

  // Flatten all products for sorting
  const flatProducts = [...allProducts];

  // Eligibility logic: eligible if price exists
  const isEligible = (product: any) => Boolean(product.price);

  // Filter logic
  let filteredProducts = flatProducts;
  
  // If a brand is selected, it overrides category selection
  if (selectedBrand !== "all") {
    filteredProducts = filteredProducts.filter((product) =>
      product.brand && product.brand.toLowerCase() === selectedBrand.toLowerCase()
    );
  } else if (selectedCategory !== "all") {
    // Only filter by category if no brand is selected
    filteredProducts = filteredProducts.filter((product) =>
      product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Sorting logic
  let sortedProducts = filteredProducts;
  if (sortOption === "price-low") {
    sortedProducts = [...filteredProducts].sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(String(a.price).replace(/,/g, '')) : Number(a.price);
      const priceB = typeof b.price === 'string' ? parseFloat(String(b.price).replace(/,/g, '')) : Number(b.price);
      return priceA - priceB;
    });
  } else if (sortOption === "price-high") {
    sortedProducts = [...filteredProducts].sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(String(a.price).replace(/,/g, '')) : Number(a.price);
      const priceB = typeof b.price === 'string' ? parseFloat(String(b.price).replace(/,/g, '')) : Number(b.price);
      return priceB - priceA;
    });
  } else if (sortOption === "az") {
    sortedProducts = [...filteredProducts].sort((a, b) => a.model.localeCompare(b.model));
  } else if (sortOption === "za") {
    sortedProducts = [...filteredProducts].sort((a, b) => b.model.localeCompare(a.model));
  } else if (sortOption === "brand") {
    sortedProducts = [...filteredProducts].sort((a, b) => {
      // First sort by brand alphabetically
      const brandComparison = a.brand.localeCompare(b.brand);
      if (brandComparison !== 0) {
        return brandComparison;
      }
      // If brands are the same, sort by model name alphabetically
      return a.model.localeCompare(b.model);
    });
  } // 'all' just shows the original order

  // Pagination logic
  const itemsPerPage = 9;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, sortOption]);

  // Reset brand selection when category is selected
  useEffect(() => {
    if (selectedCategory !== "all") {
      setSelectedBrand("all");
    }
  }, [selectedCategory]);

  // Reset category selection when brand is selected
  useEffect(() => {
    if (selectedBrand !== "all") {
      setSelectedCategory("all");
    }
  }, [selectedBrand]);

  return (
    <PageLayout>
      <div className="text-left mb-8">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-2">All Products</h1>
        <h4 className="font-base text-gray-800 mb-4">Browse our catalog of products and find the perfect item for your needs.</h4>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <CatalogSidebar
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          onCategorySelect={setSelectedCategory}
          onBrandSelect={setSelectedBrand}
          productsByBrand={productsByBrand}
        />
        
        {/* Main Content */}
        <div className="flex-1 pl-4">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap w-full">
            <div className="text-sm font-regular text-gray-900 min-w-max">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} item{sortedProducts.length === 1 ? "" : "s"}
            </div>
            {/* Desktop sort dropdown */}
            <div className="hidden md:flex items-center gap-4 ml-auto">
              <div>
                <label htmlFor="sort" className="mr-2 text-sm font-regular text-gray-700">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="brand">Brand</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            </div>
            {/* Mobile sort icon */}
            <div className="flex md:hidden items-center gap-4 ml-auto relative">
              <button
                aria-label="Sort"
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => setShowSortMenu((v) => !v)}
              >
                <SortAsc className="w-6 h-6" />
              </button>
              {/* Sort menu */}
              {showSortMenu && (
                <div ref={sortMenuRef} className="absolute right-0 top-10 z-50 bg-white border border-gray-200 rounded shadow-md w-40">
                  {[
                    { value: "all", label: "All" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "brand", label: "Brand" },
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedProducts.map((product, idx) => (
              <ProductCard key={`${product.model}-${idx}`} product={product} fromCatalog={true} />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </PageLayout>
  );
} 