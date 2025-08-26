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
import { PlatformInfoBanner } from "@/components/ui/PlatformInfoBanner";
import { PageLayout } from "@/components/layout/PageLayout";
import { Pagination } from "@/components/ui/Pagination";
import { CatalogSidebar } from "@/components/catalog/CatalogSidebar";
import { SortAsc, Filter, PackageSearch } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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

  // Function to get products by brand filtered by selected category
  const getProductsByBrandForCategory = () => {
    if (selectedCategory === "all") {
      return productsByBrand;
    } else {
      const filteredProductsByBrand: { [brand: string]: typeof allProducts } = {};
      Object.keys(productsByBrand).forEach(brand => {
        const categoryProducts = productsByBrand[brand].filter(product => 
          product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (categoryProducts.length > 0) {
          filteredProductsByBrand[brand] = categoryProducts;
        }
      });
      return filteredProductsByBrand;
    }
  };

  const [sortOption, setSortOption] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sortMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node) &&
        showSortMenu
      ) {
        setShowSortMenu(false);
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node) &&
        showFilterMenu
      ) {
        setShowFilterMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortMenu, showFilterMenu]);

  // Flatten all products for sorting
  const flatProducts = [...allProducts];

  // Eligibility logic: eligible if price exists
  const isEligible = (product: any) => Boolean(product.price);

  // Filter logic
  let filteredProducts = flatProducts;
  
  // Filter by category first
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter((product) =>
      product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }
  
  // Then filter by brand (refines the category filter)
  if (selectedBrand !== "all") {
    filteredProducts = filteredProducts.filter((product) =>
      product.brand && product.brand.toLowerCase() === selectedBrand.toLowerCase()
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

  // Reset selected brand when category changes to prevent invalid brand selection
  useEffect(() => {
    if (selectedCategory !== "all") {
      const availableBrands = getProductsByBrandForCategory();
      if (!availableBrands[selectedBrand]) {
        setSelectedBrand("all");
      }
    }
  }, [selectedCategory]);

  // Function to get brand counts based on selected category
  const getBrandCountsForCategory = () => {
    if (selectedCategory === "all") {
      // If no category is selected, show total counts
      return Object.keys(productsByBrand).reduce((acc, brand) => {
        acc[brand] = productsByBrand[brand].length;
        return acc;
      }, {} as { [brand: string]: number });
    } else {
      // If category is selected, count only products in that category and filter out brands with 0 products
      const brandCounts: { [brand: string]: number } = {};
      Object.keys(productsByBrand).forEach(brand => {
        const count = productsByBrand[brand].filter(product => 
          product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
        ).length;
        if (count > 0) {
          brandCounts[brand] = count;
        }
      });
      return brandCounts;
    }
  };

  // Get brand counts dynamically based on selected category
  const brandCounts = useMemo(() => getBrandCountsForCategory(), [selectedCategory]);

  return (
    <PageLayout>
            {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Catalog", href: "/catalog" },
          { label: "All Products", isActive: true }
        ]}
        className="mb-4 sm:px-4 lg:px-0"
      />

      <div className="text-left mb-4 sm:px-4 lg:px-0">
        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mt-4 lg:mt-6 mb-2">
          {selectedCategory === "all" ? "All Products" : `All ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
        </h1>
        <h4 className="text-base font-base text-gray-800 mb-2">Browse our catalog of products and find the perfect item for your needs.</h4>
      </div>

      <PlatformInfoBanner />
      
      <div className="flex flex-col lg:flex-row">
        {/* Mobile: Filter Panel */}
        <div className="lg:hidden my-0 sm:my-4 sm:px-4">
          <div>
            <label className="block text-2xl font-regular text-gray-700 mb-2">Categories</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              {Array.from(new Set(allProducts.map((p: any) => p.category))).sort().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Desktop: Sidebar */}
        <div className="hidden lg:block">
          <CatalogSidebar
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            onCategorySelect={setSelectedCategory}
            onBrandSelect={setSelectedBrand}
            productsByBrand={getProductsByBrandForCategory()}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 mt-4 sm:mt-0 lg:pl-3 sm:px-4 lg:px-0">
          <div className="flex items-center justify-between mb-2 sm:mb-4 gap-4 flex-wrap w-full">
            <div className="text-base font-regular text-gray-900 min-w-max">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} item{sortedProducts.length === 1 ? "" : "s"}
            </div>
            {/* Desktop filter and sort dropdowns */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
              <div>
                <label htmlFor="brand-filter" className="mr-2 text-base font-regular text-gray-700">Filter by:</label>
                <select
                  id="brand-filter"
                  value={selectedBrand}
                  onChange={e => setSelectedBrand(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Brands</option>
                  {Object.keys(brandCounts).sort().map((brand) => (
                    <option key={brand} value={brand}>
                      {brand} ({brandCounts[brand]})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sort" className="mr-2 text-base font-regular text-gray-700">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            </div>
            {/* Mobile filter and sort icons */}
            <div className="flex lg:hidden items-center gap-2 ml-auto relative">
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
                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">Brands</div>
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedBrand === "all" ? "bg-gray-100 font-semibold" : ""}`}
                    onClick={() => { setSelectedBrand("all"); setShowFilterMenu(false); }}
                  >
                    All Brands
                  </button>
                  {Object.keys(brandCounts).sort().map((brand) => (
                    <button
                      key={brand}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedBrand === brand ? "bg-gray-100 font-semibold" : ""}`}
                      onClick={() => { setSelectedBrand(brand); setShowFilterMenu(false); }}
                    >
                      {brand} ({brandCounts[brand]})
                    </button>
                  ))}
                </div>
              )}
              {/* Sort menu */}
              {showSortMenu && (
                <div ref={sortMenuRef} className="absolute right-0 top-10 z-50 bg-white border border-gray-200 rounded shadow-md w-40">
                  {[
                    { value: "all", label: "All" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
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
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <PackageSearch className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedCategory !== "all" && selectedBrand !== "all" 
                    ? `No ${selectedCategory} available from ${selectedBrand}`
                    : selectedCategory !== "all"
                    ? `No ${selectedCategory} available`
                    : selectedBrand !== "all"
                    ? `No products available from ${selectedBrand}`
                    : "No products found"
                  }
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCategory !== "all" && selectedBrand !== "all"
                    ? `We don't currently have any ${selectedCategory.toLowerCase()} from ${selectedBrand} in our catalog. Try selecting a different brand or category.`
                    : selectedCategory !== "all"
                    ? `We don't currently have any ${selectedCategory.toLowerCase()} in our catalog. Try selecting a different category.`
                    : selectedBrand !== "all"
                    ? `We don't currently have any products from ${selectedBrand} in our catalog. Try selecting a different brand.`
                    : "We don't currently have any products matching your criteria. Try adjusting your filters."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {selectedCategory !== "all" && (
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      View All Categories
                    </button>
                  )}
                  {selectedBrand !== "all" && (
                    <button
                      onClick={() => setSelectedBrand("all")}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
                    >
                      View All Brands
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3">
              {paginatedProducts.map((product, idx) => (
                <ProductCard key={`${product.model}-${idx}`} product={product} fromCatalog={true} />
              ))}
            </div>
          )}
          
          {filteredProducts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
} 