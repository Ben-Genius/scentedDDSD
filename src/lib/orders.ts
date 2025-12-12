import { Order } from '../types';

export const saveOrder = async (order: Order): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Save to localStorage to persist across reloads
      const existing = localStorage.getItem('scented_orders');
      const orders: Order[] = existing ? JSON.parse(existing) : [];
      orders.push(order);
      localStorage.setItem('scented_orders', JSON.stringify(orders));
      
      // 2. Log to console to simulate server write
      console.log('Order saved to DB:', order);
      
      resolve();
    }, 800);
  });
};
