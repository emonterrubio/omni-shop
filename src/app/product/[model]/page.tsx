"use client";

import React, { useContext } from "react";
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
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { CheckCircle, AlertCircle, ArrowLeft, Box, Undo2 } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { CartContext } from "@/components/CartContext";

function findProductByModel(model: string) {
  let product = hardwareData.find(p => p.model === model);
  if (product) return { ...product, category: product.category };

  const monitor = monitorData.find(p => p.model === model);
  if (monitor) {
    return {
      ...monitor,
      category: "Monitors",
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

  const handleBackClick = () => {
    // Use browser back navigation if there's history, otherwise fallback to home
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const { addToCart } = useContext(CartContext);

  if (!product) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <MainNavigation />
        <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
          <div className="text-2xl font-semibold text-gray-700 mb-4">Product Not Found</div>
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">Back to Home</Link>
        </main>
      </div>
    );
  }

  // Unified eligibility logic: eligible if price exists (or battery for laptops/desktops)
  const isEligible = product.category === "Laptops" || product.category === "Desktops"
    ? Boolean(product.battery)
    : Boolean(product.price);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
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
        <div className="flex flex-col md:flex-row space-x-0">
          {/* Left: Image */}
          <div className="flex flex-col items-center md:w-1/2 mt-6 mb-6 md:mb-0">
            <img
              src={product.image || "https://placehold.co/400x300?text=No+Image"}
              alt={product.model}
              className="w-full max-w-md object-contain mb-6 mr-8"
            />
            <Link 
              href={`/product/${product.model}/gallery`}
              className="text-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View Gallery
            </Link>
          </div>
          {/* Right: Details */}
          <div className="mt-4 md:w-1/2">
            <span className="text-blue-600 text-lg font-medium mb-2">{product.brand}</span>
            <h1 className="text-4xl font-medium mb-2">{product.model}</h1>
            <div className="text-base font-regular text-gray-600 leading-snug mb-6">{product.description}</div>
            <h4 className="text-2xl font-medium">Product Specifications</h4>
            <div>
              {specs.map((spec, idx) =>
                spec.value ? (
                  <div
                    key={idx}
                    className="py-3 border-b last:border-b-0 border-gray-200"
                  >
                    <div className="text-base font-semibold text-gray-800">{spec.label}</div>
                    <div className="text-sm font-regular text-gray-600">{spec.value}</div>
                  </div>
                ) : null
              )}
            </div>
            <div className={`flex items-center font-medium text-sm my-4 ${isEligible ? "text-green-600" : "text-red-600"}`}>
              {isEligible ? (
                <CheckCircle className="w-5 h-5 mr-1" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-1" />
              )}
              {isEligible ? "Eligible" : "Not Eligible"}
            </div>
            <div className="text-gray-400 text-sm mb-2">
              {isEligible ? "Recommended based on your role" : "Not recommended"}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-4">${product.price}</div>
            <button
              className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition-colors mt-2 mb-8"
              onClick={() => {
                addToCart({
                  model: product.model,
                  brand: product.brand,
                  image: product.image,
                  price: product.price,
                  quantity: 1,
                  recommended: product.recommended,
                });
                // Optional: show a confirmation
                // alert('Added to cart!');
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 