/* ═════════════════════════════════════════════
   STYLE HUB — JavaScript
   - Hamburger / mobile menu toggle
   - Search clear button
   - Horizontal scroll rows
   - Bottom nav active state
   - Wishlist toggle
   - Scroll-in animations (IntersectionObserver)
   - Camera button ripple / visual search mock
═════════════════════════════════════════════ */

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initHamburger();
  initSearch();
  initWishlist();
  initBottomNav();
  initScrollAnimations();
  initProductCardClicks();
});

/* ════════════════════════════════════════════
   SPLASH SCREEN — Cinematic
════════════════════════════════════════════ */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  document.body.classList.add('no-scroll');
  initSplashParticles();

  setTimeout(() => {
    document.querySelectorAll('.bubble-letter').forEach(el => {
      el.classList.add('popped');
    });
  }, 2100);

  // 5 seconds then go to auth or homepage
  setTimeout(() => {
    splash.remove();
    document.body.classList.remove('no-scroll');
    if (!localStorage.getItem('sh_user')) {
      showAuthScreen();
    }
  }, 5000);
}

function initSplashParticles() {
  const canvas = document.getElementById('splash-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create floating dust particles
  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.3,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -(Math.random() * 0.5 + 0.15),
    alpha: Math.random() * 0.5 + 0.1,
    hue: Math.random() > 0.5 ? 52 : 45   // yellow / golden
  }));

  let running = true;
  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.0008;
      // Reset when faded or off-screen
      if (p.alpha <= 0 || p.y < -10) {
        p.x = Math.random() * canvas.width;
        p.y = canvas.height + 5;
        p.alpha = Math.random() * 0.5 + 0.1;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();

  // Stop canvas when splash is gone
  setTimeout(() => { running = false; }, 5100);
}


/* ══════════════════════════════════════════
   HAMBURGER / MOBILE MENU
══════════════════════════════════════════ */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));

    // Inject mobile search bar into menu once
    if (isOpen && !menu.querySelector('.search-bar')) {
      const mSearchWrap = document.createElement('div');
      mSearchWrap.style.cssText = 'padding:0 0 8px;display:flex;gap:8px;align-items:center;';
      mSearchWrap.innerHTML = `
        <div class="search-bar" style="flex:1;display:flex;align-items:center;gap:10px;background:#f4f2ff;border:1.5px solid #ddd6ff;border-radius:999px;padding:0 16px;height:44px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search fashion…" style="flex:1;border:none;background:transparent;font-size:.875rem;outline:none;font-family:inherit;color:#111118;" />
        </div>`;
      menu.insertBefore(mSearchWrap, menu.firstChild);
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
    }
  });
}

/* ══════════════════════════════════════════
   SEARCH BAR
══════════════════════════════════════════ */
function initSearch() {
  const input = document.getElementById('search-input');
  const clear = document.getElementById('search-clear');
  if (!input || !clear) return;

  input.addEventListener('input', () => {
    clear.classList.toggle('visible', input.value.length > 0);
  });

  clear.addEventListener('click', () => {
    input.value = '';
    clear.classList.remove('visible');
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      showToast(`🔍 Searching for "${input.value.trim()}"…`);
    }
  });
}

/* ══════════════════════════════════════════
   SCROLL ROWS (horizontal)
══════════════════════════════════════════ */
function scrollRow(scrollId, direction) {
  const el = document.getElementById(scrollId);
  if (!el) return;
  el.scrollBy({ left: direction * 340, behavior: 'smooth' });
}

/* ══════════════════════════════════════════
   WISHLIST TOGGLE
══════════════════════════════════════════ */
function initWishlist() {
  document.querySelectorAll('.prod-wish').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const active = btn.classList.toggle('active');
      btn.textContent = active ? '♥' : '♡';
      btn.style.color  = active ? '#EF4444' : '';
      showToast(active ? '♥ Added to Wishlist' : '♡ Removed from Wishlist');
    });
  });
}

/* ══════════════════════════════════════════
   BOTTOM NAV — active state
══════════════════════════════════════════ */
function initBottomNav() {
  const items = document.querySelectorAll('.bn-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Special home icon background
      document.querySelectorAll('.bn-home .bn-icon').forEach(ic => {
        ic.style.background = item.id === 'bn-home' ? '' : 'transparent';
        ic.style.boxShadow  = item.id === 'bn-home' ? '' : 'none';
        ic.style.color      = item.id === 'bn-home' ? '' : 'var(--clr-primary)';
      });
    });
  });
}

