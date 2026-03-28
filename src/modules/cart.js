// ===== MODULE: cart.js =====
// Cart state management using LocalStorage

import { storage } from './storage.js';

const CART_KEY = 'bb_cart';

export const cart = {
  getAll() {
    return storage.get(CART_KEY) || [];
  },

  add(item) {
    const items = this.getAll();
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...item, qty: 1 });
    }
    storage.set(CART_KEY, items);
  },

  remove(id) {
    const items = this.getAll().filter(i => i.id !== id);
    storage.set(CART_KEY, items);
  },

  updateQty(id, qty) {
    if (qty <= 0) { this.remove(id); return; }
    const items = this.getAll().map(i => i.id === id ? { ...i, qty } : i);
    storage.set(CART_KEY, items);
  },

  clear() {
    storage.remove(CART_KEY);
  },

  count() {
    return this.getAll().reduce((sum, i) => sum + i.qty, 0);
  },

  total() {
    return this.getAll().reduce((sum, i) => sum + i.price * i.qty, 0);
  }
};
