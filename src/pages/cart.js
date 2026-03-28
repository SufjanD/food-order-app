// ===== PAGE: cart.js =====

import { cart } from '../modules/cart.js';
import { orders } from '../modules/orders.js';
import { router } from '../modules/router.js';
import { renderNavbar } from '../components/navbar.js';
import { toast, formatPrice, render } from '../helpers/helpers.js';

export function renderCart() {
  render('#content', `<nav class="navbar"></nav><div class="page" id="cart-page"></div>`);
  renderNavbar();
  renderCartContent();
}

function renderCartContent() {
  const items = cart.getAll();
  const page = document.getElementById('cart-page');

  if (!items.length) {
    page.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Your Cart</h1>
      </div>
      <div class="cart-empty">
        <div class="icon-big">🛒</div>
        <p style="font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">Your cart is empty</p>
        <p class="text-muted">Browse our menu and add something delicious!</p>
        <a href="#/menu" class="btn btn-primary mt-3">Browse Menu</a>
      </div>
    `;
    return;
  }

  const subtotal = cart.total();
  const delivery = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + delivery + tax;

  page.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Your Cart</h1>
      <p class="page-subtitle">${items.length} item${items.length !== 1 ? 's' : ''} in your cart</p>
    </div>

    <div class="cart-wrapper">
      <div>
        <div class="cart-items" id="cart-items">
          ${items.map(item => cartItemHTML(item)).join('')}
        </div>
        <div class="flex gap-2 mt-3">
          <button class="btn btn-ghost btn-sm" id="btn-clear-cart">🗑 Clear Cart</button>
          <a href="#/menu" class="btn btn-ghost btn-sm">← Continue Shopping</a>
        </div>
      </div>

      <div class="cart-summary">
        <h3 class="cart-summary-title">Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Delivery fee</span><span>${formatPrice(delivery)}</span></div>
        <div class="summary-row"><span>Tax (8%)</span><span>${formatPrice(tax)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>

        <hr class="divider" />

        <div class="form-group">
          <label class="form-label">Delivery address</label>
          <input type="text" id="delivery-address" class="form-control" placeholder="123 Main St, City" />
          <div class="form-error hidden" id="err-address"></div>
        </div>

        <button class="btn btn-primary btn-full" id="btn-checkout">
          Place Order — ${formatPrice(total)}
        </button>
      </div>
    </div>
  `;

  bindCartEvents();
}

function cartItemHTML(item) {
  return `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}"
           onerror="this.src='https://via.placeholder.com/72x72/2c2b27/f4a53a?text=Food'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)} each</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn btn-qty-dec" data-id="${item.id}">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn btn-qty-inc" data-id="${item.id}">+</button>
      </div>
      <div style="min-width:72px;text-align:right">
        <div style="font-weight:700">${formatPrice(item.price * item.qty)}</div>
        <button class="btn btn-danger btn-sm mt-1 btn-remove-item" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `;
}

function bindCartEvents() {
  document.querySelectorAll('.btn-qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const items = cart.getAll();
      const item = items.find(i => i.id === btn.dataset.id);
      if (item) { cart.updateQty(item.id, item.qty + 1); renderCartContent(); renderNavbar(); }
    });
  });

  document.querySelectorAll('.btn-qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const items = cart.getAll();
      const item = items.find(i => i.id === btn.dataset.id);
      if (item) { cart.updateQty(item.id, item.qty - 1); renderCartContent(); renderNavbar(); }
    });
  });

  document.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.remove(btn.dataset.id);
      renderCartContent();
      renderNavbar();
      toast('Item removed from cart.', 'info');
    });
  });

  document.getElementById('btn-clear-cart')?.addEventListener('click', () => {
    if (confirm('Clear all items from cart?')) {
      cart.clear();
      renderCartContent();
      renderNavbar();
      toast('Cart cleared.', 'info');
    }
  });

  document.getElementById('btn-checkout')?.addEventListener('click', () => {
    const address = document.getElementById('delivery-address').value.trim();
    const errEl = document.getElementById('err-address');

    if (!address || address.length < 5) {
      errEl.textContent = 'Please enter a valid delivery address.';
      errEl.classList.remove('hidden');
      return;
    }
    errEl.classList.add('hidden');

    const items = cart.getAll();
    const subtotal = cart.total();
    const total = subtotal + 2.99 + subtotal * 0.08;

    const order = orders.place(items, total, address);
    if (order) {
      cart.clear();
      renderNavbar();
      toast(`Order ${order.id} placed successfully! 🎉`, 'success');
      router.navigate('/orders');
    }
  });
}
