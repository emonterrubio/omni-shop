import React from "react";
import Link from "next/link";
import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
// import { headphoneData } from "@/data/headphoneData";
// import { mouseData } from "@/data/mouseData";
// import { keyboardData } from "@/data/keyboardData";
import { Header } from "@/components/layout/Header";
import { CheckCircle, AlertCircle, ArrowLeft, Box, Undo2 } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";

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
    // Add cases for other categories...
    default:
      return [];
  }
}

export default function ProductDetailPage({ params }: any) {
  const model = typeof params.model === "string" ? decodeURIComponent(params.model) : Array.isArray(params.model) ? decodeURIComponent(params.model[0]) : "";
  const product = findProductByModel(model);
  const specs = product ? getProductSpecs(product) : [];

  // Set back link based on category
  const backHref = product && product.category === "Monitors"
    ? "/category/monitors"
    : "/";

  if (!product) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header cartItems={0} />
        <main className="flex-1 flex flex-col items-center justify-center">
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
      <Header cartItems={0} />
      <main className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-6">
        <Link
          href={backHref}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <div className="flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="flex flex-col md:w-1/2 mt-6 mb-4 md:mb-0">
            <img
              src={product.image || "https://placehold.co/400x300?text=No+Image"}
              alt={product.model}
              className="w-full max-w-lg object-contain"
            />
            <Link 
              href={`/product/${product.model}/gallery`}
              className="text-center text-blue-600 hover:text-blue-800 font-medium transition-colors mt-6"
            >
              View Gallery
            </Link>
          </div>
          {/* Right: Details */}
          <div className="mt-4 ml-0 sm:ml-8 md:w-1/2">
            <h1 className="text-4xl font-medium mb-2">{product.model}</h1>
            <div className="text-base font-regular text-gray-600 mb-6">{product.description}</div>
            <h4 className="text-2xl font-medium">Product Specifications</h4>
            <div className="bg-gray-50 rounded-lg">
              {specs.map((spec, idx) =>
                spec.value ? (
                  <div
                    key={idx}
                    className="py-3 border-b last:border-b-0 border-gray-200"
                  >
                    <div className="font-semibold text-gray-800">{spec.label}</div>
                    <div className="text-gray-900">{spec.value}</div>
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
            <button className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition-colors mt-2 mb-8">
              Select
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 