// ===== PAGE: login.js =====

import { auth } from '../modules/auth.js';
import { router } from '../modules/router.js';
import { toast, isValidEmail, render } from '../helpers/helpers.js';

export function renderLogin() {
  render('#content', `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-logo">
          <h1>🍽 BiteBridge</h1>
          <p>Order delicious food, delivered fast</p>
        </div>
        <h2 class="auth-title">Welcome back</h2>

        <form id="login-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="login-email">Email address</label>
            <input type="email" id="login-email" class="form-control" placeholder="you@example.com" autocomplete="email" />
            <div class="form-error hidden" id="err-email"></div>
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" autocomplete="current-password" />
            <div class="form-error hidden" id="err-password"></div>
          </div>
          <div class="form-error hidden" id="err-general"></div>
          <button type="submit" class="btn btn-primary btn-full mt-2" id="login-btn">Sign In</button>
        </form>

        <div class="auth-footer">
          Don't have an account? <a href="#/register">Sign up</a>
          <br/><br/>
          <small style="color: var(--text3)">Demo: demo@bitebridge.com / demo1234</small>
        </div>
      </div>
    </div>
  `);

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    let valid = true;

    if (!email || !isValidEmail(email)) {
      showError('err-email', 'Please enter a valid email.');
      valid = false;
    }
    if (!password) {
      showError('err-password', 'Password is required.');
      valid = false;
    }
    if (!valid) return;

    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = 'Signing in…';

    setTimeout(() => {
      const result = auth.login({ email, password });
      if (result.ok) {
        toast(`Welcome back, ${result.user.name}! 🎉`, 'success');
        router.navigate('/menu');
      } else {
        showError('err-general', result.error);
        btn.disabled = false;
        btn.textContent = 'Sign In';
      }
    }, 400);
  });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.remove('hidden'); }
}
function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
    el.classList.add('hidden');
  });
}
