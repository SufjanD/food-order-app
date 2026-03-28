// ===== PAGE: register.js =====

import { auth } from '../modules/auth.js';
import { router } from '../modules/router.js';
import { toast, isValidEmail, isValidPassword, render } from '../helpers/helpers.js';

export function renderRegister() {
  render('#content', `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-logo">
          <h1>🍽 BiteBridge</h1>
          <p>Order delicious food, delivered fast</p>
        </div>
        <h2 class="auth-title">Create your account</h2>

        <form id="register-form" novalidate>
          <div class="form-group">
            <label class="form-label">Full name</label>
            <input type="text" id="reg-name" class="form-control" placeholder="John Doe" />
            <div class="form-error hidden" id="err-name"></div>
          </div>
          <div class="form-group">
            <label class="form-label">Email address</label>
            <input type="email" id="reg-email" class="form-control" placeholder="you@example.com" />
            <div class="form-error hidden" id="err-email"></div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="reg-password" class="form-control" placeholder="Min 6 chars" />
              <div class="form-error hidden" id="err-password"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Confirm password</label>
              <input type="password" id="reg-confirm" class="form-control" placeholder="Repeat password" />
              <div class="form-error hidden" id="err-confirm"></div>
            </div>
          </div>
          <div class="form-error hidden" id="err-general"></div>
          <button type="submit" class="btn btn-primary btn-full mt-2" id="reg-btn">Create Account</button>
        </form>

        <div class="auth-footer">
          Already have an account? <a href="#/login">Sign in</a>
        </div>
      </div>
    </div>
  `);

  document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    let valid = true;

    if (!name || name.length < 2) { showError('err-name', 'Name must be at least 2 characters.'); valid = false; }
    if (!isValidEmail(email)) { showError('err-email', 'Please enter a valid email.'); valid = false; }
    if (!isValidPassword(password)) { showError('err-password', 'Password must be at least 6 characters.'); valid = false; }
    if (password !== confirm) { showError('err-confirm', 'Passwords do not match.'); valid = false; }
    if (!valid) return;

    const btn = document.getElementById('reg-btn');
    btn.disabled = true; btn.textContent = 'Creating account…';

    setTimeout(() => {
      const result = auth.register({ name, email, password });
      if (result.ok) {
        toast(`Welcome to BiteBridge, ${result.user.name}! 🎉`, 'success');
        router.navigate('/menu');
      } else {
        showError('err-general', result.error);
        btn.disabled = false; btn.textContent = 'Create Account';
      }
    }, 400);
  });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.remove('hidden'); }
}
function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; el.classList.add('hidden'); });
}
