import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '../types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, variant: ProductVariant, colorId?: string, scent?: string, colorLabel?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void; // Using a unique key for items
  updateItemQuantity: (itemId: string, quantity: number) => void;
  updateItemConfig: (itemId: string, updates: Partial<CartItem>) => void; // Inline editing
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

// Helper to generate unique ID for cart line item
const generateCartId = (productId: string, variantId: string, colorId?: string, scent?: string) => {
  return `${productId}-${variantId}-${colorId || 'nc'}-${scent || 'ns'}`;
};

export const useLocalCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      
      addItem: (product, variant, colorId, scent, colorLabel, quantity = 1) => {
        const cartId = generateCartId(product.id, variant.id, colorId, scent);
        const state = get();
        const existingItem = state.items.find(i => generateCartId(i.productId, i.variantId, i.colorId, i.scent) === cartId);

        // Determine price
        // Logic: Variant priceGHS is the main source.
        // Color delta? Product model says colorVariants have priceDelta.
        let finalPrice = variant.priceGHS;
        if (colorId) {
            const colorVar = product.images.colorVariants.find(c => c.colorId === colorId);
            if (colorVar && colorVar.priceDelta) {
                finalPrice += colorVar.priceDelta;
            }
        }

        const image = colorId 
          ? product.images.colorVariants.find(c => c.colorId === colorId)?.image || product.images.default 
          : product.images.default;

        if (existingItem) {
          set({
            items: state.items.map(item => 
              generateCartId(item.productId, item.variantId, item.colorId, item.scent) === cartId 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            isDrawerOpen: true
          });
        } else {
          const newItem: CartItem = {
            productId: product.id,
            variantId: variant.id,
            colorId,
            scent,
            quantity,
            price: finalPrice,
            productTitle: product.title,
            variantLabel: variant.label,
            colorLabel: colorLabel,
            image,
          };
          set({ items: [...state.items, newItem], isDrawerOpen: true });
        }
      },

      removeItem: (cartId) => {
        // Here cartId corresponds to the generated ID logic, but we might need to store ID on the item itself for simpler delete.
        // Let's assume we can reconstruct or simple find.
        // Better to add `id` to CartItem.
        // For now, we will filter by matching props as we don't strictly store a 'cartId' property in CartItem, 
        // but let's assume the UI passes the reconstructable key or we update CartItem interface to have an internal ID.
        // Update: CartItem interface didn't have ID. I'll add one internally or filter.
        // Let's assume the passed 'itemId' IS the generated string from the UI.
        
        set((state) => ({
           items: state.items.filter(i => generateCartId(i.productId, i.variantId, i.colorId, i.scent) !== cartId)
        }));
      },

      updateItemQuantity: (cartId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map(i => generateCartId(i.productId, i.variantId, i.colorId, i.scent) === cartId ? { ...i, quantity } : i)
        }));
      },
      
      updateItemConfig: (cartId, updates) => {
         // This is tricky because changing config changes the ID.
         // We remove old, add new.
         // Simplified: just update props if ID doesn't collision, else merge.
         // Requirement: "editable inline... see price update".
         
         // For complexity, let's assume we update the specific item in place, 
         // BUT this might create duplicates if we change it to match another existing item.
         // We will handle that.
         
         set((state) => {
             const index = state.items.findIndex(i => generateCartId(i.productId, i.variantId, i.colorId, i.scent) === cartId);
             if (index === -1) return state;
             
             const oldItem = state.items[index];
             const newItem = { ...oldItem, ...updates };

             // Recalculate price if variant/color changed - simpler to just trust the caller passes new price?
             // Or we need access to product data here. 
             // Ideally the component calculates the new price and passes it in 'updates'.
             
             // Check for merge
             const newId = generateCartId(newItem.productId, newItem.variantId, newItem.colorId, newItem.scent);
             const duplicateIndex = state.items.findIndex((i, idx) => idx !== index && generateCartId(i.productId, i.variantId, i.colorId, i.scent) === newId);
             
             if (duplicateIndex > -1) {
                 // Merge
                 const otherItem = state.items[duplicateIndex];
                 const mergedItem = { ...otherItem, quantity: otherItem.quantity + newItem.quantity };
                 const newItems = [...state.items];
                 newItems.splice(duplicateIndex, 1, mergedItem); // replace duplicate with merged
                 newItems.splice(index, 1); // remove original
                 return { items: newItems };
             } else {
                 const newItems = [...state.items];
                 newItems[index] = newItem;
                 return { items: newItems };
             }
         })
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemCount: () => {
          const state = get();
          return state.items.reduce((c, i) => c + i.quantity, 0);
      }
    }),
    {
      name: 'scented-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
