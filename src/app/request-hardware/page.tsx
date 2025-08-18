"use client";

import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Filter, X } from 'lucide-react';
import { hardwareData } from '@/data/hardwareData';
import { ProductCard } from '@/components/ui/ProductCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface FilterState {
  usage: string;
  keyFeatures: string[];
  priceRange: string;
}

export default function RequestHardwarePage() {
  // Debug: Check if hardwareData is available
  console.log('Hardware data available:', hardwareData?.length || 0);
  console.log('Sample product:', hardwareData?.[0]);

  const [filters, setFilters] = useState<FilterState>({
    usage: 'Business & Productivity',
    keyFeatures: [],
    priceRange: 'All'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [defaultProducts, setDefaultProducts] = useState<any[]>([]);

  // Enhanced product suggestion mapping based on usage type
  const usageProductMapping = {
    'Business & Productivity': {
      categories: ['Laptops', 'Desktops'],
      priorityFeatures: ['SSD Storage', 'USB-C', 'Thunderbolt', 'Long Battery Life'],
      minMemory: '8 GB',
      minStorage: '256 GB',
      description: 'Professional devices optimized for office work, email, and video conferencing'
    },
    'Creative Work': {
      categories: ['Laptops', 'Desktops'],
      priorityFeatures: ['Large Screen', 'High Performance', 'SSD Storage', 'Touchscreen'],
      minMemory: '16 GB',
      minStorage: '512 GB',
      description: 'High-performance devices for design, video editing, and 3D modeling'
    },
    'Software Development': {
      categories: ['Laptops', 'Desktops'],
      priorityFeatures: ['SSD Storage', 'Large Screen', 'High Performance', 'Multiple Ports'],
      minMemory: '16 GB',
      minStorage: '512 GB',
      description: 'Powerful machines for coding, compiling, and running virtual machines'
    },
    'Ultra-Portable': {
      categories: ['Laptops'],
      priorityFeatures: ['Lightweight', 'Long Battery Life', 'USB-C', 'Compact Design'],
      minMemory: '8 GB',
      minStorage: '256 GB',
      maxWeight: '3.5 lbs',
      description: 'Lightweight laptops perfect for travel and mobile work'
    },
    'Data Analysis': {
      categories: ['Laptops', 'Desktops'],
      priorityFeatures: ['High Performance', 'Large Memory', 'SSD Storage', 'Large Screen'],
      minMemory: '32 GB',
      minStorage: '1 TB',
      description: 'High-performance devices for machine learning and big data processing'
    }
  };

  const usageOptions = [
    { value: 'Business & Productivity', label: 'Business & Productivity', description: 'Office apps, email, web browsing, video calls' },
    { value: 'Creative Work', label: 'Creative Work', description: 'Photo/video editing, design, 3D modeling' },
    { value: 'Software Development', label: 'Software Development', description: 'Coding, compiling, virtual machines, databases' },
    { value: 'Ultra-Portable', label: 'Ultra-Portable', description: 'Gaming, streaming, media consumption' },
    { value: 'Data Analysis', label: 'Data Analysis', description: 'Machine learning, big data, statistical analysis' }
  ];

  const keyFeatureOptions = [
    'Ultra-Lightweight',
    'Large Screen (15"+)',
    'SSD Storage',
    'Touchscreen',
    'USB-C Charging',
    'Fingerprint Reader'
  ];

  const priceRangeOptions = [
    'All',
    'Under $1,500',
    '$1,500 - $2,500',
    '$2,500+'
  ];

  const handleUsageChange = (usage: string) => {
    setFilters(prev => ({ ...prev, usage }));
  };

  const handleKeyFeatureToggle = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.includes(feature)
        ? prev.keyFeatures.filter(f => f !== feature)
        : [...prev.keyFeatures, feature]
    }));
  };

  const handlePriceRangeChange = (range: string) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const clearAllFilters = () => {
    setFilters({
      usage: 'Business & Productivity',
      keyFeatures: [],
      priceRange: 'All'
    });
    setFiltersApplied(false);
    setSuggestedProducts(defaultProducts);
  };

  const applyFilters = () => {
    console.log('Applying filters:', filters);
    
    // Apply the filters and update the product grid
    const filteredProducts = filterProducts();
    setSuggestedProducts(filteredProducts);
    setFiltersApplied(true);
    setShowFilters(false);
  };

  // Enhanced filter products based on selected usage and features
  const filterProducts = () => {
    const mapping = usageProductMapping[filters.usage as keyof typeof usageProductMapping];
    if (!mapping) return [];

    console.log('Filtering for usage:', filters.usage);
    console.log('Mapping found:', mapping);

    // Score each product based on how well it matches the usage criteria
    const scoredProducts = hardwareData.map(product => {
      let score = 0;
      let matchDetails = [];

      // Category match (base score)
      if (mapping.categories.includes(product.category)) {
        score += 50;
        matchDetails.push('Category match');
      }

      // Memory requirements
      if ('minMemory' in mapping && mapping.minMemory) {
        const productMemory = product.memory;
        const requiredMemory = mapping.minMemory;
        
        if (productMemory.includes('GB')) {
          const memoryGB = parseInt(productMemory.match(/(\d+)/)?.[1] || '0');
          const requiredGB = parseInt(requiredMemory.match(/(\d+)/)?.[1] || '0');
          
          if (memoryGB >= requiredGB) {
            score += 20;
            matchDetails.push(`Memory: ${memoryGB}GB (≥${requiredGB}GB)`);
          } else {
            score -= 10;
            matchDetails.push(`Memory: ${memoryGB}GB (<${requiredGB}GB)`);
          }
        }
      }

      // Storage requirements
      if ('minStorage' in mapping && mapping.minStorage) {
        const productStorage = product.storage;
        const requiredStorage = mapping.minStorage;
        
        if (productStorage.includes('GB') || productStorage.includes('TB')) {
          let storageGB = 0;
          if (productStorage.includes('TB')) {
            storageGB = parseInt(productStorage.match(/(\d+)/)?.[1] || '0') * 1024;
          } else {
            storageGB = parseInt(productStorage.match(/(\d+)/)?.[1] || '0');
          }
          
          const requiredGB = requiredStorage.includes('TB') 
            ? parseInt(requiredStorage.match(/(\d+)/)?.[1] || '0') * 1024
            : parseInt(requiredStorage.match(/(\d+)/)?.[1] || '0');
          
          if (storageGB >= requiredGB) {
            score += 15;
            matchDetails.push(`Storage: ${storageGB >= 1024 ? (storageGB/1024).toFixed(1) + 'TB' : storageGB + 'GB'} (≥${requiredGB >= 1024 ? (requiredGB/1024).toFixed(1) + 'TB' : requiredGB + 'GB'})`);
          } else {
            score -= 5;
            matchDetails.push(`Storage: ${storageGB >= 1024 ? (storageGB/1024).toFixed(1) + 'TB' : storageGB + 'GB'} (<${requiredGB >= 1024 ? (requiredGB/1024).toFixed(1) + 'TB' : requiredGB + 'GB'})`);
          }
        }
      }

      // Feature matching
      if ('priorityFeatures' in mapping && mapping.priorityFeatures) {
        const productText = `${product.features} ${product.description} ${product.card_description}`.toLowerCase();
        
        mapping.priorityFeatures.forEach(feature => {
          const featureLower = feature.toLowerCase();
          if (productText.includes(featureLower)) {
            score += 10;
            matchDetails.push(`Feature: ${feature}`);
          }
        });
      }

      // Display size matching for specific use cases
      if ('priorityFeatures' in mapping && mapping.priorityFeatures?.includes('Large Screen')) {
        const displayText = product.display.toLowerCase();
        if (displayText.includes('15') || displayText.includes('16') || displayText.includes('17')) {
          score += 15;
          matchDetails.push('Large screen (15"+');
        }
      }

      // Battery life for portable use cases
      if ('priorityFeatures' in mapping && mapping.priorityFeatures?.includes('Long Battery Life')) {
        const batteryText = product.battery.toLowerCase();
        if (batteryText.includes('18') || batteryText.includes('19') || batteryText.includes('20')) {
          score += 10;
          matchDetails.push('Long battery life');
        }
      }

      // Touchscreen for creative work
      if ('priorityFeatures' in mapping && mapping.priorityFeatures?.includes('Touchscreen')) {
        const productText = `${product.features} ${product.description}`.toLowerCase();
        if (productText.includes('touch') || productText.includes('pixel')) {
          score += 15;
          matchDetails.push('Touchscreen');
        }
      }

      // High performance indicators
      if ('priorityFeatures' in mapping && mapping.priorityFeatures?.includes('High Performance')) {
        const processorText = product.processor.toLowerCase();
        if (processorText.includes('i7') || processorText.includes('i9') || processorText.includes('ultra') || processorText.includes('m4')) {
          score += 15;
          matchDetails.push('High performance processor');
        }
      }

      // Price consideration (bonus for good value)
      if (product.price <= 2500) {
        score += 5;
        matchDetails.push('Good value');
      }

      // Apply key features filter if user has selected any
      if (filters.keyFeatures.length > 0) {
        const productText = `${product.features} ${product.description} ${product.card_description}`.toLowerCase();
        let featureMatches = 0;
        
        filters.keyFeatures.forEach(feature => {
          const featureLower = feature.toLowerCase();
          if (productText.includes(featureLower)) {
            featureMatches++;
            score += 15;
            matchDetails.push(`Selected feature: ${feature}`);
          }
        });
        
        // Bonus for matching multiple selected features
        if (featureMatches > 1) {
          score += 10;
          matchDetails.push(`Multiple feature matches: ${featureMatches}`);
        }
      }

      // Apply price range filter
      if (filters.priceRange !== 'All') {
        let priceMatch = false;
        
        switch (filters.priceRange) {
          case 'Under $1,500':
            priceMatch = product.price < 1500;
            break;
          case '$1,500 - $2,500':
            priceMatch = product.price >= 1500 && product.price <= 2500;
            break;
          case '$2,500+':
            priceMatch = product.price > 2500;
            break;
        }
        
        if (priceMatch) {
          score += 20;
          matchDetails.push(`Price range: ${filters.priceRange}`);
        } else {
          score -= 30; // Significant penalty for price mismatch
          matchDetails.push(`Price mismatch: ${filters.priceRange}`);
        }
      }

      console.log(`Product ${product.model}: Score=${score}, Details:`, matchDetails);

      return {
        ...product,
        matchScore: score,
        matchDetails
      };
    });

    // Filter products that meet minimum requirements and sort by score
    let filtered = scoredProducts
      .filter(product => product.matchScore > 30) // Only show products with decent matches
      .sort((a, b) => b.matchScore - a.matchScore); // Sort by score descending

    console.log('Filtered products count:', filtered.length);
    
    // If no products found with good scores, show some default products
    if (filtered.length === 0) {
      console.log('No products found with good scores, showing default products');
      return hardwareData.slice(0, 6);
    }
    
    // Return top 6 products
    return filtered.slice(0, 6);
  };

  // Initialize with default products on component mount
  useEffect(() => {
    const initialProducts = hardwareData.slice(0, 6);
    console.log('Default products found:', initialProducts.length);
    console.log('Available hardware data:', hardwareData.length);
    setDefaultProducts(initialProducts);
    setSuggestedProducts(initialProducts);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <PageLayout>
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Request Hardware", isActive: true }
          ]}
          className="mb-6"
        />
        
        {/* Header */}
        <div className="text-left mb-4 lg:mb-6">
          <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mt-4 lg:mt-6 mb-4">
            Find the right device for your work
          </h1>
          <p className="text-base font-regular text-gray-800 mb-2">
            Each device is rated on key strengths and designed for specific types of work. Use the filters below to find devices that match your needs.
          </p>
          <a href="/hardware-specs" className="text-blue-600 hover:text-blue-800 font-medium">
            Learn about hardware specs →
          </a>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                showFilters
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filter Cards */}
          {showFilters && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-2">
              {/* Usage Filter */}
              <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage</h3>
                <div className="space-y-0">
                  {usageOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                        filters.usage === option.value
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="usage"
                        value={option.value}
                        checked={filters.usage === option.value}
                        onChange={() => handleUsageChange(option.value)}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Key Features Filter */}
              <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
                <div className="space-y-3">
                  {keyFeatureOptions.map((feature) => (
                    <label key={feature} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.keyFeatures.includes(feature)}
                        onChange={() => handleKeyFeatureToggle(feature)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-900">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Range</h3>
                <div className="space-y-3">
                  {priceRangeOptions.map((range) => (
                    <label key={range} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range}
                        onChange={() => handlePriceRangeChange(range)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-900">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Spacer column to complete the 5-column grid */}
              <div className="lg:col-span-1"></div>
            </div>
          )}

          {/* Filter Actions */}
          {showFilters && (
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <span className="text-base text-gray-800">
                  {filters.keyFeatures.length} key features selected
                </span>
                {filtersApplied && (
                  <span className="text-sm text-green-600 font-medium">
                    ✓ Filters applied
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearAllFilters}
                  className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={applyFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product Suggestions */}
        <div className="mt-8">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {filtersApplied ? `Results for ${filters.usage}` : 'Popular Devices'}
              </h2>
              <p className="text-gray-600">
                {filtersApplied 
                  ? usageProductMapping[filters.usage as keyof typeof usageProductMapping]?.description
                  : 'Browse our selection of recommended hardware to get started'
                }
              </p>
              {filtersApplied && (
                <div className="mt-2 text-sm text-gray-800">
                  <span className="font-bold">Applied filters:</span> {filters.keyFeatures.length} key features, {filters.priceRange}
                </div>
              )}
            </div>
            <div className="text-base text-gray-800 mt-2">
              Showing {suggestedProducts.length} devices
            </div>
          </div>

          {suggestedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedProducts.map((product, idx) => (
                <div key={`${product.model}-${idx}`} className="relative">
                  <ProductCard 
                    product={{
                      brand: product.brand,
                      model: product.model,
                      category: product.category,
                      description: product.description,
                      card_description: product.card_description,
                      features: product.features,
                      image: product.image,
                      price: product.price,
                      recommended: product.recommended,
                    }} 
                    fromCatalog={false}
                  />
                  {/* Match Score Badge */}
                  {/* {product.matchScore && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {product.matchScore} pts
                    </div>
                  )} */}
                  {/* Match Details Tooltip */}
                  {/* {product.matchDetails && product.matchDetails.length > 0 && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs">
                      <div className="font-medium text-gray-700 mb-1">Why this matches:</div>
                      <ul className="space-y-1">
                        {product.matchDetails.slice(0, 3).map((detail: string, detailIdx: number) => (
                          <li key={detailIdx} className="text-gray-600">• {detail}</li>
                        ))}
                        {product.matchDetails.length > 3 && (
                          <li className="text-gray-500">• +{product.matchDetails.length - 3} more...</li>
                        )}
                      </ul>
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to see more product suggestions
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Adjust Filters
              </button>
            </div>
          )}
        </div>
      </PageLayout>
    );
  }
