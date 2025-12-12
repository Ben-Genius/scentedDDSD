import { products } from '../data/products';
import ordersData from '../data/orders.json';
import { Product, Order } from '../types';

// Simulate async API calls
const DELAY = 500;

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), DELAY);
  });
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((p) => p.slug === slug));
    }, DELAY);
  });
};

export const getOrders = async (): Promise<Order[]> => {
    return new Promise((resolve) => {
        // In a real app, this would fetch from a backend. 
        // For local simulation, we try to read from localStorage if possible to show "real" data changes
        // But since we can't easily read JSON files after build on client side for updates WITHOUT a server,
        // we will primarily rely on localStorage for the active session and Admin view.
        
        const stored = localStorage.getItem('scented_orders');
        if (stored) {
            resolve(JSON.parse(stored));
        } else {
            resolve(ordersData as Order[]);
        }
    });
}
