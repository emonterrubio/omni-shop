export interface ProductCardProps {
  brand: string;
  model: string;
  category: string;
  description: string;
  features: string;
  image: string;
  price: string;
  recommended: boolean;
  // Optionally, add any other fields ProductCard may use
  // You can extend this as needed for future categories
} 