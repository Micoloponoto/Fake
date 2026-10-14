import type { Product, Category, PaginatedResponse, ProductFilters, CartItem, CheckoutData, Order, NewsletterSubscriber, ApiResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'An error occurred', details: data.details };
    }
    
    return data;
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export const api = {
  products: {
    list: (filters?: ProductFilters) => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => params.append(key, v));
            } else {
              params.set(key, String(value));
            }
          }
        });
      }
      return fetchApi<PaginatedResponse<Product>>(`/products?${params.toString()}`);
    },
    featured: (limit = 8) => fetchApi<Product[]>(`/products/featured?limit=${limit}`),
    newArrivals: (limit = 8) => fetchApi<Product[]>(`/products/new-arrivals?limit=${limit}`),
    onSale: (page = 1, limit = 12) => fetchApi<PaginatedResponse<Product>>(`/products/on-sale?page=${page}&limit=${limit}`),
    categories: () => fetchApi<Category[]>('/products/categories'),
    category: (slug: string) => fetchApi<Category>(`/products/categories/${slug}`),
    detail: (slug: string) => fetchApi<Product>(`/products/${slug}`),
    related: (id: number, limit = 4) => fetchApi<Product[]>(`/products/${id}/related?limit=${limit}`),
  },
  orders: {
    create: (data: CheckoutData, cartItems: CartItem[]) => 
      fetchApi<Order>('/orders/checkout', {
        method: 'POST',
        body: JSON.stringify({ ...data, cartItems }),
      }),
    getByNumber: (orderNumber: string) => fetchApi<Order>(`/orders/${orderNumber}`),
    getByEmail: (email: string) => fetchApi<Order[]>(`/orders/email/${email}`),
  },
  newsletter: {
    subscribe: (email: string, name?: string) => 
      fetchApi<NewsletterSubscriber>('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
      }),
  },
};