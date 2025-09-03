"use client";

import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductComparisonList } from "@/components/product/ProductComparisonList";
import { hardwareData, HardwareSpec } from "@/data/hardwareData";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<HardwareSpec[]>([]);
  
  // Get all available products for selection
  const availableProducts = hardwareData;
  
  // Initialize with first 3 products if none selected
  React.useEffect(() => {
    if (selectedProducts.length === 0 && availableProducts.length >= 3) {
      setSelectedProducts(availableProducts.slice(0, 3));
    }
  }, [availableProducts, selectedProducts.length]);

  const handleProductChange = (index: number, productModel: string) => {
    const product = availableProducts.find(p => p.model === productModel);
    if (product) {
      const newSelectedProducts = [...selectedProducts];
      newSelectedProducts[index] = product;
      setSelectedProducts(newSelectedProducts);
    }
  };

  const getProductSpecs = (product: any) => {
    const specs = [];
    
    // Add basic product information
    if (product.brand) specs.push({ label: "Brand", value: product.brand });
    if (product.model) specs.push({ label: "Model", value: product.model });
    if (product.category) specs.push({ label: "Category", value: product.category });
    if (product.price) specs.push({ label: "Price", value: `$${product.price.toLocaleString()}` });

    
    // Add category-specific specifications
    if (product.category === "Laptops") {
      if (product.processor) specs.push({ label: "Processor", value: product.processor });
      if (product.memory) specs.push({ label: "Memory", value: product.memory });
      if (product.storage) specs.push({ label: "Storage", value: product.storage });
      if (product.display) specs.push({ label: "Display", value: product.display });
      if (product.graphics) specs.push({ label: "Graphics", value: product.graphics });
      if (product.operating_system) specs.push({ label: "Operating System", value: product.operating_system });
      if (product.ports) specs.push({ label: "Ports", value: product.ports });
      if (product.battery) specs.push({ label: "Battery", value: product.battery });
      if (product.other) specs.push({ label: "Other", value: product.other });
    } else if (product.category === "Monitors") {
      if (product.display) specs.push({ label: "Display", value: product.display });
      if (product.ports) specs.push({ label: "Ports", value: product.ports });
      if (product.other) specs.push({ label: "Features", value: product.other });
    } else if (product.category === "Docking Stations") {
      if (product.ports) specs.push({ label: "Ports", value: product.ports });
      if (product.other) specs.push({ label: "Features", value: product.other });
    } else if (product.category === "Headphones" || product.category === "Headsets") {
      if (product.features) specs.push({ label: "Features", value: product.features });
      if (product.other) specs.push({ label: "Specifications", value: product.other });
    } else {
      // For other categories, show available specs
      if (product.processor) specs.push({ label: "Processor", value: product.processor });
      if (product.memory) specs.push({ label: "Memory", value: product.memory });
      if (product.storage) specs.push({ label: "Storage", value: product.storage });
      if (product.display) specs.push({ label: "Display", value: product.display });
      if (product.graphics) specs.push({ label: "Graphics", value: product.graphics });
      if (product.operating_system) specs.push({ label: "Operating System", value: product.operating_system });
      if (product.ports) specs.push({ label: "Ports", value: product.ports });
      if (product.battery) specs.push({ label: "Battery", value: product.battery });
      if (product.features) specs.push({ label: "Features", value: product.features });
      if (product.other) specs.push({ label: "Other", value: product.other });
    }

    return specs;
  };

  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Compare", isActive: true }
        ]}
        className="mb-8"
      />
    <div>
      <div className="text-left">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4">Compare models</h1>
        <p className="text-base text-gray-600 mb-8">Compare processor speed, battery life, and portability to find your ideal laptop.</p>
      </div>
        
        {/* Product Selection Dropdowns */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="relative">
                <select
                  value={selectedProducts[index]?.model || ""}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                  className="w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="">Select a product...</option>
                  {availableProducts.map((product) => (
                    <option key={product.model} value={product.model}>
                      {product.model}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Results */}
        {selectedProducts.length > 0 && (
          <div>
            <ProductComparisonList
              products={selectedProducts.map(p => ({
                ...p,
                brand: p.brand,
                model: p.model,
                category: p.category,
                description: p.description || `${p.brand} ${p.model}`,
                price: p.price,
                image: p.image || `/images/${p.brand.toLowerCase()}_${p.model.toLowerCase().replace(/\s+/g, "_")}.png`,
                features: p.description || `${p.brand} ${p.model}`,
                recommended: true
              }))}
              getProductSpecs={getProductSpecs}
            />
          </div>
        )}

        {/* Empty State */}
        {selectedProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-6">
              <svg className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No products selected for comparison</h2>
            <p className="text-gray-600 mb-8">
              Use the dropdown selectors above to choose up to 3 products to compare side by side.
            </p>
          </div>
        )}
        
        {/* Need Help Section */}
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col items-center mt-8">
          <div className="text-2xl font-medium mb-1">Need help?</div>
          <div className="mb-3 text-gray-600 text-center text-base">Talk to one of our IT experts</div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded">Start a Conversation</button>
        </div>
      </div>
    </PageLayout>
  );
} 