import React from "react";
import { categories } from "@/data/categories";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";

interface Category {
  name: string;
  iconName: string;
}

function CategoryCard({ category, count }: { category: Category; count: number }) {
  const Icon = (LucideIcons as any)[category.iconName] || LucideIcons.Package;
  return (
    <button
      className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-md px-4 py-4 w-full hover:shadow-md transition-all"
      type="button"
    >
      <Icon className="w-6 h-6 text-blue-600 mb-1" />
      <span className="text-base font-semibold text-gray-800">{category.name}</span>
      <span className="text-sm font-regular text-gray-600">{count} items</span>
    </button>
  );
}

export function Categories() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {categories.map((category, idx) => {
          let count;
          if (category.name.toLowerCase() === "monitors") {
            count = monitorData.length;
          } else {
            count = hardwareData.filter(item => 
              item.category.toLowerCase() === category.name.toLowerCase()
            ).length;
          }
          return (
            <Link
              key={category.name + idx}
              href={`/category/${category.name.toLowerCase()}`}
              className="block"
            >
              <CategoryCard category={category} count={count} />
            </Link>
          );
        })}
      </div>
    </section>
  );
} 