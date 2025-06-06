import React from "react";
import { Home, Truck, Library, HelpCircle } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        <button
          className={`flex flex-col items-center py-2 px-4 ${
            activeTab === "home" ? "text-blue-600" : "text-gray-600"
          }`}
          onClick={() => onTabChange("home")}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          className={`flex flex-col items-center py-2 px-4 ${
            activeTab === "orders" ? "text-blue-600" : "text-gray-600"
          }`}
          onClick={() => onTabChange("catalog")}
        >
          <Library className="w-6 h-6" />
          <span className="text-xs mt-1">Browse</span>
        </button>
        <button
          className={`flex flex-col items-center py-2 px-4 ${
            activeTab === "orders" ? "text-blue-600" : "text-gray-600"
          }`}
          onClick={() => onTabChange("orders")}
        >
          <Truck className="w-6 h-6" />
          <span className="text-xs mt-1">Orders</span>
        </button>
        <button
          className={`flex flex-col items-center py-2 px-4 ${
            activeTab === "orders" ? "text-blue-600" : "text-gray-600"
          }`}
          onClick={() => onTabChange("account")}
        >
          <HelpCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Support</span>
        </button>
      </div>
    </nav>
  );
} 