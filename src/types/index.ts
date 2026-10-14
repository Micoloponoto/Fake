export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  sale_price: number | null;
  category_id: number;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  new_arrival: boolean;
  on_sale: boolean;
  stock_quantity: number;
  sku: string | null;
  created_at: string;
  updated_at: string;
  category_name?: string;
  category_slug?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  onSale?: boolean;
  newArrival?: boolean;
  featured?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'name_asc' | 'name_desc';
  page?: number;
  limit?: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
  product?: Product;
}

export interface CheckoutData {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country?: string;
  notes?: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  status: string;
  payment_method: string | null;
  payment_status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  size: string | null;
  color: string | null;
  product_name?: string;
  product_slug?: string;
  product_images?: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  name: string | null;
  subscribed_at: string;
  confirmed: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, string[]>;
}