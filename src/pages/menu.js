// ===== PAGE: menu.js =====
// Consumes TheMealDB API, implements search/filter, renders food cards

import { api } from '../modules/api.js';
import { cart } from '../modules/cart.js';
import { renderNavbar } from '../components/navbar.js';
import { toast, formatPrice, debounce, render } from '../helpers/helpers.js';

let allMeals = [];
let categories = [];
let activeCategory = 'Seafood';
let searchQuery = '';
let sortBy = 'name';

export async function renderMenu() {
  render('#content', `
    <nav class="navbar"></nav>
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">Explore Our <em style="font-style:italic;color:var(--accent)">Menu</em></h1>
        <p class="page-subtitle">Fresh meals from around the world, delivered to your door</p>
      </div>

      <!-- SEARCH & FILTER FORM -->
      <div class="search-bar">
        <div class="search-input-wrap">
          <span class="icon">🔍</span>
          <input type="text" class="search-input form-control" id="search-input" placeholder="Search dishes..." />
        </div>
        <select class="filter-select form-control" id="sort-select">
          <option value="name">Sort: A–Z</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <button class="btn btn-ghost btn-sm" id="clear-search">Clear</button>
      </div>

      <!-- CATEGORY PILLS -->
      <div class="category-pills" id="category-pills">
        <span class="spinner" style="width:20px;height:20px;border-width:2px"></span>
      </div>

      <!-- FOOD GRID -->
      <div id="food-grid">
        <div class="spinner-wrap"><div class="spinner"></div></div>
      </div>
    </div>
  `);

  renderNavbar();
  await loadCategories();
  await loadMeals(activeCategory);
  bindEvents();
}

async function loadCategories() {
  try {
    categories = (await api.getCategories()).filter(c => c.strCategory.toLowerCase() !== 'pork');
    const pills = categories.slice(0, 10).map(c => `
      <button class="pill ${c.strCategory === activeCategory ? 'active' : ''}" 
              data-cat="${c.strCategory}">${c.strCategory}</button>
    `).join('');
    render('#category-pills', pills);

    document.querySelectorAll('.pill[data-cat]').forEach(pill => {
      pill.addEventListener('click', async () => {
        activeCategory = pill.dataset.cat;
        searchQuery = '';
        document.getElementById('search-input').value = '';
        document.querySelectorAll('.pill[data-cat]').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        await loadMeals(activeCategory);
      });
    });
  } catch {
    render('#category-pills', '<p class="text-muted">Could not load categories.</p>');
  }
}

async function loadMeals(category) {
  render('#food-grid', '<div class="spinner-wrap"><div class="spinner"></div></div>');
  try {
    allMeals = await api.getMealsByCategory(category);
    renderMeals();
  } catch {
    render('#food-grid', '<p class="text-muted" style="padding:2rem">Failed to load meals. Please check your connection.</p>');
  }
}

function renderMeals() {
  let meals = [...allMeals];

  // Filter by search query
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    meals = meals.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.area.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sortBy === 'name') meals.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === 'price-asc') meals.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') meals.sort((a, b) => b.price - a.price);

  if (!meals.length) {
    render('#food-grid', `
      <div style="text-align:center;padding:4rem 2rem;color:var(--text2)">
        <div style="font-size:3rem;margin-bottom:1rem">🍽</div>
        <p>No dishes found for "<strong>${searchQuery}</strong>"</p>
        <button class="btn btn-ghost btn-sm mt-2" id="reset-search">Clear search</button>
      </div>
    `);
    document.getElementById('reset-search')?.addEventListener('click', () => {
      searchQuery = '';
      document.getElementById('search-input').value = '';
      renderMeals();
    });
    return;
  }

  // Generate HTML via JS (Render module concept)
  const html = `<div class="food-grid">${meals.map(meal => foodCardHTML(meal)).join('')}</div>`;
  render('#food-grid', html);

  // Bind add-to-cart buttons
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const meal = allMeals.find(m => m.id === id);
      if (meal) {
        cart.add(meal);
        renderNavbar();
        toast(`${meal.name} added to cart! 🛒`, 'success');
      }
    });
  });
}

// HTML generation function (Render concept)
function foodCardHTML(meal) {
  return `
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
          <button class="btn btn-primary btn-sm btn-add-cart" data-id="${meal.id}">
            + Add
          </button>
        </div>
      </div>
    </div>
  `;
}

function bindEvents() {
  // Search input (debounced)
  const searchInput = document.getElementById('search-input');
  const debouncedSearch = debounce((val) => {
    searchQuery = val;
    renderMeals();
  }, 350);

  searchInput?.addEventListener('input', (e) => debouncedSearch(e.target.value.trim()));

  // Sort select
  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderMeals();
  });

  // Clear button
  document.getElementById('clear-search')?.addEventListener('click', () => {
    searchQuery = '';
    sortBy = 'name';
    document.getElementById('search-input').value = '';
    document.getElementById('sort-select').value = 'name';
    renderMeals();
  });
}
