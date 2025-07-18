import React, { use } from "react";
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
          features: item.features,
          image: item.image,
          price: String(item.price),
          recommended: item.recommended,
        }));
    case "monitors":
      return monitorData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Monitors",
        description: item.description || `${item.refresh_rate} ${item.display_resolution} Monitor`,
        features: `${item.display_resolution}, ${item.aspect_ratio}, ${item.display_type}`,
        image: item.image,
        price: String(item.price),
        recommended: item.recommended,
      }));
    case "headphones":
      return headphoneData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Headphones",
        description: item.features,
        features: item.features,
        image: item.image,
        price: String(item.price),
        recommended: item.recommended,
      }));
    case "mice":
      return mouseData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Mice",
        description: item.description,
        features: item.description,
        image: item.image,
        price: String(item.price),
        recommended: item.recommended,
      }));
    case "keyboards":
      return keyboardData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Keyboards",
        description: item.description,
        features: `${item.connectivity}, ${item.compatibility}, ${item.number_keys} keys`,
        image: item.image,
        price: String(item.price),
        recommended: item.recommended,
      }));
    case "webcams":
      return webcamData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Webcams",
        description: item.description,
        features: `${item.video_resolution}, ${item.display_resolution}, ${item.image_capture_rate}`,
        image: item.image,
        price: String(item.price),
        recommended: item.recommended,
      }));
    case "docking stations":
      return dockStationData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Docking Stations",
        description: item.description,
        features: `${item.ports}, ${item.power}`,
        image: item.image,
        price: String(item.price),
        recommended: item.recommended,
      }));
    case "backpacks":
      return backpackData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Backpacks",
        description: item.description,
        features: `${item.size}, ${item.capacity}`,
        image: item.image,
        price: String(item.price),
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <MainNavigation />
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <h2 className="font-medium text-5xl text-center text-gray-900 mt-6 mb-4 capitalize">{category} <span className="normal-case">available</span></h2>
        <h4 className="max-w-2xl mx-auto font-base text-center text-gray-600 mb-8">Boost your productivity with high-performance equipment. Request hardware that keeps you focused on work—so you can be smarter, faster, and more efficient.</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full font-medium text-lg text-center text-gray-500 mt-12">No products found in this category.</div>
          ) : (
            products.map((product, idx) => (
              <ProductCard key={`${product.model}-${idx}`} product={product} />
            ))
          )}
        </div>
      </main>
    </div>
  );
} 