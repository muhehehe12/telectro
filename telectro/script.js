/* =============================================
   TELECTRO — script.js
   Funcionalidades: Navbar, menú móvil, reveal,
   contador animado, formulario, año dinámico
   ============================================= */

'use strict';

/* -------- DOM ready -------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initReveal();
  initCounters();
  initContactForm();
  initSmoothScroll();
  setCurrentYear();
});

/* ============================
   NAVBAR — scroll + color
   ============================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
}

/* ============================
   MENÚ HAMBURGUESA (móvil)
   ============================ */
function initMobileMenu() {
  const btn     = document.getElementById('hamburger-btn');
  const links   = document.getElementById('nav-links');
  const cta     = document.getElementById('nav-cta-btn');
  const overlay = document.getElementById('nav-overlay');
  if (!btn || !links) return;

  const open = () => {
    btn.classList.add('open');
    links.classList.add('open');
    overlay.classList.add('show');
    cta?.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    btn.classList.remove('open');
    links.classList.remove('open');
    overlay.classList.remove('show');
    cta?.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => {
    btn.classList.contains('open') ? close() : open();
  });

  overlay.addEventListener('click', close);

  // Cerrar al hacer clic en un enlace
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ============================
   SCROLL REVEAL
   ============================ */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Delay escalonado para grupos de tarjetas
          const delay = parseInt(entry.target.dataset.delay || 0);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  // Añadir delays escalonados a grupos de tarjetas
  document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
  document.querySelectorAll('.team-grid .team-card').forEach((el, i) => {
    el.dataset.delay = i * 120;
  });
  document.querySelectorAll('.pricing-grid .price-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================
   CONTADORES ANIMADOS (Hero)
   ============================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.target);
  const duration = 1500; // ms
  const start    = performance.now();

  const update = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: easeOutExpo
    const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

/* ============================
   SMOOTH SCROLL (links href=#)
   ============================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH   = document.getElementById('navbar')?.offsetHeight || 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================
   FORMULARIO DE CONTACTO
   ============================ */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    nombre:   { el: document.getElementById('f-nombre'),   err: document.getElementById('err-nombre') },
    telefono: { el: document.getElementById('f-telefono'), err: document.getElementById('err-telefono') },
    mensaje:  { el: document.getElementById('f-mensaje'),  err: document.getElementById('err-mensaje') },
  };

  const submitBtn = document.getElementById('form-submit-btn');
  const btnTxt    = document.getElementById('btn-txt');
  const btnIco    = document.getElementById('btn-ico');
  const btnSpin   = document.getElementById('btn-spin');
  const formOK    = document.getElementById('form-success');

  // Validación en tiempo real
  Object.values(fields).forEach(({ el, err }) => {
    if (!el) return;
    el.addEventListener('input', () => validateField(el, err));
    el.addEventListener('blur',  () => validateField(el, err));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let valid = true;
    Object.values(fields).forEach(({ el, err }) => {
      if (el && !validateField(el, err)) valid = false;
    });
    if (!valid) return;

    // Estado cargando
    setLoading(true);

    // Simular envío (aquí integrarías tu backend / EmailJS / Formspree)
    await fakeSubmit();

    setLoading(false);
    form.style.display   = 'none';
    formOK.style.display = 'flex';
    formOK.setAttribute('aria-hidden', 'false');
  });

  /* ---- Helpers ---- */
  function validateField(el, errEl) {
    let msg = '';
    const val = el.value.trim();

    if (el.required && !val) {
      msg = 'Este campo es obligatorio.';
    } else if (el.type === 'email' && val && !isValidEmail(val)) {
      msg = 'Introduce un email válido.';
    } else if (el.id === 'f-telefono' && val && !isValidPhone(val)) {
      msg = 'Introduce un teléfono válido (mínimo 9 dígitos).';
    } else if (el.tagName === 'TEXTAREA' && val.length < 10) {
      msg = 'Describe tu necesidad con al menos 10 caracteres.';
    }

    if (errEl) errEl.textContent = msg;
    el.classList.toggle('error', !!msg);
    return !msg;
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }
  function isValidPhone(v) {
    return /^[\d\s\+\-]{9,15}$/.test(v);
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    btnTxt.textContent = loading ? 'Enviando...' : 'Enviar solicitud';
    if (btnIco)  btnIco.style.display  = loading ? 'none' : '';
    if (btnSpin) btnSpin.style.display = loading ? 'inline-block' : 'none';
  }

  function fakeSubmit() {
    return new Promise(res => setTimeout(res, 1800));
  }
}

/* ============================
   AÑO DINÁMICO EN FOOTER
   ============================ */
function setCurrentYear() {
  const el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
}
