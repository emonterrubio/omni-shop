import React from "react";
import Link from "next/link";
import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
// import { headphoneData } from "@/data/headphoneData";
// import { mouseData } from "@/data/mouseData";
// import { keyboardData } from "@/data/keyboardData";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardProps } from "@/types/ProductCardProps";
import { Header } from "@/components/layout/Header";
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
          price: item.price,
        }));
    case "monitors":
      return monitorData.map(item => ({
        brand: item.brand,
        model: item.model,
        category: "Monitors",
        description: item.description || `${item.refresh_rate} ${item.display_resolution} Monitor`,
        features: `${item.display_resolution}, ${item.aspect_ratio}, ${item.display_type}`,
        image: item.image,
        price: item.price,
      }));
    // case "headphones":
    //   return headphoneData.map(item => ({
    //     brand: item.brand,
    //     model: item.model,
    //     category: "Headphones",
    //     description: item.description,
    //     features: item.features,
    //     image: item.image,
    //     price: item.price,
    //   }));
    // case "mice":
    //   return mouseData.map(item => ({ ... }));
    // case "keyboards":
    //   return keyboardData.map(item => ({ ... }));
    default:
      return [];
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = typeof params.category === "string" ? params.category : Array.isArray(params.category) ? params.category[0] : "";
  const products: ProductCardProps[] = getProductsForCategory(category);

  return (
    <div className="flex flex-col h-screen bg-gray-50 mb-12">
      <Header cartItems={0} />
      <main className="flex-1 overflow-y-auto px-3 sm:px-10 md:px-16 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <h2 className="font-medium text-4xl text-center text-gray-900 mt-6 mb-4 capitalize">{category} <span className="normal-case">available</span></h2>
        <h4 className="max-w-2xl mx-auto font-base text-center text-gray-600 mb-8">Boost productivity with a high-performance laptop featuring fast processors, responsive keyboard, and all-day battery life. Its sleek, reliable design keeps you focused on work—so you can be smarter, faster, and more efficient.</h4>
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