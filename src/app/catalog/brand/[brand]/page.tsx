import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
import { headphoneData } from "@/data/headphoneData";
import { keyboardData } from "@/data/keyboardData";
import { mouseData } from "@/data/mouseData";
import { ProductCard } from "@/components/ui/ProductCard";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BrandCatalogPage({ params }: any) {
  const brand = decodeURIComponent(params.brand);

  // Map monitorData to ProductCardProps
  const monitorProducts = monitorData.map((item) => ({
    brand: item.brand,
    model: item.model,
    category: "Monitors",
    description: item.description,
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
    description: item.features, // or item.description if available
    features: item.features,
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
    features: `${item.connectivity}, ${item.compatibility}, ${item.number_keys} keys`,
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
    features: item.description,
    image: item.image,
    price: item.price,
    recommended: item.recommended,
  }));

  const allProducts = [
    ...hardwareData,
    ...monitorProducts,
    ...headphoneProducts,
    ...mouseProducts,
    ...keyboardProducts
  ];

  const brandProducts = allProducts.filter((p) => p.brand === brand);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItems={0} />
      <MainNavigation />
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 mb-16">
        <Link
          href="/catalog"
          className="inline-flex items-center text-heritageBlue hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <h2 className="font-medium text-5xl text-center text-gray-900 mt-6 mb-4">{brand} Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {brandProducts.map((product, idx) => (
            <ProductCard key={`${product.model}-${idx}`} product={{...product, price: String(product.price)}} />
          ))}
        </div>
      </main>
    </div>
  );
} 