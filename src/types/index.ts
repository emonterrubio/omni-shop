import { LucideIcon } from "lucide-react";

export interface Category {
  id: number;
  name: string;
  iconName: string;
  itemQuantity: number;
}

export interface RecommendedItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  compatibility: string;
}

export interface RecentOrder {
  id: string;
  item: string;
  status: string;
  date: string;
}

export interface QuickAction {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface EligibilityData {
  department: string;
  role: string;
  location: string;
  refreshCycle: string;
  approvals: string;
} 