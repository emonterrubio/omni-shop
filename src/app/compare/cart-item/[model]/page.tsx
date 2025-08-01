"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
import { headphoneData } from "@/data/headphoneData";
import { mouseData } from "@/data/mouseData";
import { keyboardData } from "@/data/keyboardData";
import { webcamData } from "@/data/webcamData";
import { dockStationData } from "@/data/dockStationData";
import { backpackData } from "@/data/backpackData";
import { ComparisonProductCard } from "@/components/product/ProductComparisonCard";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { SupportBanner } from "@/components/product/SupportBanner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function findProductByModel(model: string): any {
  let product = hardwareData.find(p => p.model === model);
  if (product) return { ...product, category: "Hardware" };

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
      card_description: mouse.description,
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

  return null;
}

function getProductSpecs(product: any) {
  switch (product.category) {
    case "Hardware":
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
    default:
      return [];
  }
}

export default function CartItemComparePage() {
  const params = useParams();
  const router = useRouter();
  
  const modelParam = params.model;
  const model = Array.isArray(modelParam)
    ? decodeURIComponent(modelParam[0])
    : decodeURIComponent(modelParam || "");

  const selectedProduct = findProductByModel(model);
  
  const comparisonProducts = useMemo(() => {
    if (!selectedProduct) return [];

    // Get comparison product models first
    let comparisonModels: string[] = [];
    
    // Find similar products (same category, different brand)
    const allModels = [
      ...hardwareData.map(p => p.model),
      ...monitorData.map(p => p.model),
      ...headphoneData.map(p => p.model),
      ...mouseData.map(p => p.model),
      ...keyboardData.map(p => p.model),
      ...webcamData.map(p => p.model),
      ...dockStationData.map(p => p.model),
      ...backpackData.map(p => p.model),
    ];
    
    // Exclude current product
    const otherModels = allModels.filter(m => m !== selectedProduct.model);
    
    // Find products from same category first
    const sameCategoryModels = otherModels.filter(model => {
      const product = findProductByModel(model);
      return product && product.category === selectedProduct.category;
    });
    
    // Find products from different categories
    const otherCategoryModels = otherModels.filter(model => {
      const product = findProductByModel(model);
      return product && product.category !== selectedProduct.category;
    });
    
    // Compose final comparison models (2 similar + 1 different)
    comparisonModels = [...sameCategoryModels, ...otherCategoryModels].slice(0, 2);
    
    // Convert models to full product objects using findProductByModel
    const comparisonProducts = comparisonModels
      .map(model => findProductByModel(model))
      .filter(product => product !== null);
    
    return comparisonProducts;
  }, [selectedProduct]);

  const handleBackClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/cart');
    }
  };

  if (!selectedProduct) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <MainNavigation />
        <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
          <div className="text-2xl font-semibold text-gray-700 mb-4">Product Not Found</div>
          <Link href="/cart" className="text-blue-600 hover:text-blue-800 font-medium">Back to Cart</Link>
        </main>
      </div>
    );
  }

  const allProducts = [selectedProduct, ...comparisonProducts];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <MainNavigation />
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        
        <div className="text-left">
          <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4">Compare with similar items</h1>
          <h4 className="font-base text-gray-600 mb-8">Compare {selectedProduct.brand} {selectedProduct.model} with similar products to make the best choice.</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allProducts.map((product) => (
            <div key={product.model} className="flex flex-col items-center">
              <ComparisonProductCard
                image={product.image}
                brand={product.brand}
                model={product.model}
                description={product.description || product.card_description || ""}
                card_description={product.card_description}
                features={product.features || ""}
                subFeatures={product.features ? product.features.split(',').map((f: string) => f.trim()) : []}
                price={product.price}
                chip={product.processor || product.category || ""}
                specs={getProductSpecs(product)}
              />
            </div>
          ))}
        </div>
        <SupportBanner />
      </main>
    </div>
  );
} 