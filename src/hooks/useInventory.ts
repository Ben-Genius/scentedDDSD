import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';

interface InventoryState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
}

export const useInventory = create<InventoryState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      
      addProduct: (product) => {
        set((state) => ({ 
            products: [...state.products, product] 
        }));
      },

      updateProduct: (updatedProduct) => {
        set((state) => ({
          products: state.products.map((p) => 
            p.id === updatedProduct.id ? updatedProduct : p
          )
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        }));
      },

      getProduct: (id) => {
        return get().products.find((p) => p.id === id);
      },

      getProductBySlug: (slug) => {
          return get().products.find((p) => p.slug === slug);
      }
    }),
    {
      name: 'scented-inventory',
      storage: createJSONStorage(() => localStorage),
      // Visitors' browsers keep a saved copy of this store. Always take products
      // (and their prices) from src/data/products.ts, so a price change in the code
      // reaches everyone on their next visit. Products added only in the admin
      // page (ids not in the code) are kept.
      merge: (persisted, current) => {
        const saved = (persisted as Partial<InventoryState> | undefined)?.products ?? [];
        const codeIds = new Set(initialProducts.map((p) => p.id));
        const adminOnly = saved.filter((p) => !codeIds.has(p.id));
        return { ...current, products: [...initialProducts, ...adminOnly] };
      },
      // Optional: Logic to merge initial data if we add new default products in code update? 
      // For now, simpler to rely on storage OR initial if empty.
      // But populate logic is implicit in 'products: initialProducts' for first run.
    }
  )
);
