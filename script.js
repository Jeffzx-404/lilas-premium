/* ============================================
   LILAS — Interacciones sin librerías externas
   Menú móvil, selección de evento y formulario.
   ============================================ */

const menuButton = document.querySelector('#menuToggle');
const mobileMenu = document.querySelector('#mobileMenu');

function closeMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  mobileMenu.hidden = true;
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  mobileMenu.hidden = isOpen;
  document.body.classList.toggle('menu-open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 1160) closeMenu(); });
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

// Al cotizar desde una tarjeta, se selecciona el tipo de evento relacionado.
const eventSelect = document.querySelector('#type');
document.querySelectorAll('[data-event]').forEach((link) => {
  link.addEventListener('click', () => {
    const choice = [...eventSelect.options].find((option) => option.value === link.dataset.event);
    if (choice) eventSelect.value = choice.value;
  });
});

// Evita una fecha pasada sin alterar el valor elegido por el visitante.
const dateInput = document.querySelector('#date');
if (dateInput) {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  dateInput.min = localDate;
}

// Sin servidor: se abre WhatsApp con la solicitud preparada para el número oficial.
const whatsappNumber = '51971621383';
const quoteForm = document.querySelector('#quoteForm');
quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const form = new FormData(quoteForm);
  const lines = [
    'Hola, quisiera solicitar una cotización para mi evento.',
    '',
    'Nombre: ' + (form.get('nombre') || ''),
    'Correo: ' + (form.get('email') || ''),
    'Teléfono: ' + (form.get('telefono') || ''),
    'Fecha: ' + (form.get('fecha') || ''),
    'Tipo: ' + (form.get('tipo') || ''),
    'Invitados: ' + (form.get('invitados') || 'Sin especificar'),
    'Detalles: ' + (form.get('detalles') || 'Sin especificar'),
  ];
  const body = encodeURIComponent(lines.join('\n'));
  document.querySelector('#formMessage').textContent = 'Se preparó tu solicitud. Se abrirá WhatsApp para que revises el mensaje y pulses enviar.';
  window.location.href = 'https://wa.me/' + whatsappNumber + '?text=' + body;
});

document.querySelector('#year').textContent = new Date().getFullYear();

/* Presentación: portada de video, encabezado y apariciones al desplazarse.
   El formulario y su destino de WhatsApp se conservan arriba. */
(() => {
  const hero = document.querySelector('.cinematic-hero');
  const header = document.querySelector('.site-header');
  const media = document.querySelector('.hero-media');
  const video = document.querySelector('#heroVideo');
  const toggle = document.querySelector('#videoToggle');
  if (!hero || !header || !video || !toggle) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreen = window.matchMedia('(max-width: 700px)');
  const saveData = navigator.connection?.saveData === true;
  let wantsPlayback = !reducedMotion.matches && !saveData;
  let inView = true;
  let animationFrame = 0;
  let heroHeight = hero.offsetHeight;

  const updateVideoControl = () => {
    const playing = !video.paused && !video.ended;
    toggle.dataset.playing = String(playing);
    toggle.setAttribute('aria-label', playing ? 'Pausar video de fondo' : 'Reproducir video de fondo');
    toggle.querySelector('.video-toggle-label').textContent = playing ? 'Pausar' : 'Reproducir';
  };

  const startVideo = async () => {
    if (!wantsPlayback || !inView || document.hidden || video.error) return;
    if (!video.getAttribute('src')) {
      video.src = smallScreen.matches ? video.dataset.mobileSrc : video.dataset.desktopSrc;
      video.muted = true;
      video.load();
    }
    try { await video.play(); } catch { /* El botón permite iniciar si el navegador bloquea autoplay. */ }
    updateVideoControl();
  };

  video.addEventListener('playing', () => {
    hero.classList.add('has-video');
    updateVideoControl();
  });
  video.addEventListener('pause', updateVideoControl);
  video.addEventListener('error', () => {
    hero.classList.remove('has-video');
    toggle.hidden = true;
    document.querySelector('#videoStatus').textContent = 'Se muestra la fotografía de la mesa de boda porque el video no está disponible.';
  });
  toggle.addEventListener('click', () => {
    wantsPlayback = video.paused;
    if (wantsPlayback) startVideo();
    else video.pause();
  });

  const renderScroll = () => {
    animationFrame = 0;
    const scrollY = Math.max(0, window.scrollY);
    header.classList.toggle('is-scrolled', scrollY > 48);
    document.body.classList.toggle('at-hero', scrollY < heroHeight * .65);
    if (media && !reducedMotion.matches && scrollY < heroHeight) {
      media.style.setProperty('--hero-shift', Math.min(54, scrollY * .1) + 'px');
    }
  };
  const scheduleScroll = () => { if (!animationFrame) animationFrame = requestAnimationFrame(renderScroll); };
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', () => { heroHeight = hero.offsetHeight; scheduleScroll(); }, { passive: true });
  renderScroll();

  if ('IntersectionObserver' in window) {
    const playbackObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) startVideo();
      else video.pause();
    }, { threshold: 0 });
    playbackObserver.observe(hero);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else startVideo();
  });

  const revealElements = [...document.querySelectorAll('.section-heading, .essence-copy, .offering-row > div, .dish-card, .occasion-card, .details-visual, .details-copy, .process-grid li, .questions-grid > div, .contact-copy, .quote-panel')];
  let revealObserver;
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });
    revealElements.forEach(element => {
      if (element.closest('.extended-menu')) return;
      const grid = element.parentElement;
      if (grid.matches('.dish-grid, .occasion-grid, .process-grid, .offering-row')) {
        const index = [...grid.children].indexOf(element);
        element.style.setProperty('--reveal-delay', Math.min(index * 90, 180) + 'ms');
      }
      element.classList.add('reveal-pending');
      revealObserver.observe(element);
    });
  }

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      wantsPlayback = false;
      video.pause();
      media?.style.setProperty('--hero-shift', '0px');
      revealObserver?.disconnect();
      revealElements.forEach(element => element.classList.add('is-revealed'));
    }
  });
  startVideo();
})();
