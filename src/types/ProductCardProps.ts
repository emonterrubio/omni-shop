export interface ProductCardProps {
  brand: string;
  model: string;
  category: string;
  description: string;
  card_description?: string;
  features: string;
  image: string;
  price: number;
  recommended: boolean;
  // Optionally, add any other fields ProductCard may use
  // You can extend this as needed for future categories
} 