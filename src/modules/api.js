// ===== MODULE: api.js =====
// Consumes TheMealDB free API (https://www.themealdb.com/api.php)
// Uses axios (npm package) for HTTP requests

import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Price mapping helper (API has no prices, we generate them)
function generatePrice(name) {
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return parseFloat((6.99 + (hash % 20)).toFixed(2));
}

// Map MealDB meal to our food item format
function mapMeal(meal) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory || 'Dish',
    area: meal.strArea || '',
    description: meal.strInstructions
      ? meal.strInstructions.slice(0, 100) + '…'
      : 'A delicious meal made with fresh ingredients.',
    image: meal.strMealThumb,
    price: generatePrice(meal.strMeal),
    tags: meal.strTags ? meal.strTags.split(',').slice(0, 3) : []
  };
}

export const api = {
  // Get all available categories (pork excluded)
  async getCategories() {
    const { data } = await axios.get(`${BASE_URL}/categories.php`);
    return (data.categories || []).filter(c => c.strCategory.toLowerCase() !== 'pork');
  },

  // Get meals by category
  async getMealsByCategory(category = 'Seafood') {
    const { data } = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
    const meals = data.meals || [];
    // Fetch full details for first 12
    const detailed = await Promise.all(
      meals.slice(0, 12).map(m => this.getMealById(m.idMeal))
    );
    return detailed.filter(Boolean);
  },

  // Get full meal details by ID
  async getMealById(id) {
    const { data } = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    const meal = data.meals?.[0];
    return meal ? mapMeal(meal) : null;
  },

  // Search meals by name (pork excluded)
  async searchMeals(query) {
    const { data } = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return (data.meals || [])
      .filter(m => m.strCategory?.toLowerCase() !== 'pork')
      .map(mapMeal);
  },

  // Get a random meal
  async getRandomMeal() {
    const { data } = await axios.get(`${BASE_URL}/random.php`);
    const meal = data.meals?.[0];
    return meal ? mapMeal(meal) : null;
  },

  // Get meals by area/cuisine
  async getMealsByArea(area) {
    const { data } = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
    const meals = data.meals || [];
    const detailed = await Promise.all(
      meals.slice(0, 8).map(m => this.getMealById(m.idMeal))
    );
    return detailed.filter(Boolean);
  }
};
