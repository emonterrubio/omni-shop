import React from "react";
import { Cpu, Monitor, Headphones, Package } from "lucide-react";
import { Category } from "../types";

export const categories: Category[] = [
  { id: 1, name: "Laptops", iconName: "Laptop", itemQuantity: 16 },
  { id: 2, name: "Desktops", iconName: "Computer", itemQuantity: 6 },
  { id: 3, name: "Monitors", iconName: "Monitor", itemQuantity: 8 },
  { id: 4, name: "Headphones", iconName: "Headphones", itemQuantity: 4 },
  { id: 5, name: "Mice", iconName: "Mouse", itemQuantity: 5 },
  { id: 6, name: "Keyboards", iconName: "Keyboard", itemQuantity: 3 },
  { id: 7, name: "Webcams", iconName: "Video", itemQuantity: 5 },
  { id: 8, name: "Docking Stations", iconName: "Zap", itemQuantity: 4 },
  { id: 9, name: "Backpacks", iconName: "Backpack", itemQuantity: 7 }
]; 