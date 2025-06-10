import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
// import { headphoneData } from "@/data/headphoneData";
// import { mouseData } from "@/data/mouseData";
// import { keyboardData } from "@/data/keyboardData";
import { ProductCard } from "@/components/ui/ProductCard";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BrandCatalogPage({ params }: { params: { brand: string } }) {
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
  }));

  const allProducts = [
    ...hardwareData,
    ...monitorProducts,
    // ...headphoneData,
    // ...mouseData,
    // ...keyboardData,
  ];

  const brandProducts = allProducts.filter((p) => p.brand === brand);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItems={0} />
      <MainNavigation />
      <main className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-6 mb-16">
        <Link
          href="/catalog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <h2 className="text-2xl font-semibold mb-6">{brand} Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {brandProducts.map((product, idx) => (
            <ProductCard key={`${product.model}-${idx}`} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
} 