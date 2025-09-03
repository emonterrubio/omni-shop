"use client";

import React, { useContext, useState, useRef } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
import { headphoneData } from "@/data/headphoneData";
import { mouseData } from "@/data/mouseData";
import { keyboardData } from "@/data/keyboardData";
import { webcamData } from "@/data/webcamData";
import { dockStationData } from "@/data/dockStationData";
import { backpackData } from "@/data/backpackData";
import { PageLayout } from "@/components/layout/PageLayout";
import { CheckCircle, AlertCircle, ArrowLeft, Box, Undo2 } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { CartContext } from "@/components/CartContext";
import { ComparisonProductCard } from "@/components/product/ProductComparisonCard";
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductInfoPanel } from '@/components/product/ProductInfoPanel';
import { ProductSpecsTable } from '@/components/product/ProductSpecsTable';
import { RequestHardwareBanner } from '@/components/product/RequestHardwareBanner';
import { ProductComparisonList } from '@/components/product/ProductComparisonList';
import { SupportBanner } from '@/components/product/SupportBanner';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function findProductByModel(model: string): any {
  let product = hardwareData.find(p => p.model === model);
  if (product) return { ...product, category: product.category };

  const monitor = monitorData.find(p => p.model === model);
  if (monitor) {
    return {
      ...monitor,
      category: "Monitors",
      card_description: monitor.card_description,
      processor: "",
      memory: "",
      storage: "",
      display: monitor.display_resolution,
      graphics: "",
      operating_system: "",
      ports: "",
      battery: "",
      other: `Curvature: ${monitor.curvature}, Touchscreen: ${monitor.touchscreen}, Pixel Density: ${monitor.pixel_density}, Refresh Rate: ${monitor.refresh_rate}`,
      features: `${monitor.display_resolution}, ${monitor.aspect_ratio}, ${monitor.display_type}`,
    };
  }

  const headphone = headphoneData.find(p => p.model === model);
  if (headphone) {
    return {
      ...headphone,
      category: "Headphones",
      card_description: headphone.card_description,
      processor: "",
      memory: "",
      storage: "",
      display: "",
      graphics: "",
      operating_system: "",
      ports: headphone.headphone_jack,
      battery: headphone.battery,
      other: headphone.connectivity,
      features: headphone.features,
    };
  }

  const mouse = mouseData.find(p => p.model === model);
  if (mouse) {
    return {
      ...mouse,
      category: "Mice",
      card_description: mouse.description, // Use description as card_description for now
      processor: "",
      memory: "",
      storage: "",
      display: "",
      graphics: "",
      operating_system: "",
      ports: "",
      battery: "",
      other: "",
      features: "",
    };
  }

  const keyboard = keyboardData.find(p => p.model === model);
  if (keyboard) {
    return {
      ...keyboard,
      category: "Keyboards",
      card_description: keyboard.card_description,
      processor: "",
      memory: "",
      storage: "",
      display: "",
      graphics: "",
      operating_system: "",
      ports: "",
      battery: keyboard.battery,
      other: keyboard.compatibility,
      features: `${keyboard.connectivity}, ${keyboard.number_keys} keys`,
    };
  }

  const webcam = webcamData.find(p => p.model === model);
  if (webcam) {
    return {
      ...webcam,
      category: "Webcams",
      card_description: webcam.card_description,
      processor: "",
      memory: "",
      storage: "",
      display: webcam.display_resolution,
      graphics: "",
      operating_system: "",
      ports: "",
      battery: "",
      other: `Video Resolution: ${webcam.video_resolution}, Image Aspect Ratio: ${webcam.image_aspect_ratio}, Image Capture Rate: ${webcam.image_capture_rate}`,
      features: `${webcam.video_resolution}, ${webcam.display_resolution}, ${webcam.image_capture_rate}`,
    };
  }

  const dockStation = dockStationData.find(p => p.model === model);
  if (dockStation) {
    return {
      ...dockStation,
      category: "Docking Stations",
      card_description: dockStation.card_description,
      processor: "",
      memory: "",
      storage: "",
      display: "",
      graphics: "",
      operating_system: "",
      ports: dockStation.ports,
      battery: "",
      other: `Dimensions: ${dockStation.dimensions}, Weight: ${dockStation.weight}`,
      features: `${dockStation.ports}, ${dockStation.power}`,
    };
  }

  const backpack = backpackData.find(p => p.model === model);
  if (backpack) {
    return {
      ...backpack,
      category: "Backpacks",
      card_description: backpack.card_description,
      processor: "",
      memory: "",
      storage: "",
      display: "",
      graphics: "",
      operating_system: "",
      ports: "",
      battery: "",
      other: `Size: ${backpack.size}, Capacity: ${backpack.capacity}`,
      features: backpack.features,
    };
  }

  // Add similar logic for other categories...
  return null;
}

