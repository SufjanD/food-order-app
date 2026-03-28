// ===== PAGE: orders.js =====

import { orders } from '../modules/orders.js';
import { renderNavbar } from '../components/navbar.js';
import { formatPrice, formatDate, statusClass, render } from '../helpers/helpers.js';

export function renderOrders() {
  render('#content', `<nav class="navbar"></nav><div class="page" id="orders-page"></div>`);
  renderNavbar();

  const myOrders = orders.getAll().reverse();
  const page = document.getElementById('orders-page');

  if (!myOrders.length) {
    page.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">My Orders</h1>
      </div>
      <div class="cart-empty">
        <div class="icon-big">📋</div>
        <p style="font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">No orders yet</p>
        <p class="text-muted">Place your first order from our menu!</p>
        <a href="#/menu" class="btn btn-primary mt-3">Browse Menu</a>
      </div>
    `;
    return;
  }

  page.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">My Orders</h1>
      <p class="page-subtitle">${myOrders.length} order${myOrders.length !== 1 ? 's' : ''} placed</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:1.2rem">
      ${myOrders.map(order => orderCardHTML(order)).join('')}
    </div>
  `;

  document.querySelectorAll('.btn-cancel-order').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Cancel this order?')) {
        orders.cancel(btn.dataset.id);
        renderOrders();
      }
    });
  });
}

function orderCardHTML(order) {
  const canCancel = order.status === 'Pending';
  return `
    <div class="card" style="padding:1.5rem">
      <div class="flex justify-between items-center mb-2" style="flex-wrap:wrap;gap:0.5rem">
        <div>
          <strong style="font-size:1rem">${order.id}</strong>
          <span class="text-muted" style="font-size:0.82rem;margin-left:0.7rem">${formatDate(order.createdAt)}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge ${statusClass(order.status)}">${order.status}</span>
          ${canCancel ? `<button class="btn btn-danger btn-sm btn-cancel-order" data-id="${order.id}">Cancel</button>` : ''}
        </div>
      </div>
      <p class="text-muted" style="font-size:0.85rem;margin-bottom:0.8rem">📍 ${order.address}</p>
      <div style="border-top:1px solid var(--border);padding-top:0.8rem">
        ${order.items.map(item => `
          <div class="flex justify-between" style="font-size:0.88rem;margin-bottom:0.4rem;color:var(--text2)">
            <span>${item.name} × ${item.qty}</span>
            <span>${formatPrice(item.price * item.qty)}</span>
          </div>
        `).join('')}
      </div>
      <div class="flex justify-between items-center mt-2" style="border-top:1px solid var(--border);padding-top:0.8rem">
        <span class="text-muted" style="font-size:0.85rem">Est. time: ${order.estimatedTime}</span>
        <strong style="color:var(--accent)">${formatPrice(order.total)}</strong>
      </div>
    </div>
  `;
}
