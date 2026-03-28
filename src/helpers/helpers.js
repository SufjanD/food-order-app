// ===== MODULE: helpers.js =====
// Reusable utility / helper functions

// Format price with currency symbol
export function formatPrice(amount) {
  return `$${parseFloat(amount).toFixed(2)}`;
}

// Format date to readable string
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// Truncate text to a max length
export function truncate(text, max = 80) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '…' : text;
}

// Debounce a function (for search input)
export function debounce(fn, delay = 350) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Validate email format
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate password strength
export function isValidPassword(password) {
  return password.length >= 6;
}

// Generate an order ID string
export function genId(prefix = 'ID') {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Get status badge class
export function statusClass(status) {
  const map = {
    'Pending': 'badge-pending',
    'Preparing': 'badge-pending',
    'On the way': 'badge-pending',
    'Delivered': 'badge-delivered',
    'Cancelled': 'badge-cancelled'
  };
  return map[status] || 'badge-pending';
}

// Render HTML into an element (core render helper)
export function render(selector, html) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (el) el.innerHTML = html;
}

// Create DOM element from HTML string
export function createElement(html) {
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild;
}

// Show/hide element
export function show(selector) {
  const el = document.querySelector(selector);
  if (el) el.classList.remove('hidden');
}
export function hide(selector) {
  const el = document.querySelector(selector);
  if (el) el.classList.add('hidden');
}

// Toast notification system
export function toast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: '●' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}