/* ══════════════════════════════════════════
   SCROLL ANIMATIONS (IntersectionObserver)
══════════════════════════════════════════ */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.category-row, .hero-banner, .product-card, .brands-strip'
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 0.04}s`;
        entry.target.classList.add('animate-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(t => io.observe(t));
}

/* ══════════════════════════════════════════
   CATEGORY BUTTONS
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  ['kids-cat-btn', 'mens-cat-btn', 'girls-cat-btn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => showToast('📦 Opening categories…'));
  });
});



/* ══════════════════════════════════════════
   PRODUCT CARD CLICK
══════════════════════════════════════════ */
function initProductCardClicks() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.prod-wish')) return;
      const name     = card.querySelector('.prod-name')?.textContent || 'item';
      const occasion = card.querySelector('.style-occasion')?.textContent || '';
      const suit     = card.querySelector('.style-suitability')?.textContent || '';
      showToast(`✨ ${name} — ${occasion} (${suit})`);
    });
  });
}

/* ══════════════════════════════════════════
   SUB CHIPS
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sub-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      showToast(`🔎 Browsing "${chip.textContent}" category…`);
    });
  });
});

/* ══════════════════════════════════════════
   BRAND PILLS
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.brand-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      showToast(`✨ Viewing ${pill.textContent} collection…`);
    });
  });
});

/* ══════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════ */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('sh-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sh-toast';
    toast.style.cssText = `
      position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);
      background:#111118;color:#fff;padding:10px 22px;border-radius:999px;
      font-family:'Inter',sans-serif;font-size:.85rem;font-weight:500;
      white-space:nowrap;z-index:9999;
      box-shadow:0 6px 24px rgba(0,0,0,.2);
      opacity:0;transition:opacity .22s ease,transform .22s ease;
      pointer-events:none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2200);
}

/* ══════════════════════════════════════════
   HEADER SCROLL SHADOW
══════════════════════════════════════════ */
/* ── Scroll Effects ── */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const scrollY = window.scrollY;
  
  // Header scrolled class
  if (header) {
    header.classList.toggle('scrolled', scrollY > 60);
    header.style.boxShadow = '';
    header.style.background = '';
  }

  // Hero Parallax (Summer Vibe)
  const heroAlpha = document.querySelector('.hero-alphabet-overlay');
  const heroBg = document.querySelector('.hero-summer-bg');
  if (heroAlpha) {
    heroAlpha.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`;
  }
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0002})`;
  }
}, { passive: true });





/* ══════════════════════════════════════════
   AUTH SCREEN
══════════════════════════════════════════ */
function showAuthScreen() {
  const auth = document.getElementById('auth-screen');
  if (!auth) return;
  document.body.classList.add('no-scroll');
  auth.style.display = 'flex';
  // Trigger transition after paint
  requestAnimationFrame(() => requestAnimationFrame(() => auth.classList.add('auth-visible')));
}

function closeAuthScreen() {
  const auth = document.getElementById('auth-screen');
  if (!auth) return;
  auth.classList.add('auth-fade-out');
  document.body.classList.remove('no-scroll');
  setTimeout(() => auth.remove(), 600);
}

function switchAuthTab(tab) {
  const loginForm  = document.getElementById('form-login');
  const signupForm = document.getElementById('form-signup');
  const tabLogin   = document.getElementById('tab-login');
  const tabSignup  = document.getElementById('tab-signup');

  if (tab === 'login') {
    loginForm.classList.remove('auth-form-hidden');
    signupForm.classList.add('auth-form-hidden');
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
  } else {
    signupForm.classList.remove('auth-form-hidden');
    loginForm.classList.add('auth-form-hidden');
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
  }
  // Clear errors on tab switch
  document.getElementById('login-error').textContent = '';
  document.getElementById('signup-error').textContent = '';
}

function handleSignup(e) {
  e.preventDefault();
  const name     = document.getElementById('signup-name').value.trim();
  const email    = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;
  const errEl    = document.getElementById('signup-error');

  if (password.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; return; }

  // Check if email already registered
  const users = JSON.parse(localStorage.getItem('sh_users') || '[]');
  if (users.find(u => u.email === email)) { errEl.textContent = 'Email already registered. Please login.'; return; }

  // Save new user
  users.push({ name, email, password });
  localStorage.setItem('sh_users', JSON.stringify(users));
  localStorage.setItem('sh_user', JSON.stringify({ name, email }));

  closeAuthScreen();
  showToast(`👋 Welcome, ${name}!`);
}

function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');

  const users = JSON.parse(localStorage.getItem('sh_users') || '[]');
  const user  = users.find(u => u.email === email && u.password === password);

  if (!user) { errEl.textContent = 'Incorrect email or password.'; return; }

  localStorage.setItem('sh_user', JSON.stringify({ name: user.name, email: user.email }));
  closeAuthScreen();
  showToast(`👋 Welcome back, ${user.name}!`);
}

