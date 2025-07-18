import React from "react";
import { categories } from "@/data/categories";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
import { headphoneData } from "@/data/headphoneData";
import { mouseData } from "@/data/mouseData";
import { keyboardData } from "@/data/keyboardData";
import { webcamData } from "@/data/webcamData";
import { dockStationData } from "@/data/dockStationData";
import { backpackData } from "@/data/backpackData";

interface Category {
  name: string;
  iconName: string;
}

function CategoryCard({ category, count }: { category: Category; count: number }) {
  const Icon = (LucideIcons as any)[category.iconName] || LucideIcons.Package;
  return (
    <button
      className="flex items-center bg-white border border-gray-200 rounded-md px-4 py-4 w-full hover:shadow-md transition-all"
      type="button"
    >
      <Icon className="w-6 h-6 text-blue-600 mr-3" />
      <div className="flex flex-col items-start">
        <span className="text-base font-medium text-gray-800">{category.name}</span>
        <span className="text-sm font-regular text-gray-600">{count} items</span>
      </div>
    </button>
  );
}

export function Categories() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories.map((category, idx) => {
          let count;
          if (category.name.toLowerCase() === "monitors") {
            count = monitorData.length;
          } else if (category.name.toLowerCase() === "headphones") {
            count = headphoneData.length;
          } else if (category.name.toLowerCase() === "mice") {
            count = mouseData.length;
          } else if (category.name.toLowerCase() === "keyboards") {
            count = keyboardData.length;
          } else if (category.name.toLowerCase() === "webcams") {
            count = webcamData.length;
          } else if (category.name.toLowerCase() === "docking stations") {
            count = dockStationData.length;
          } else if (category.name.toLowerCase() === "backpacks") {
            count = backpackData.length;
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