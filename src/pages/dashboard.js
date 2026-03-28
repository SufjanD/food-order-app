// ===== PAGE: dashboard.js =====
// Dashboard with order entity management, stats, and filter form

import { orders } from '../modules/orders.js';
import { auth } from '../modules/auth.js';
import { renderNavbar } from '../components/navbar.js';
import { formatPrice, formatDate, statusClass, render, toast } from '../helpers/helpers.js';

export function renderDashboard() {
  render('#content', `<nav class="navbar"></nav><div class="page" id="dashboard-page"></div>`);
  renderNavbar();
  buildDashboard();
}

function buildDashboard() {
  const user = auth.getUser();
  const myOrders = orders.getAll();

  // Stats calculations
  const totalSpent = myOrders.reduce((s, o) => s + (o.total || 0), 0);
  const delivered = myOrders.filter(o => o.status === 'Delivered').length;
  const pending = myOrders.filter(o => ['Pending', 'Preparing', 'On the way'].includes(o.status)).length;
  const cancelled = myOrders.filter(o => o.status === 'Cancelled').length;

  const page = document.getElementById('dashboard-page');
  page.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Welcome back, <strong>${user?.name}</strong> 👋</p>
    </div>

    <!-- STATS CARDS (entity: Order) -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Orders</div>
        <div class="stat-value">${myOrders.length}</div>
        <div class="stat-sub">All time</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Spent</div>
        <div class="stat-value">${formatPrice(totalSpent)}</div>
        <div class="stat-sub">Across all orders</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Delivered</div>
        <div class="stat-value" style="color:var(--success)">${delivered}</div>
        <div class="stat-sub">Successfully received</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending</div>
        <div class="stat-value">${pending}</div>
        <div class="stat-sub">In progress</div>
      </div>
    </div>

    <!-- FILTER FORM (Jobs with forms) -->
    <div class="search-bar mb-3">
      <div class="search-input-wrap">
        <span class="icon">🔍</span>
        <input type="text" class="search-input form-control" id="order-search" placeholder="Search by order ID or address..." />
      </div>
      <select class="filter-select form-control" id="status-filter">
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="On the way">On the way</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button class="btn btn-ghost btn-sm" id="clear-filters">Reset</button>
    </div>

    <!-- ORDERS TABLE -->
    <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:1rem">Order History</h2>
    <div id="orders-table-wrap">
      ${ordersTableHTML(myOrders)}
    </div>
  `;

  bindFilterEvents(myOrders);
}

function ordersTableHTML(data) {
  if (!data.length) {
    return `<div style="text-align:center;padding:3rem;color:var(--text2)">
      <p>No orders found.</p>
      <a href="#/menu" class="btn btn-primary btn-sm mt-2">Order something!</a>
    </div>`;
  }
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Address</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(order => `
            <tr>
              <td><strong>${order.id}</strong></td>
              <td style="color:var(--text2);font-size:0.83rem">${formatDate(order.createdAt)}</td>
              <td>${order.items.reduce((s,i) => s + i.qty, 0)} item(s)</td>
              <td style="color:var(--text2);font-size:0.85rem;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${order.address}</td>
              <td style="color:var(--accent);font-weight:700">${formatPrice(order.total)}</td>
              <td><span class="badge ${statusClass(order.status)}">${order.status}</span></td>
              <td>
                ${order.status === 'Pending' ? `
                  <button class="btn btn-sm btn-ghost btn-mark-delivered" data-id="${order.id}" title="Mark as Delivered">✓ Delivered</button>
                ` : '—'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function bindFilterEvents(allOrders) {
  const searchInput = document.getElementById('order-search');
  const statusSelect = document.getElementById('status-filter');
  const clearBtn = document.getElementById('clear-filters');

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const status = statusSelect.value;
    let filtered = [...allOrders].reverse();
    if (q) filtered = filtered.filter(o => o.id.toLowerCase().includes(q) || o.address.toLowerCase().includes(q));
    if (status) filtered = filtered.filter(o => o.status === status);
    render('#orders-table-wrap', ordersTableHTML(filtered));
    bindTableActions();
  }

  searchInput?.addEventListener('input', applyFilters);
  statusSelect?.addEventListener('change', applyFilters);
  clearBtn?.addEventListener('click', () => {
    searchInput.value = ''; statusSelect.value = '';
    applyFilters();
  });

  bindTableActions();
}

function bindTableActions() {
  document.querySelectorAll('.btn-mark-delivered').forEach(btn => {
    btn.addEventListener('click', () => {
      orders.updateStatus(btn.dataset.id, 'Delivered');
      toast('Order marked as delivered! ✓', 'success');
      buildDashboard();
    });
  });
}
