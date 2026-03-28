// ===== PAGE: home.js =====

import { auth } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { cart } from '../modules/cart.js';
import { renderNavbar } from '../components/navbar.js';
import { toast, formatPrice, render } from '../helpers/helpers.js';

export async function renderHome() {
  render('#content', `
    <nav class="navbar"></nav>
    <div class="hero">
      <div class="hero-tag">🔥 Fresh & Fast Delivery</div>
      <h1 class="hero-title">Food you love,<br/><em>delivered</em> fast</h1>
      <p class="hero-sub">Explore hundreds of dishes from world cuisines. Order in seconds, delivered in minutes.</p>
      <div class="hero-btns">
        <a href="#/menu" class="btn btn-primary">Browse Menu 🍽</a>
        ${!auth.isLoggedIn() ? `<a href="#/register" class="btn btn-ghost">Sign Up Free</a>` : ''}
      </div>
    </div>

    <div class="page" style="padding-top:1rem">
      <div class="page-header">
        <h2 class="page-title" style="font-size:1.8rem">Featured Dishes</h2>
        <p class="page-subtitle">Handpicked meals from our menu — straight from the API</p>
      </div>
      <div id="featured-grid">
        <div class="spinner-wrap"><div class="spinner"></div></div>
      </div>

      <div style="text-align:center;margin-top:2.5rem">
        <a href="#/menu" class="btn btn-secondary">View Full Menu →</a>
      </div>

      <!-- WHY US SECTION -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem;margin-top:4rem;margin-bottom:2rem">
        ${[
          { icon: '⚡', title: 'Fast Delivery', desc: 'Get your food in 20–40 minutes guaranteed' },
          { icon: '🌍', title: 'World Cuisines', desc: 'Over 300 dishes from 20+ countries' },
          { icon: '🔒', title: 'Secure Orders', desc: 'Your data is safe and your orders tracked' },
          { icon: '⭐', title: 'Top Quality', desc: 'Freshly made meals with premium ingredients' },
        ].map(f => `
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center">
            <div style="font-size:2rem;margin-bottom:0.7rem">${f.icon}</div>
            <div style="font-weight:700;margin-bottom:0.3rem">${f.title}</div>
            <div style="color:var(--text2);font-size:0.85rem">${f.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `);

  renderNavbar();

  try {
    const meals = await api.getMealsByCategory('Chicken');
    const featured = meals.slice(0, 4);
    const html = `<div class="food-grid">${featured.map(meal => `
      <div class="card food-card">
        <div class="food-card-img">
          <img src="${meal.image}" alt="${meal.name}" loading="lazy"
               onerror="this.src='https://via.placeholder.com/300x180/2c2b27/f4a53a?text=Food'" />
          <span class="food-card-tag">${meal.area || meal.category}</span>
        </div>
        <div class="food-card-body">
          <div class="food-card-name">${meal.name}</div>
          <div class="food-card-desc">${meal.description}</div>
          <div class="food-card-footer">
            <div class="food-price">${formatPrice(meal.price)} <span>/ serving</span></div>
            <button class="btn btn-primary btn-sm btn-add-featured" data-id="${meal.id}"
                    data-name="${meal.name}" data-price="${meal.price}" data-image="${meal.image}">
              + Add
            </button>
          </div>
        </div>
      </div>
    `).join('')}</div>`;
    render('#featured-grid', html);

    document.querySelectorAll('.btn-add-featured').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!auth.isLoggedIn()) {
          toast('Please log in to add items to cart.', 'info');
          return;
        }
        cart.add({
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          image: btn.dataset.image
        });
        renderNavbar();
        toast(`${btn.dataset.name} added to cart! 🛒`, 'success');
      });
    });
  } catch {
    render('#featured-grid', '<p class="text-muted" style="padding:1rem">Could not load featured dishes.</p>');
  }
}
