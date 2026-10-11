export type ProductCategory = 
  | 'Hoodies' 
  | 'Tees' 
  | 'Pants' 
  | 'Outerwear' 
  | 'Accessories';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Currency = 'INR';

export type SizeSystem = 'IN' | 'US' | 'EU';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  priceINR: number;
  priceUSD: number;
  compareAtPriceINR?: number;
  compareAtPriceUSD?: number;
  description: string;
  details: string[];
  fabricSpecs: {
    material: string;
    weight: string; // e.g. "450 GSM Heavyweight Terry"
    fit: string;    // e.g. "Oversized Boxy Silhouette"
    origin: string; // e.g. "Crafted in Tokyo & Mumbai"
  };
  colors: ProductColor[];
  sizes: ProductSize[];
  stockCount: number; // e.g. 3 -> "Only 3 left"
  isNewDrop?: boolean;
  isLimitedDrop?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  turntableImages: string[]; // 360 turntable frames
  dropDate?: string;
  tags: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique item key: `${productId}-${selectedColor}-${selectedSize}`
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: ProductSize;
  quantity: number;
}

export interface FilterState {
  category: ProductCategory | 'All';
  sizes: ProductSize[];
  colors: string[];
  priceRange: [number, number]; // in USD
  onlyNew: boolean;
  onlySale: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
}
