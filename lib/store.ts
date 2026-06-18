"use client";

import { create } from "zustand";
import type { Product } from "./products";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  mrp: number;
  unit: string;
  quantity: number;
  gradientClass: string;
  accentColor: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getMrpTotal: () => number;
  getSavings: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product: Product) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            shortName: product.shortName,
            price: product.price,
            mrp: product.mrp,
            unit: product.unit,
            quantity: 1,
            gradientClass: product.gradientClass,
            accentColor: product.accentColor,
          },
        ],
      };
    });
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id: string, qty: number) => {
    if (qty < 1) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getMrpTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.mrp * item.quantity,
      0
    );
  },

  getSavings: () => {
    return get().getMrpTotal() - get().getTotal();
  },
}));
