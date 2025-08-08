import React from "react";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import { hardwareData } from "@/data/hardwareData";
import { monitorData } from "@/data/monitorData";
import { headphoneData } from "@/data/headphoneData";
import { mouseData } from "@/data/mouseData";
import { keyboardData } from "@/data/keyboardData";
import { webcamData } from "@/data/webcamData";
import { dockStationData } from "@/data/dockStationData";
import { backpackData } from "@/data/backpackData";

interface CategoryMenuProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export function CategoryMenu({ selectedCategory, onCategorySelect }: CategoryMenuProps) {
  const getCategoryCount = (categoryName: string): number => {
    const name = categoryName.toLowerCase();
    switch (name) {
      case "monitors":
        return monitorData.length;
      case "headphones":
        return headphoneData.length;
      case "mice":
        return mouseData.length;
      case "keyboards":
        return keyboardData.length;
      case "webcams":
        return webcamData.length;
      case "docking stations":
        return dockStationData.length;
      case "backpacks":
        return backpackData.length;
      default:
        return hardwareData.filter(item => 
          item.category.toLowerCase() === name
        ).length;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onCategorySelect("all")}
          className={`w-full flex items-center justify-between px-3 py-2 text-left rounded transition-colors ${
            selectedCategory === "all"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="flex flex-col items-start">
            <span className="leading-tight">All</span>
            <span className="text-xs text-gray-500">
              {hardwareData.length + monitorData.length + headphoneData.length + 
               mouseData.length + keyboardData.length + webcamData.length + 
               dockStationData.length + backpackData.length} items
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>
        
        {categories.map((category) => {
          const count = getCategoryCount(category.name);
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name.toLowerCase())}
              className={`w-full flex items-center justify-between px-3 py-2 text-left rounded transition-colors ${
                selectedCategory === category.name.toLowerCase()
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <div className="flex flex-col items-start">
                <span>{category.name}</span>
                <span className="text-xs text-gray-500">{count} items</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
