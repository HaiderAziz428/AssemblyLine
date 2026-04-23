export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  sale_price?: number;
  stock: number;
  category_id?: string;
  brand_id?: string;
  is_featured: boolean;
  is_active: boolean;
  images: string[];
  video_url?: string;
  created_at: string;
  category?: Category;
  brand?: Brand;
  reviews?: Review[];
  avg_rating?: number;
  review_count?: number;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  user?: { full_name: string; avatar_url?: string };
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  link?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  city?: string;
  is_admin: boolean;
}
