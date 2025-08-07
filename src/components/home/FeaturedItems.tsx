import React from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { HardwareSpec } from "@/data/hardwareData";

interface FeaturedItemsProps {
  displayedProducts: HardwareSpec[];
}

export function FeaturedItems({ displayedProducts }: FeaturedItemsProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-regular text-gray-900">Featured Items</h2>
        <Link
          href="/catalog"
          className="text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedProducts.map((product, idx) => (
          <ProductCard key={`${product.model}-${idx}`} product={{...product, price: product.price}} />
        ))}
      </div>
    </section>
  );
}
