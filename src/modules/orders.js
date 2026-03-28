// ===== MODULE: orders.js =====
// Order management using LocalStorage

import { storage } from './storage.js';
import { auth } from './auth.js';

const ORDERS_KEY = 'bb_orders';

const STATUSES = ['Pending', 'Preparing', 'On the way', 'Delivered'];

export const orders = {
  getAll() {
    const all = storage.get(ORDERS_KEY) || [];
    const user = auth.getUser();
    return all.filter(o => o.userId === user?.id);
  },

  place(items, total, address) {
    const user = auth.getUser();
    if (!user) return null;
    const all = storage.get(ORDERS_KEY) || [];
    const order = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      items,
      total,
      address,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      estimatedTime: `${20 + Math.floor(Math.random() * 20)} min`
    };
    all.push(order);
    storage.set(ORDERS_KEY, all);
    return order;
  },

  updateStatus(id, status) {
    const all = storage.get(ORDERS_KEY) || [];
    const idx = all.findIndex(o => o.id === id);
    if (idx !== -1) { all[idx].status = status; storage.set(ORDERS_KEY, all); }
  },

  cancel(id) {
    const all = storage.get(ORDERS_KEY) || [];
    const idx = all.findIndex(o => o.id === id);
    if (idx !== -1) { all[idx].status = 'Cancelled'; storage.set(ORDERS_KEY, all); }
  },

  getAllForAdmin() {
    return storage.get(ORDERS_KEY) || [];
  }
};