/* ══════════════════════════════════════════
   STYLE ADVISOR — AI Tips Engine
══════════════════════════════════════════ */
const STYLE_TIPS = [
  '👗 Rule of Three: Combine no more than 3 colours in one outfit. One dominant, one secondary, one accent.',
  '🎨 Wear complementary colours (opposite on the colour wheel) for bold, high-contrast looks — like blue & orange.',
  '✨ Monochromatic dressing (one colour in different shades) always looks intentional and polished.',
  '👟 White sneakers are the universal pairing — they work with dresses, trousers, jeans, and ethnic wear.',
  '🧥 A well-fitted blazer instantly elevates any casual outfit — jeans, a tee, and a blazer = smart casual done right.',
  '💡 Tuck in your shirt on one side (the "French tuck") to add structure without looking too formal.',
  '🌿 Earthy tones — terracotta, sage, sand, rust — are always in season and pair beautifully together.',
  '👔 For formal occasions, match your belt to your shoes for a cohesive, polished look.',
  '🌈 Pastels work best in spring/summer. Pair them with white or nude to keep the look fresh.',
  '🔥 Dopamine dressing: wear a colour that makes you feel confident. Mood-boosting fashion is real.',
  '💎 Accessories should complement, not compete. If your outfit is bold, keep accessories minimal.',
  '🧣 A statement scarf can transform a basic outfit — tie it on your bag, neck, or hair.',
  '👒 Proportion matters: wide-leg trousers pair best with fitted tops; slim trousers with oversized tops.',
  '🌙 Navy is the new black — it\'s more interesting, equally versatile, and flatters every skin tone.',
  '✂️ Fit is everything. A well-tailored average outfit beats an ill-fitting expensive one every time.',
  '🎯 The 60-30-10 rule: 60% dominant colour, 30% secondary, 10% accent. Works for any outfit.',
  '🌸 Floral prints look best when paired with solid colours that match one of the hues in the print.',
  '🏖️ For beach/resort wear, linen and cotton in white, sky blue, or coral are always the right choice.',
];

let tipIndex = 0;

function toggleAdvisor() {
  const panel = document.getElementById('sa-panel');
  const isOpen = panel.classList.toggle('open');
  if (isOpen && !panel.dataset.loaded) {
    panel.dataset.loaded = '1';
    showTip(tipIndex);
  }
}

function showTip(i) {
  const el = document.getElementById('sa-tip');
  if (el) el.textContent = STYLE_TIPS[i];
}

function nextTip() {
  tipIndex = (tipIndex + 1) % STYLE_TIPS.length;
  showTip(tipIndex);
}

function shuffleTip() {
  tipIndex = Math.floor(Math.random() * STYLE_TIPS.length);
  showTip(tipIndex);
}

/* ══════════════════════════════════════════
   USER GREETING BAR
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('sh_user') || 'null');
  if (!user) return;

  const bar = document.createElement('div');
  bar.className = 'user-greeting';
  bar.innerHTML = `<span>👋 Welcome back, <strong>${user.name}</strong>! Ready to style today?</span>
    <button class="user-greeting-logout" onclick="logoutUser()">Logout</button>`;

  const header = document.getElementById('header');
  if (header) header.insertAdjacentElement('afterend', bar);

  // Also wire up womens + accessories cat buttons
  ['womens-cat-btn','acc-cat-btn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => showToast('📦 Opening categories…'));
  });
});

function logoutUser() {
  localStorage.removeItem('sh_user');
  location.reload();
}

/* ══════════════════════════════════════════
   AI ADVISOR — DRAGGABLE FAB
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const fab = document.getElementById('ai-fab');
  if (!fab) return;

  let dragging = false, startX, startY, origX, origY, moved = false;

  function getPos() {
    const r = fab.getBoundingClientRect();
    return { x: r.left, y: r.top };
  }

  function onDown(e) {
    dragging = true; moved = false;
    const pt = e.touches ? e.touches[0] : e;
    startX = pt.clientX; startY = pt.clientY;
    const pos = getPos();
    origX = pos.x; origY = pos.y;
    fab.style.transition = 'none';
    fab.style.animation = 'none';
    e.preventDefault();
  }

  function onMove(e) {
    if (!dragging) return;
    const pt = e.touches ? e.touches[0] : e;
    const dx = pt.clientX - startX;
    const dy = pt.clientY - startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
    const newX = Math.max(0, Math.min(window.innerWidth - fab.offsetWidth, origX + dx));
    const newY = Math.max(0, Math.min(window.innerHeight - fab.offsetHeight, origY + dy));
    fab.style.left = newX + 'px';
    fab.style.top  = newY + 'px';
    fab.style.right = 'auto';
    fab.style.bottom = 'auto';
    e.preventDefault();
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    fab.style.transition = '';
    fab.style.animation = '';
    if (!moved) {
      // It was a click — go to advisor page
      window.location.href = 'advisor.html';
    }
  }

  fab.addEventListener('mousedown', onDown);
  fab.addEventListener('touchstart', onDown, { passive: false });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);
});
