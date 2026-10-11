'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Currency, Product, ProductSize, PromoCode, SizeSystem } from '@/types';
import { VALID_PROMO_CODES } from '@/data/products';

interface StoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  appliedPromo: PromoCode | null;
  promoError: string | null;
  addToCart: (product: Product, selectedColor: string, selectedSize: ProductSize, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;

  // Currency & Region
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  sizeSystem: SizeSystem;
  setSizeSystem: (sys: SizeSystem) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  // Quick Add Modal & Search
  isSearchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
  quickAddProduct: Product | null;
  setQuickAddProduct: (product: Product | null) => void;

  // Custom Cursor
  cursorText: string;
  cursorVariant: 'default' | 'text' | 'magnetic' | 'hidden';
  setCursor: (text: string, variant?: 'default' | 'text' | 'magnetic' | 'hidden') => void;
  resetCursor: () => void;

  // Checkout info persistence
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  setCustomerInfo: (info: Partial<StoreState['customerInfo']>) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      appliedPromo: null,
      promoError: null,

      addToCart: (product, selectedColor, selectedSize, quantity = 1) => {
        const cart = get().cart;
        const itemId = `${product.id}-${selectedColor}-${selectedSize}`;
        const existingIndex = cart.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updated = [...cart];
          updated[existingIndex].quantity += quantity;
          set({ cart: updated, isCartOpen: true });
        } else {
          set({
            cart: [
              ...cart,
              {
                id: itemId,
                productId: product.id,
                product,
                selectedColor,
                selectedSize,
                quantity,
              },
            ],
            isCartOpen: true,
          });
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },

      clearCart: () => {
        set({ cart: [], appliedPromo: null });
      },

      setCartOpen: (isCartOpen) => set({ isCartOpen }),

      applyPromo: (code) => {
        const found = VALID_PROMO_CODES.find(
          (p) => p.code.toUpperCase() === code.trim().toUpperCase()
        );
        if (found) {
          set({ appliedPromo: found, promoError: null });
          return true;
        } else {
          set({ promoError: 'INVALID PROMO CODE' });
          return false;
        }
      },

      removePromo: () => set({ appliedPromo: null, promoError: null }),

      currency: 'INR',
      setCurrency: (currency) => set({ currency }),

      sizeSystem: 'IN',
      setSizeSystem: (sizeSystem) => set({ sizeSystem }),

      wishlist: [],
      toggleWishlist: (productId) => {
        const { wishlist } = get();
        if (wishlist.includes(productId)) {
          set({ wishlist: wishlist.filter((id) => id !== productId) });
        } else {
          set({ wishlist: [...wishlist, productId] });
        }
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),

      recentlyViewed: [],
      addRecentlyViewed: (productId) => {
        const current = get().recentlyViewed.filter((id) => id !== productId);
        set({ recentlyViewed: [productId, ...current].slice(0, 8) });
      },

      isSearchOpen: false,
      setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),

      quickAddProduct: null,
      setQuickAddProduct: (quickAddProduct) => set({ quickAddProduct }),

      cursorText: '',
      cursorVariant: 'default',
      setCursor: (cursorText, cursorVariant = 'text') =>
        set({ cursorText, cursorVariant }),
      resetCursor: () => set({ cursorText: '', cursorVariant: 'default' }),

      customerInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'India',
      },
      setCustomerInfo: (info) =>
        set({ customerInfo: { ...get().customerInfo, ...info } }),
    }),
    {
      name: '04-streetwear-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        currency: state.currency,
        sizeSystem: state.sizeSystem,
        customerInfo: state.customerInfo,
      }),
    }
  )
);
