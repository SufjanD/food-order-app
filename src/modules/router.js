// ===== MODULE: router.js =====
// Simple hash-based SPA router

import { auth } from './auth.js';

const routes = {};
let currentRoute = null;

export const router = {
  register(path, handler) {
    routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = path;
  },

  init() {
    window.addEventListener('hashchange', () => this._resolve());
    this._resolve();
  },

  _resolve() {
    const hash = window.location.hash.replace('#', '') || '/';
    const protectedRoutes = ['/dashboard', '/cart', '/orders'];
    const guestRoutes = ['/login', '/register'];

    if (protectedRoutes.includes(hash) && !auth.isLoggedIn()) {
      this.navigate('/login');
      return;
    }
    if (guestRoutes.includes(hash) && auth.isLoggedIn()) {
      this.navigate('/menu');
      return;
    }

    currentRoute = hash;
    const handler = routes[hash] || routes['/404'];
    if (handler) handler();
    else if (routes['/']) routes['/']();

    // Scroll to top on navigation
    window.scrollTo(0, 0);
  },

  getCurrentRoute() {
    return currentRoute;
  }
};
