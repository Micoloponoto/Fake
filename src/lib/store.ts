import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getItem: (productId: number, size?: string, color?: string) => CartItem | undefined;
}

const getCartKey = (productId: number, size?: string, color?: string) => 
  `${productId}-${size ?? 'default'}-${color ?? 'default'}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, size, color) => {
        const key = getCartKey(product.id, size, color);
        const existingItem = get().items.find(item => 
          getCartKey(item.productId, item.size, item.color) === key
        );
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              getCartKey(item.productId, item.size, item.color) === key
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          }));
        } else {
          set(state => ({
            items: [...state.items, { productId: product.id, quantity, size, color, product }],
          }));
        }
      },
      removeItem: (productId, size, color) => {
        const key = getCartKey(productId, size, color);
        set(state => ({
          items: state.items.filter(item => getCartKey(item.productId, item.size, item.color) !== key),
        }));
      },
      updateQuantity: (productId, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        const key = getCartKey(productId, size, color);
        set(state => ({
          items: state.items.map(item =>
            getCartKey(item.productId, item.size, item.color) === key
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const product = item.product;
          if (!product) return sum;
          const price = product.sale_price ?? product.price;
          return sum + price * item.quantity;
        }, 0);
      },
      getItem: (productId, size, color) => {
        const key = getCartKey(productId, size, color);
        return get().items.find(item => getCartKey(item.productId, item.size, item.color) === key);
      },
    }),
    {
      name: 'tb-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

interface UIState {
  isMobileMenuOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  toggleMobileMenu: () => void;
  toggleCartDrawer: () => void;
  toggleSearch: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  isSearchOpen: false,
  toggleMobileMenu: () => set(state => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleCartDrawer: () => set(state => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
  closeAll: () => set({ isMobileMenuOpen: false, isCartDrawerOpen: false, isSearchOpen: false }),
}));