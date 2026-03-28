// ===== MODULE: auth.js =====
// Authentication logic using LocalStorage

import { storage } from './storage.js';

const USERS_KEY = 'bb_users';
const SESSION_KEY = 'bb_session';

// Seed a demo user on first load
function seedDemoUser() {
  const users = storage.get(USERS_KEY) || [];
  if (!users.find(u => u.email === 'demo@bitebridge.com')) {
    users.push({
      id: 'demo-001',
      name: 'Demo User',
      email: 'demo@bitebridge.com',
      password: 'demo1234',
      createdAt: new Date().toISOString()
    });
    storage.set(USERS_KEY, users);
  }
}
seedDemoUser();

export const auth = {
  register({ name, email, password }) {
    const users = storage.get(USERS_KEY) || [];
    if (users.find(u => u.email === email)) {
      return { ok: false, error: 'Email already registered.' };
    }
    const user = { id: `u-${Date.now()}`, name, email, password, createdAt: new Date().toISOString() };
    users.push(user);
    storage.set(USERS_KEY, users);
    const { password: _, ...session } = user;
    storage.set(SESSION_KEY, session);
    return { ok: true, user: session };
  },

  login({ email, password }) {
    const users = storage.get(USERS_KEY) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, error: 'Invalid email or password.' };
    const { password: _, ...session } = user;
    storage.set(SESSION_KEY, session);
    return { ok: true, user: session };
  },

  logout() {
    storage.remove(SESSION_KEY);
  },

  getUser() {
    return storage.get(SESSION_KEY);
  },

  isLoggedIn() {
    return !!storage.get(SESSION_KEY);
  }
};
