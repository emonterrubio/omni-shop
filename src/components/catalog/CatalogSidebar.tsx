import React from "react";
import { CategoryMenu } from "./CategoryMenu";
import { BrandMenu } from "./BrandMenu";

interface CatalogSidebarProps {
  selectedCategory: string;
  selectedBrand: string;
  onCategorySelect: (category: string) => void;
  onBrandSelect: (brand: string) => void;
  productsByBrand: { [brand: string]: any[] };
}

export function CatalogSidebar({
  selectedCategory,
  selectedBrand,
  onCategorySelect,
  onBrandSelect,
  productsByBrand,
}: CatalogSidebarProps) {
  return (
    <div className="w-1/5 h-full flex-shrink-0 bg-white border-gray-200 rounded p-4">
      <CategoryMenu
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />
    </div>
  );
}
