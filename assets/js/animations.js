/* ============================================================
   animations.js — Recanto do Sol Chalés
   Scroll reveal, stagger, troca suave de foto e helpers
   ============================================================ */

/* ── 1. Scroll Reveal via IntersectionObserver ─────────────── */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // anima só uma vez
      });
    },
    { threshold: 0.5, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
}

/* ── 2. Stagger automático em listas / grids ────────────────── */
function initStagger() {
  // Highlights bar
  document.querySelectorAll('.highlights-list li').forEach((li, i) => {
    li.setAttribute('data-reveal', 'up');
    li.setAttribute('data-delay', Math.min(i + 1, 6));
  });

  // Serviço cards
  document.querySelectorAll('.servico-card').forEach((card, i) => {
    card.setAttribute('data-reveal', 'up');
    card.setAttribute('data-delay', Math.min((i % 3) + 1, 6));
  });

  // Ext features list items
  document.querySelectorAll('.ext-features li').forEach((li, i) => {
    li.setAttribute('data-reveal', 'up');
    li.setAttribute('data-delay', Math.min(i + 1, 6));
  });

  // Pagamento items
  document.querySelectorAll('.pagamento-item').forEach((item, i) => {
    item.setAttribute('data-reveal', 'up');
    item.setAttribute('data-delay', i + 1);
  });
}

/* ── 3. Troca de foto com fade suave nos chalés ─────────────── */
function initSmoothGallery() {
  // Interceptar cliques nas thumbs para adicionar a transição de fade
  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('.chale-thumb');
    if (!thumb) return;

    const card    = thumb.closest('.chale-card');
    const mainImg = card?.querySelector('.chale-main-img');
    if (!mainImg) return;

    // Inicia o fade-out
    mainImg.classList.add('is-switching');

    // Após o fade-out, a troca de src já ocorreu no script.js
    // Aguarda o início da transição e depois remove a classe
    setTimeout(() => {
      mainImg.classList.remove('is-switching');
    }, 80); // leve delay para garantir re-paint
  });
}

/* ── 4. Links de âncora com scroll-offset correto ──────────── */
function initSmoothAnchors() {
  const NAV_H = 72; // altura do nav sticky

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_H;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── 5. Lazy-load imagens com fade-in ───────────────────────── */
function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');

  imgs.forEach((img) => {
    if (!img.complete) {
      img.classList.add('lazy-hidden');
      img.addEventListener('load', () => {
        img.classList.remove('lazy-hidden');
        img.classList.add('lazy-loaded');
      });
    }
  });
}

/* ── 6. Contador animado nos percentuais de pagamento ───────── */
function initCounters() {
  const nums = document.querySelectorAll('.pagamento-num');
  if (!nums.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseInt(el.textContent);
        if (isNaN(end)) return;
        observer.unobserve(el);

        let start = 0;
        const dur = 1000;
        const step = 160;
        const inc  = end / (dur / step);
        const suffix = el.textContent.replace(/\d+/, '');

        const tick = () => {
          start = Math.min(start + inc, end);
          el.textContent = Math.round(start) + '%';
          if (start < end) setTimeout(tick, step);
        };
        tick();
      });
    },
    { threshold: 1 }
  );

  nums.forEach((el) => observer.observe(el));
}

/* ── 7. Nav: highlight do link ativo ao rolar ───────────────── */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id], div[id="topo"]');
  const links    = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const NAV_H    = 80;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('nav-link--active', isActive);
          link.style.color = isActive ? 'var(--fg)' : '';
        });
      });
    },
    { rootMargin: `-${NAV_H}px 0px -55% 0px` }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ── Entry point ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Stagger precisa rodar ANTES do reveal para adicionar data-* nos elementos
  initStagger();

  // Pequeno delay para garantir que os cards dos chalés (gerados via JS) existam
  setTimeout(() => {
    initReveal();
  }, 80);

  initSmoothGallery();
  initSmoothAnchors();
  initLazyImages();
  initCounters();
  initNavHighlight();
});