function getProductSpecs(product: any) {
  switch (product.category) {
    case "Laptops":
    case "Desktops":
      return [
        { label: "Processor", value: product.processor },
        { label: "Memory", value: product.memory },
        { label: "Storage", value: product.storage },
        { label: "Display", value: product.display },
        { label: "Graphics", value: product.graphics },
        { label: "Operating System", value: product.operating_system },
        { label: "Ports", value: product.ports },
        { label: "Battery", value: product.battery },
        { label: "Other", value: product.other },
      ];
    case "Monitors":
      return [
        { label: "Model", value: product.model },
        { label: "Resolution", value: product.display_resolution },
        { label: "Aspect Ratio", value: product.aspect_ratio },
        { label: "Display Type", value: product.display_type },
        { label: "Touchscreen", value: product.touchscreen },
        { label: "Curvature", value: product.curvature },
        { label: "Pixel Density", value: product.pixel_density },
        { label: "Refresh Rate", value: product.refresh_rate },
      ];
    case "Headphones":
      return [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.model },
        { label: "Connectivity", value: product.connectivity },
        { label: "Controls", value: product.controls },
        { label: "Battery", value: product.battery },
        { label: "Headphone Jack", value: product.headphone_jack },
        { label: "Charging", value: product.charging },
        { label: "Features", value: product.features },
      ];
    case "Mice":
      return [
        { label: "Model", value: product.model },
        { label: "DPI", value: product.dpi },
        { label: "Connection", value: product.connection },
        { label: "Battery", value: product.battery },
        { label: "Features", value: product.features },
        { label: "Connectivity", value: product.connectivity },
        { label: "Button Quantity", value: product.button_quantity },
        { label: "Compatibility", value: product.compatibility },
      ];
    case "Keyboards":
      return [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.model },
        { label: "Connectivity", value: product.connectivity },
        { label: "Compatibility", value: product.compatibility },
        { label: "Number of Keys", value: product.number_keys },
        { label: "Battery", value: product.battery },
        { label: "Features", value: product.features },
      ];
    case "Webcams":
      return [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.model },
        { label: "Video Resolution", value: product.video_resolution },
        { label: "Display Resolution", value: product.display_resolution },
        { label: "Image Aspect Ratio", value: product.image_aspect_ratio },
        { label: "Image Capture Rate", value: product.image_capture_rate },
        { label: "Supported Image Format", value: product.supported_image_format },
        { label: "Supported Audio Format", value: product.supported_audio_format },
        { label: "Supported Video Format", value: product.supported_video_format },
      ];
    case "Docking Stations":
      return [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.model },
        { label: "Ports", value: product.ports },
        { label: "Power", value: product.power },
        { label: "Dimensions", value: product.dimensions },
        { label: "Weight", value: product.weight },
      ];
    case "Backpacks":
      return [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.model },
        { label: "Size", value: product.size },
        { label: "Capacity", value: product.capacity },
        { label: "Features", value: product.features },
      ];
    // Add cases for other categories...
    default:
      return [];
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from");

  const modelParam = params.model;
  const model = Array.isArray(modelParam)
    ? decodeURIComponent(modelParam[0])
    : decodeURIComponent(modelParam || "");

  const product = findProductByModel(model);
  const specs = product ? getProductSpecs(product) : [];

  // --- Comparison logic ---
  // Aggregate all products
  const allProducts = [
    ...hardwareData,
    ...monitorData.map(p => ({ ...p, category: "Monitors" })),
    ...headphoneData.map(p => ({ ...p, category: "Headphones" })),
    ...mouseData.map(p => ({ ...p, category: "Mice" })),
    ...keyboardData.map(p => ({ ...p, category: "Keyboards" })),
    ...webcamData.map(p => ({ ...p, category: "Webcams" })),
    ...dockStationData.map(p => ({ ...p, category: "Docking Stations" })),
    ...backpackData.map(p => ({ ...p, category: "Backpacks" })),
  ];
  // Exclude current product
  const others = allProducts.filter(p => p.model !== product?.model);
  
  // --- Dropdown comparison state ---
  const [selectedComparisonProducts, setSelectedComparisonProducts] = useState<any[]>([]);
  
  // Initialize with default comparison products
  React.useEffect(() => {
    if (product && selectedComparisonProducts.length === 0) {
      // 1. Find all same-brand, same-category products (excluding current)
      let sameBrand = others.filter(p => p.category === product.category && p.brand === product.brand);
      // 2. Find all same-category, other-brand products
      let otherBrand = others.filter(p => p.category === product.category && p.brand !== product.brand);
      // Compose final comparisonProducts
      let defaultComparisonProducts = [...sameBrand, ...otherBrand].slice(0, 3);
      setSelectedComparisonProducts(defaultComparisonProducts);
    }
  }, [product, others, selectedComparisonProducts.length]);

  const handleProductChange = (index: number, productModel: string) => {
    const selectedProduct = others.find(p => p.model === productModel);
    if (selectedProduct) {
      const newSelectedProducts = [...selectedComparisonProducts];
      newSelectedProducts[index] = selectedProduct;
      setSelectedComparisonProducts(newSelectedProducts);
    }
  };

  const handleBackClick = () => {
    // Use browser back navigation if there's history, otherwise fallback to home
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const compareSectionRef = useRef<HTMLDivElement>(null);

  // Ensure quantity is 1 for laptops and desktops
  React.useEffect(() => {
    if (product && (product.category === "Laptops" || product.category === "Desktops")) {
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <PageLayout>
        <div className="text-2xl font-semibold text-gray-700 mb-4">Product Not Found</div>
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">Back to Home</Link>
      </PageLayout>
    );
  }

  // Unified eligibility logic: eligible if price exists (or battery for laptops/desktops)
  const isEligible = product.category === "Laptops" || product.category === "Desktops"
    ? Boolean(product.battery)
    : Boolean(product.price);

  return (
    <PageLayout>
        {/* <button
          onClick={handleBackClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button> */}
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Catalog", href: "/catalog" },
            { label: product.category || "Products", href: `/category/${product.category?.toLowerCase()}` },
            { label: product.model, isActive: true }
          ]}
          className="mb-8"
        />
        <div className="flex flex-col md:flex-row space-x-0 gap-8">
          <div className="flex-1">
            <ProductImageGallery mainImage={product.image} thumbnails={[]} />
          </div>
          <div className="flex-1">
            <ProductInfoPanel
              brand={product.brand}
              title={product.model}
              price={product.price}
              available={isEligible}
              deliveryTime={"Within 5 days"}
              description={product.description}
              quantity={quantity}
              category={product.category}
              onQuantityChange={setQuantity}
              onAddToCart={() => {
                addToCart({
                  model: product.model,
                  brand: product.brand,
                  image: product.image,
                  price: product.price,
                  quantity,
                  recommended: product.recommended,
                  description: product.description,
                  card_description: product.card_description,
                  category: product.category,
                });
              }}
              onCompare={() => {
                if (compareSectionRef.current) {
                  compareSectionRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
          </div>
        </div>
        <div className="mt-6">
          <ProductSpecsTable specs={specs} />
        </div>
        <RequestHardwareBanner />
        {/* --- Comparison Cards --- */}
        <div ref={compareSectionRef}>
          <div className="mt-8">
            <h2 className="text-2xl font-medium mb-4">Compare with similar items</h2>
            <p className="text-base text-gray-600 mb-6">Select products to compare with {product?.model}</p>
            
            {/* Product Selection Dropdowns */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="relative">
                    <select
                      value={selectedComparisonProducts[index]?.model || ""}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      className="w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="">Select a product...</option>
                      {others.map((product) => (
                        <option key={product.model} value={product.model}>
                          {product.brand} {product.model}
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
            {selectedComparisonProducts.length > 0 && selectedComparisonProducts.some(p => p) && (
              <ProductComparisonList 
                products={selectedComparisonProducts.filter(p => p)} 
                getProductSpecs={getProductSpecs} 
              />
            )}

            {/* Empty State */}
            {selectedComparisonProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products selected for comparison</h3>
                <p className="text-gray-600">
                  Use the dropdown selectors above to choose up to 3 products to compare with {product?.model}.
                </p>
              </div>
            )}
          </div>
        </div>
        <SupportBanner />
    </PageLayout>
  );
} 