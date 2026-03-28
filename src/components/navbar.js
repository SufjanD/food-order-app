// ===== COMPONENT: navbar.js =====
// Renders the top navigation bar

import { auth } from '../modules/auth.js';
import { cart } from '../modules/cart.js';
import { router } from '../modules/router.js';
import { toast } from '../helpers/helpers.js';

export function renderNavbar() {
  const user = auth.getUser();
  const cartCount = cart.count();
  const isLoggedIn = auth.isLoggedIn();

  const html = `
    <nav class="navbar">
      <a href="#/" class="navbar-brand">🍽 BiteBridge</a>
      <div class="navbar-links">
        ${isLoggedIn ? `
          <a href="#/menu" id="nav-menu">Menu</a>
          <a href="#/orders" id="nav-orders">My Orders</a>
          <a href="#/dashboard" id="nav-dashboard">Dashboard</a>
          <a href="#/cart" class="nav-cart-btn btn">
            🛒 Cart
            ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ''}
          </a>
          <button id="btn-logout">Logout</button>
        ` : `
          <a href="#/menu">Menu</a>
          <a href="#/login">Login</a>
          <a href="#/register" class="btn btn-primary btn-sm">Sign Up</a>
        `}
      </div>
    </nav>
  `;

  let navbar = document.querySelector('.navbar');
  if (!navbar) {
    const div = document.createElement('div');
    div.innerHTML = html;
    navbar = div.firstChild;
    document.getElementById('app').prepend(navbar);
  } else {
    navbar.outerHTML = html;
    navbar = document.querySelector('.navbar');
  }

  // Highlight active link
  const currentHash = window.location.hash.replace('#', '') || '/';
  document.querySelectorAll('.navbar-links a').forEach(a => {
    const href = a.getAttribute('href')?.replace('#', '');
    if (href === currentHash) a.classList.add('active');
  });

  // Logout button
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    auth.logout();
    cart.clear();
    toast('You have been logged out.', 'info');
    router.navigate('/login');
  });
}
