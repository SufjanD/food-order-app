// ===== main.js =====
// Entry point — registers routes and starts the router

import { router } from './modules/router.js';
import { renderHome } from './pages/home.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderMenu } from './pages/menu.js';
import { renderCart } from './pages/cart.js';
import { renderOrders } from './pages/orders.js';
import { renderDashboard } from './pages/dashboard.js';

// Inject app shell
document.getElementById('app').innerHTML = `
  <nav class="navbar" style="display:none"></nav>
  <div id="content"></div>
`;

// Register all routes
router.register('/', renderHome);
router.register('/home', renderHome);
router.register('/login', renderLogin);
router.register('/register', renderRegister);
router.register('/menu', renderMenu);
router.register('/cart', renderCart);
router.register('/orders', renderOrders);
router.register('/dashboard', renderDashboard);
router.register('/404', () => {
  document.getElementById('content').innerHTML = `
    <div style="text-align:center;padding:6rem 2rem;color:var(--text2)">
      <div style="font-size:4rem;margin-bottom:1rem">🍽</div>
      <h2 style="font-size:2rem;font-weight:900;margin-bottom:0.5rem;color:var(--text)">Page Not Found</h2>
      <p>This page doesn't exist.</p>
      <a href="#/" class="btn btn-primary mt-3">Go Home</a>
    </div>
  `;
});

// Start router
router.init();
