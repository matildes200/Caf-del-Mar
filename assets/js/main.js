/* ==========================================================================
   Café del Mar: site interactions
   Every module checks for its own markup, so one file serves all pages.
   Without GSAP (or with reduced motion) every section falls back to a
   readable static layout.
   ========================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const pad = (n) => String(n).padStart(2, '0');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* Where the reservation form posts to. FormSubmit relays it straight to the
     restaurant's inbox with no mail app involved and no account to create; the
     first submission triggers a one-time confirmation email that must be opened.
     To switch provider (Formspree, Web3Forms, your own endpoint), change this line. */
  const BOOKING_ENDPOINT = 'https://formsubmit.co/ajax/geral@coconutsluanda.com';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const { gsap, ScrollTrigger } = window;
  const motion = Boolean(gsap && ScrollTrigger) && !reduceMotion;
  const isDesktop = () => window.matchMedia('(min-width: 1001px)').matches;

  let lenis = null;

  /* ------------------------------------------------------------------------
     Opening hours, evaluated in Luanda time (WAT, UTC+1)
     ------------------------------------------------------------------------ */
  const HOURS = { 0: [540, 1440], 1: [720, 1410], 2: [600, 1410], 3: [600, 1410], 4: [600, 1410], 5: [540, 1440], 6: [540, 1440] };
  const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const DAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  function luandaNow() {
    try {
      const parts = Object.fromEntries(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Luanda', weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric',
          hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
        }).formatToParts(new Date()).map((p) => [p.type, p.value])
      );
      return {
        dow: WEEKDAYS[parts.weekday],
        minutes: (Number(parts.hour) % 24) * 60 + Number(parts.minute),
        year: Number(parts.year), month: Number(parts.month), day: Number(parts.day),
      };
    } catch {
      const d = new Date();
      return { dow: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes(), year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    }
  }

  const clock = (m) => `${pad(Math.floor(m / 60) % 24)}h${pad(m % 60)}`;

  function renderStatus() {
    const now = luandaNow();
    const [opens, closes] = HOURS[now.dow];
    let open = false;
    let text;
    if (now.minutes >= opens && now.minutes < closes) {
      open = true;
      text = closes >= 1440 ? 'Aberto agora · até à meia-noite' : `Aberto agora · até às ${clock(closes)}`;
    } else if (now.minutes < opens) {
      text = `Fechado · abre hoje às ${clock(opens)}`;
    } else {
      text = `Fechado · abre amanhã às ${clock(HOURS[(now.dow + 1) % 7][0])}`;
    }
    $$('[data-status]').forEach((el) => {
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
      const label = $('.status__text', el);
      if (label) label.textContent = text;
    });
    $$('[data-day]').forEach((row) => row.classList.toggle('is-today', Number(row.dataset.day) === now.dow));
  }

  /* First Sunday of the month (brunch) */
  function nextBrunch() {
    const now = luandaNow();
    const firstSunday = (y, m) => 1 + ((7 - new Date(Date.UTC(y, m - 1, 1)).getUTCDay()) % 7);
    let y = now.year;
    let m = now.month;
    let day = firstSunday(y, m);
    if (now.day > day) {
      m += 1;
      if (m > 12) { m = 1; y += 1; }
      day = firstSunday(y, m);
    }
    const today = y === now.year && m === now.month && day === now.day;
    return { label: today ? 'Hoje' : `Dom ${pad(day)} ${MONTHS[m - 1]}`, today };
  }

  /* ------------------------------------------------------------------------
     Page curtain & transitions between pages
     ------------------------------------------------------------------------ */
  function setupCurtain() {
    const reveal = () => requestAnimationFrame(() => root.classList.add('is-ready'));
    if (document.readyState === 'complete') reveal();
    else window.addEventListener('load', reveal);
    setTimeout(reveal, 2500);

    window.addEventListener('pageshow', (e) => {
      if (e.persisted) { root.classList.remove('is-leaving'); root.classList.add('is-ready'); }
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || /^(mailto|tel|https?):/i.test(href)) return;
      if (!/\.html(#.*)?$/i.test(href)) return;
      const samePage = new URL(href, location.href).pathname === location.pathname;
      if (samePage && href.includes('#')) return;
      if (reduceMotion) return;
      e.preventDefault();
      root.classList.add('is-leaving');
      setTimeout(() => { window.location.href = link.href; }, 560);
    });
  }

  /* ------------------------------------------------------------------------
     Header & navigation
     ------------------------------------------------------------------------ */
  function setupHeader() {
    const header = $('[data-header]');
    if (!header) return;
    const hero = $('[data-hero]');
    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const threshold = hero ? hero.offsetHeight - 120 : 40;
      header.classList.toggle('is-scrolled', y > threshold);
      if (Math.abs(y - lastY) > 4) {
        header.classList.toggle('is-hidden', y > lastY && y > 300 && !root.classList.contains('nav-open'));
        lastY = y;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function setupNav() {
    const nav = $('[data-nav]');
    const toggle = $('[data-nav-toggle]');
    if (!nav || !toggle) return;
    nav.inert = true;

    const set = (open) => {
      root.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      nav.inert = !open;
      if (lenis) open ? lenis.stop() : lenis.start();
      else document.body.style.overflow = open ? 'hidden' : '';
      if (open) setTimeout(() => $('a', nav)?.focus({ preventScroll: true }), 350);
    };

    toggle.addEventListener('click', () => set(!root.classList.contains('nav-open')));
    $('[data-nav-close]', nav)?.addEventListener('click', () => set(false));
    $$('a', nav).forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) { set(false); toggle.focus(); }
    });
  }

  function setupAnchors() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        const target = hash.length > 1 ? document.querySelector(hash) : null;
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { duration: 1.6 });
        else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ------------------------------------------------------------------------
     Background videos (poster photo stays until a video really plays)
     ------------------------------------------------------------------------ */
  function setupVideos() {
    $$('.media > video').forEach((video) => {
      const media = video.parentElement;
      video.addEventListener('playing', () => media.classList.add('is-playing'));
      if (reduceMotion || !('IntersectionObserver' in window)) { video.pause(); return; }
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { const p = video.play(); if (p) p.catch(() => {}); }
        else video.pause();
      }, { rootMargin: '200px 0px' }).observe(video);
    });
  }

  /* ------------------------------------------------------------------------
     Horizontal tracks: buttons, drag, counter & progress
     ------------------------------------------------------------------------ */
  function setupTrack(scope) {
    const track = $('[data-track]', scope);
    if (!track) return;
    const items = [...track.children];
    const current = $('[data-current]', scope);
    const total = $('[data-total]', scope);
    const fill = $('[data-progress]', scope);
    if (total) total.textContent = pad(items.length);

    const step = () => (items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth);
    const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    $('[data-prev]', scope)?.addEventListener('click', () => go(-1));
    $('[data-next]', scope)?.addEventListener('click', () => go(1));

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 1;
      let i = Math.round(track.scrollLeft / step());
      if (p > 0.98) i = items.length - 1;
      if (current) current.textContent = pad(clamp(i + 1, 1, items.length));
      if (fill) fill.style.transform = `scaleX(${Math.max(1 / items.length, p)})`;
    };
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });

    if (!canHover) return;
    let startX = 0, startLeft = 0, down = false, moved = false;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
      if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      track.classList.remove('is-dragging');
      const s = step();
      track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: 'smooth' });
    });
    track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  }

  /* Zoom and copying are switched off site-wide, by request.
     Form fields are left alone so people can still edit what they type. */
  function setupLockdown() {
    const inField = (el) => el && el.closest('input, textarea, select, [contenteditable="true"]');

    document.addEventListener('copy', (e) => { if (!inField(e.target)) e.preventDefault(); });
    document.addEventListener('cut', (e) => { if (!inField(e.target)) e.preventDefault(); });
    document.addEventListener('contextmenu', (e) => { if (!inField(e.target)) e.preventDefault(); });
    document.addEventListener('dragstart', (e) => { if (e.target.tagName === 'IMG') e.preventDefault(); });

    // Desktop: ctrl/cmd + wheel, and ctrl/cmd + plus/minus/zero
    window.addEventListener('wheel', (e) => { if (e.ctrlKey || e.metaKey) e.preventDefault(); }, { passive: false });
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && ['+', '=', '-', '_', '0'].includes(e.key)) e.preventDefault();
    });
    // Touch: pinch gestures (Safari) and double-tap zoom
    ['gesturestart', 'gesturechange', 'gestureend'].forEach((evt) => {
      document.addEventListener(evt, (e) => e.preventDefault());
    });
    document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTap < 320 && !inField(e.target)) e.preventDefault();
      lastTap = now;
    }, { passive: false });
  }

  /* Thin sunset line across the top showing how far down the page you are */
  function setupProgressBar() {
    if (reduceMotion) return;
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* HOME · Bar cards: reveal each photo only once it has loaded (or failed) */
  function setupCardImages() {
    $$('.cocktail--photo img').forEach((img) => {
      const done = () => img.classList.add('is-loaded');
      if (img.complete) done();
      else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
    });
  }

  /* ------------------------------------------------------------------------
     HOME · Days by the sea (mobile / static behaviour)
     ------------------------------------------------------------------------ */
  function setDayActive(section, index) {
    const cards = $$('.day-card', section);
    cards.forEach((c, i) => c.classList.toggle('is-active', i === index));
    const num = $('[data-days-num]', section);
    const fill = $('[data-days-fill]', section);
    if (num) num.textContent = pad(index + 1);
    if (fill) fill.style.transform = `scaleX(${(index + 1) / cards.length})`;
  }

  function setupDaysStatic() {
    const section = $('[data-days]');
    if (!section) return;
    const track = $('.days__track', section);
    const cards = $$('.day-card', section);
    $('[data-days-total]', section).textContent = `/ ${pad(cards.length)}`;
    const onScroll = () => {
      if (section.classList.contains('is-pinned')) return;
      const s = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
      setDayActive(section, clamp(Math.round(track.scrollLeft / s), 0, cards.length - 1));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    setDayActive(section, 0);
  }

  /* ------------------------------------------------------------------------
     HOME · Agenda (shared state for pinned and tap modes)
     ------------------------------------------------------------------------ */
  const agenda = { section: null, items: [], images: [], index: -1, st: null };

  function setAgendaActive(i) {
    if (i === agenda.index || !agenda.section) return;
    agenda.index = i;
    const item = agenda.items[i];
    agenda.items.forEach((b, k) => { b.classList.toggle('is-active', k === i); b.setAttribute('aria-pressed', String(k === i)); });
    agenda.images.forEach((img, k) => img.classList.toggle('is-active', k === i));
    $('[data-agenda-meta]', agenda.section).textContent = `${pad(i + 1)} / ${item.dataset.meta} / ${item.textContent.trim()}`;
    $('[data-agenda-script]', agenda.section).textContent = item.dataset.script;
    if (motion) gsap.fromTo('.agenda__card', { rotation: i % 2 ? 1.5 : -1.5 }, { rotation: 0, duration: 0.9, ease: 'power3.out' });
  }

  function setupAgenda() {
    const section = $('[data-agenda]');
    if (!section) return;
    agenda.section = section;
    agenda.items = $$('.agenda__list button', section);
    agenda.images = $$('.agenda__photo img', section);
    const brunch = agenda.items.find((b) => b.dataset.brunch !== undefined);
    if (brunch) brunch.dataset.meta = nextBrunch().label;

    agenda.items.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (agenda.st && section.classList.contains('is-pinned')) {
          const { start, end } = agenda.st;
          const y = start + ((i + 0.5) / agenda.items.length) * (end - start);
          if (lenis) lenis.scrollTo(y, { duration: 1.2 }); else window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          setAgendaActive(i);
        }
      });
    });
    setAgendaActive(0);
  }

  /* ------------------------------------------------------------------------
     HOME · Day / Night (mobile toggle)
     ------------------------------------------------------------------------ */
  const daynight = { section: null, st: null };
  function setupDayNightToggle() {
    const section = $('[data-daynight]');
    if (!section) return;
    daynight.section = section;
    $$('[data-dn]', section).forEach((btn) => {
      btn.addEventListener('click', () => {
        const night = btn.dataset.dn === 'night';
        if (daynight.st) {
          const y = night ? daynight.st.end - 2 : daynight.st.start + 2;
          if (lenis) lenis.scrollTo(y, { duration: 1.2 }); else window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     ABOUT · Story card stack
     ------------------------------------------------------------------------ */
  function setupStack() {
    const wrap = $('[data-stack]');
    if (!wrap) return;
    let cards = $$('.stack__card', wrap);
    const caption = $('[data-stack-caption]');
    const layout = () => {
      cards.forEach((card, i) => {
        const r = [0, -6, 5, -3, 7][i % 5];
        const x = [0, -16, 18, -8, 12][i % 5];
        card.style.zIndex = String(cards.length - i);
        card.style.transform = `translate(${x}px, ${i * -4}px) rotate(${i === 0 ? 0 : r}deg)`;
        card.style.opacity = '1';
      });
      const top = cards[0];
      caption.innerHTML = `<strong>${top.dataset.title}</strong>${top.dataset.text}`;
    };
    let busy = false;
    const next = () => {
      if (busy) return;
      busy = true;
      const top = cards[0];
      top.style.transform = 'translate(140%, -10%) rotate(18deg)';
      top.style.opacity = '0';
      setTimeout(() => {
        cards = [...cards.slice(1), top];
        layout();
        busy = false;
      }, reduceMotion ? 0 : 520);
    };
    wrap.addEventListener('click', next);
    wrap.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); } });
    layout();
  }

  /* ABOUT · Mission slider */
  function setupMission() {
    const scope = $('[data-mission]');
    if (!scope) return;
    const slides = $$('.mission__slide', scope);
    const slots = [$('.mission__img--a', scope), $('.mission__img--b', scope)];
    const num = $('[data-mission-num]', scope);
    const fill = $('[data-mission-fill]', scope);
    let i = 0;

    // Preload every slide's photos so a transition never waits on the network
    slides.forEach((s) => [s.dataset.imgA, s.dataset.imgB].forEach((src) => { const pre = new Image(); pre.src = src; }));

    // Crossfade: put the next photo on the hidden layer, then fade it in over the current one
    const swap = (slot, src, alt) => {
      const layers = $$('img', slot);
      const cur = layers.find((l) => l.classList.contains('is-active')) || layers[0];
      const next = layers.find((l) => l !== cur);
      if (cur.getAttribute('src') === src) return;
      next.src = src;
      next.alt = alt;
      next.removeAttribute('aria-hidden');
      const ready = next.decode ? next.decode().catch(() => {}) : Promise.resolve();
      ready.then(() => {
        next.classList.add('is-active');
        cur.classList.remove('is-active');
        cur.alt = '';
        cur.setAttribute('aria-hidden', 'true');
      });
    };

    const show = (k) => {
      i = (k + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
      num.textContent = `${i + 1}/${slides.length}`;
      fill.style.transform = `scaleX(${(i + 1) / slides.length})`;
      const s = slides[i];
      swap(slots[0], s.dataset.imgA, s.dataset.altA);
      swap(slots[1], s.dataset.imgB, s.dataset.altB);
    };
    $('[data-mission-next]', scope).addEventListener('click', () => show(i + 1));
    show(0);
  }

  /* ------------------------------------------------------------------------
     GALLERY · filters + lightbox
     ------------------------------------------------------------------------ */
  function setupGallery() {
    const grid = $('[data-gallery]');
    if (!grid) return;
    const items = $$('.gallery__item', grid);
    const buttons = $$('[data-filter]');
    buttons.forEach((btn) => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      items.forEach((it) => it.classList.toggle('is-hidden', f !== 'all' && it.dataset.cat !== f));
      if (motion) gsap.fromTo(items.filter((it) => !it.classList.contains('is-hidden')), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out' });
      if (ScrollTrigger) ScrollTrigger.refresh();
    }));

    const box = $('[data-lightbox]');
    const img = $('img', box);
    const cap = $('.lightbox__caption', box);
    let list = [];
    let pos = 0;
    let lastFocus = null;
    const show = (k) => {
      pos = (k + list.length) % list.length;
      const it = list[pos];
      const source = $('img', it);
      img.src = source.src;
      img.alt = source.alt;
      cap.textContent = $('figcaption', it)?.textContent || '';
    };
    const open = (it) => {
      list = items.filter((x) => !x.classList.contains('is-hidden'));
      lastFocus = document.activeElement;
      show(list.indexOf(it));
      box.classList.add('is-open');
      box.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
      $('.lightbox__close', box).focus();
    };
    const close = () => {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();
      lastFocus?.focus();
    };
    items.forEach((it) => {
      it.addEventListener('click', () => open(it));
      it.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(it); } });
    });
    $('.lightbox__close', box).addEventListener('click', close);
    $('.lightbox__prev', box).addEventListener('click', () => show(pos - 1));
    $('.lightbox__next', box).addEventListener('click', () => show(pos + 1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(pos + 1);
      if (e.key === 'ArrowLeft') show(pos - 1);
    });
    let tx = 0;
    box.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) show(pos + (dx < 0 ? 1 : -1));
    });
  }

  /* MENU · accordion */
  function setupMenuRows() {
    const rows = $$('.menu-row');
    const setOpen = (row, open) => {
      row.toggleAttribute('data-open', open);
      $('.menu-row__head', row).setAttribute('aria-expanded', String(open));
      setTimeout(() => ScrollTrigger && ScrollTrigger.refresh(), 750);
    };
    rows.forEach((row) => {
      $('.menu-row__head', row).addEventListener('click', () => setOpen(row, !row.hasAttribute('data-open')));
    });
    // Arriving from a link such as menu.html#cocktails opens that category
    const target = location.hash && rows.find((r) => `#${r.id}` === location.hash);
    if (target) setOpen(target, true);
  }

  /* ------------------------------------------------------------------------
     MENU · full carta rendered from window.CDM_MENU (assets/data/menu.js)
     ------------------------------------------------------------------------ */
  function setupCarta() {
    const scope = $('[data-carta]');
    const data = window.CDM_MENU;
    if (!scope || !data) return;

    const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const fmt = (v) => Number(v).toLocaleString('en-US'); // same grouping as the source menu, e.g. 10,500
    const used = new Set();
    const slug = (s) => {
      let base = String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'secao';
      let id = base;
      for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
      used.add(id);
      return id;
    };
    const { tags: tagLabels, allergens: allergenLabels } = data.labels;

    const allergenIcon = (key) => `<span class="allergen" role="img" title="${esc(allergenLabels[key] || key)}" aria-label="Contém: ${esc(allergenLabels[key] || key)}"><svg aria-hidden="true"><use href="#a-${esc(key)}"/></svg></span>`;
    const badge = (key) => `<span class="badge badge--${esc(key)}">${esc(tagLabels[key] || key)}</span>`;

    const renderItem = (it) => {
      const prices = it.prices.map((p) => `${p.label ? `<small>${esc(p.label)}</small>` : ''}${fmt(p.value)}`).join('<br>');
      return `<article class="dish-row">
        <h4>${esc(it.name)}</h4>
        <p class="dish-row__price">${prices}</p>
        ${it.description ? `<p class="dish-row__desc">${esc(it.description)}</p>` : ''}
        <div class="dish-row__marks">${it.tags.map(badge).join('')}${it.allergens.map(allergenIcon).join('')}</div>
      </article>`;
    };

    const renderGroup = (sec, parentNote) => {
      sec.id = slug(sec.name);
      const note = sec.note && sec.note !== parentNote ? `<p class="carta__note">${esc(sec.note)}</p>` : '';
      return `<section class="carta__group" id="${sec.id}">
        <h3 class="carta__title">${esc(sec.name)}</h3>
        ${sec.description ? `<p class="carta__group-desc">${esc(sec.description)}</p>` : ''}${note}
        ${sec.items.length ? `<div class="carta__items">${sec.items.map(renderItem).join('')}</div>` : ''}
        ${sec.sections.map((s) => renderGroup(s, sec.note || parentNote)).join('')}
      </section>`;
    };

    // Tabs + panels (one per top-level section)
    const tabsEl = $('[data-carta-tabs]', scope);
    const chipsEl = $('[data-carta-chips]', scope);
    const panelsEl = $('[data-carta-panels]', scope);
    const owner = {}; // element id -> tab index (for deep links)

    data.sections.forEach((top, i) => {
      top.id = slug(top.name);
      tabsEl.insertAdjacentHTML('beforeend', `<button class="carta__tab" type="button" role="tab" id="tab-${top.id}" aria-controls="panel-${top.id}" aria-selected="false" tabindex="-1">${esc(top.name)}</button>`);
      const head = `<header class="carta__head">${top.description ? `<p>${esc(top.description)}</p>` : ''}${top.note ? `<p class="carta__note">${esc(top.note)}</p>` : ''}</header>`;
      const body = (top.items.length ? `<div class="carta__items">${top.items.map(renderItem).join('')}</div>` : '') + top.sections.map((s) => renderGroup(s, top.note)).join('');
      panelsEl.insertAdjacentHTML('beforeend', `<div class="carta__panel" role="tabpanel" id="panel-${top.id}" aria-labelledby="tab-${top.id}" hidden>${head}${body}</div>`);
      owner[top.id] = i;
      $$(`#panel-${top.id} [id]`, panelsEl).forEach((el) => { owner[el.id] = i; });
    });

    // Legend
    $('[data-carta-legend]', scope).innerHTML = `
      <span class="carta__legend-label">Legenda</span>
      <ul>${Object.keys(tagLabels).map((k) => `<li>${badge(k)}</li>`).join('')}</ul>
      <span class="carta__legend-label">Contém</span>
      <ul>${Object.keys(allergenLabels).map((k) => `<li>${allergenIcon(k)}<span>${esc(allergenLabels[k])}</span></li>`).join('')}</ul>
      <p>Preços em Akz (kwanzas).</p>`;

    const tabs = $$('.carta__tab', tabsEl);
    const panels = $$('.carta__panel', panelsEl);
    const navHeight = () => $('.carta__nav', scope).offsetHeight;
    const scrollToEl = (el) => {
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight() - 16;
      if (lenis) lenis.scrollTo(y, { duration: 1.1 }); else window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    const activate = (i) => {
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach((p, k) => { p.hidden = k !== i; });
      chipsEl.innerHTML = data.sections[i].sections.map((s) => `<a class="carta__chip" href="#${s.id}">${esc(s.name)}</a>`).join('');
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'center' });
      if (ScrollTrigger) ScrollTrigger.refresh();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => { activate(i); scrollToEl(scope); });
      tab.addEventListener('keydown', (e) => {
        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        const k = (i + dir + tabs.length) % tabs.length;
        activate(k);
        tabs[k].focus();
      });
    });
    chipsEl.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) scrollToEl(target);
    });

    // Deep links such as menu.html#criacoes-cafe-del-mar
    const openHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!(id in owner)) return false;
      activate(owner[id]);
      const target = document.getElementById(id) || scope;
      setTimeout(() => scrollToEl(target), 300);
      return true;
    };
    if (!openHash()) activate(0);
    window.addEventListener('hashchange', openHash);
  }

  /* ------------------------------------------------------------------------
     RESERVATIONS · three-step request → pre-filled email
     ------------------------------------------------------------------------ */
  function setupBooking() {
    const form = $('[data-booking]');
    if (!form) return;
    const steps = $$('.form-step', form);
    const dots = $$('.stepper__dot');
    const timeSelect = form.elements.hora;
    const dateInput = form.elements.data;
    let current = 0;

    const now = luandaNow();
    dateInput.min = `${now.year}-${pad(now.month)}-${pad(now.day)}`;

    const fillTimes = () => {
      const keep = timeSelect.value;
      let dow = null;
      if (dateInput.value) dow = new Date(`${dateInput.value}T12:00:00`).getDay();
      const [opens, closes] = dow === null ? [540, 1440] : HOURS[dow];
      timeSelect.innerHTML = '<option value="">Escolha a hora</option>';
      for (let m = opens; m <= closes - 60; m += 30) {
        const label = clock(m).replace('h', ':');
        timeSelect.add(new Option(label, label, false, label === keep));
      }
    };
    dateInput.addEventListener('change', fillTimes);
    fillTimes();

    const validate = (stepEl) => {
      let first = null;
      $$('[required]', stepEl).forEach((input) => {
        const ok = input.value.trim() !== '' && input.checkValidity();
        input.closest('.field').classList.toggle('is-invalid', !ok);
        if (!ok && !first) first = input;
      });
      if (first) first.focus();
      return !first;
    };

    const go = (k) => {
      current = k;
      steps.forEach((s, i) => { s.hidden = i !== k; });
      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === k);
        d.classList.toggle('is-done', i < k);
      });
      if (k === 2) renderReview();
      $('input, select, textarea, button', steps[k])?.focus({ preventScroll: true });
    };

    const data = () => Object.fromEntries(new FormData(form));
    const prettyDate = (v) => (v ? new Date(`${v}T12:00:00`).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '');

    const renderReview = () => {
      const d = data();
      const rows = [
        ['Nome', d.nome], ['Telefone', d.telefone], ['Email', d.email || 'Não indicado'],
        ['Data', prettyDate(d.data)], ['Hora', d.hora], ['Pessoas', d.pessoas], ['Motivo', d.motivo],
      ];
      $('[data-review]', form).innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${String(v).replace(/[<>&]/g, '')}</dd></div>`).join('');
    };

    form.addEventListener('input', (e) => e.target.closest('.field')?.classList.remove('is-invalid'));
    $$('[data-next-step]', form).forEach((b) => b.addEventListener('click', () => { if (validate(steps[current])) go(current + 1); }));
    $$('[data-prev-step]', form).forEach((b) => b.addEventListener('click', () => go(current - 1)));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const note = $('[data-booking-note]');
      const submitBtn = $('button[type="submit"]', form);
      const d = data();

      const payload = {
        _subject: `Pedido de reserva: ${d.motivo}, ${prettyDate(d.data)} às ${d.hora}`,
        Nome: d.nome,
        Telefone: d.telefone,
        Email: d.email || 'Não indicado',
        Data: prettyDate(d.data),
        Hora: d.hora,
        Pessoas: d.pessoas,
        Motivo: d.motivo,
        Mensagem: d.mensagem || '',
        _template: 'table',
        _captcha: 'false',
      };

      submitBtn.disabled = true;
      note.textContent = 'A enviar o seu pedido…';
      try {
        const res = await fetch(BOOKING_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        form.reset();
        go(0);
        note.textContent = 'Pedido enviado. Respondemos em até 24 horas.';
      } catch {
        note.innerHTML = 'Não foi possível enviar o pedido. Ligue-nos para <a href="tel:+244923581333" style="text-decoration:underline">+244 923 581 333</a> ou escreva para <a href="mailto:geral@coconutsluanda.com" style="text-decoration:underline">geral@coconutsluanda.com</a>.';
      } finally {
        submitBtn.disabled = false;
      }
    });

    go(0);
  }

  /* ========================================================================
     MOTION (GSAP + ScrollTrigger + Lenis)
     ======================================================================== */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const outer = document.createElement('span');
            const inner = document.createElement('span');
            outer.className = 'w';
            inner.className = 'w__i';
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
        }
      });
    };
    walk(el);
    return $$('.w__i', el);
  }

  // Title rises word by word, handwritten line "writes" itself left to right.
  function pairTimeline(pair, opts = {}) {
    const main = $('.pair__main', pair);
    const script = $('.pair__script', pair);
    const words = main ? splitWords(main) : [];
    const tl = gsap.timeline(opts);
    tl.from(words, { yPercent: 165, duration: 0.7, ease: 'expo.out', stagger: 0.04 }, 0);
    if (script) tl.fromTo(script, { clipPath: 'inset(-20% 100% -40% 0%)' }, { clipPath: 'inset(-20% 0% -40% 0%)', duration: 0.8, ease: 'power2.inOut' }, 0.22);
    return tl;
  }

  function setupLenis() {
    if (!window.Lenis) return;
    lenis = new window.Lenis({ duration: 0.85, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* HOME · Hero */
  function heroMotion() {
    const hero = $('.hero[data-hero]');
    if (!hero) return;
    const letters = $$('.hero__arc tspan', hero);
    const plate = $('.hero__plate', hero);
    const plateImg = $('.hero__plate-img', hero);
    const arc = $('.hero__arc', hero);

    const intro = gsap.timeline({ paused: true, delay: 0.15 });
    if (letters.length) {
      gsap.set(letters, { attr: { 'fill-opacity': 0 } });
      intro.to(letters, { attr: { 'fill-opacity': 1 }, duration: 0.45, stagger: 0.028, ease: 'power1.out' }, 0.35);
      intro.from(arc, { rotation: -8, transformOrigin: '50% 50%', duration: 1.6, ease: 'expo.out' }, 0);
    }
    intro.fromTo(plate, { yPercent: 46 }, { yPercent: 0, duration: 1.5, ease: 'expo.out' }, 0);
    intro.fromTo(plateImg, { rotation: -32, scale: 0.92 }, { rotation: 0, scale: 1, duration: 1.7, ease: 'expo.out' }, 0);
    intro.from('.hero__media', { scale: 1.1, duration: 2, ease: 'expo.out' }, 0);
    intro.from('[data-header]', { yPercent: -100, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity' }, 0.35);

    const start = () => {
      intro.play();
      // Keeps the plate quietly alive once it has landed
      gsap.to(plateImg, { y: -10, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 });
    };
    if (root.classList.contains('is-ready')) start();
    else new MutationObserver((_, obs) => { if (root.classList.contains('is-ready')) { obs.disconnect(); start(); } }).observe(root, { attributes: true, attributeFilter: ['class'] });

    gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
      .to(arc, { rotation: 16, opacity: 0, transformOrigin: '50% 50%', ease: 'none' }, 0)
      .to(plate, { yPercent: -24, scale: 1.06, ease: 'none' }, 0)
      .to(plateImg, { rotation: 30, ease: 'none' }, 0)
      .to('.hero__media', { yPercent: 12, ease: 'none' }, 0);
  }

  /* HOME · Pinned plate journey */
  function journeyMotion() {
    const section = $('[data-journey]');
    if (!section) return;
    section.classList.add('is-pinned');
    const steps = $$('.plate__step', section);
    const n = steps.length;
    const svg = $('.plate__svg', section);
    const plate = $('.plate', section);
    const num = $('[data-plate-num]', section);
    const fill = $('[data-plate-fill]', section);
    const polaroids = $$('.journey__polaroid', section);
    const LEAD = 0.3;

    gsap.set(steps, { autoAlpha: 0, y: 24 });
    gsap.set('.plate__counter', { autoAlpha: 0 });
    gsap.set(polaroids, { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: section, start: 'top top', end: () => `+=${window.innerHeight * (n * 0.62)}`,
        pin: true, scrub: 0.45, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = clamp(Math.floor(self.progress * tl.duration() - LEAD), 0, n - 1);
          num.textContent = pad(i + 1);
          fill.style.transform = `scaleX(${(i + 1) / n})`;
        },
      },
    });

    // Short lead-in: the plate is already on screen when the section pins, so the
    // first thing you see is the plate and its first step, not an empty white frame.
    tl.fromTo(plate, { y: () => window.innerHeight * 0.18 }, { y: 0, duration: LEAD, ease: 'power3.out' }, 0);
    tl.fromTo(svg, { rotation: -24 }, { rotation: 0, duration: LEAD, ease: 'power3.out' }, 0);
    tl.to(svg, { rotation: 300, duration: n, ease: 'none' }, LEAD);
    tl.to('.plate__counter', { autoAlpha: 1, duration: 0.2 }, 0);

    steps.forEach((step, i) => {
      const at = LEAD + i;
      tl.to(step, { autoAlpha: 1, y: 0, duration: 0.3 }, i === 0 ? 0 : at);
      if (i < n - 1) tl.to(step, { autoAlpha: 0, y: -24, duration: 0.28 }, at + 0.72);
    });

    polaroids.forEach((p) => {
      const i = Number(p.dataset.step);
      const at = i === 0 ? 0 : LEAD + i - 0.05;
      const dir = p.dataset.from === 'right' ? 1 : -1;
      tl.fromTo(p, { autoAlpha: 0, x: dir * 160, y: 120, rotation: dir * 14 }, { autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: 0.45, ease: 'power3.out' }, at);
      if (i < n - 1) tl.to(p, { autoAlpha: 0, x: dir * -80, y: -160, rotation: dir * -8, duration: 0.38, ease: 'power2.in' }, LEAD + i + 0.7);
    });

    tl.to({}, { duration: 0.3 });
  }

  /* HOME · Atmosphere band */
  function atmosMotion() {
    const section = $('[data-atmos]');
    if (!section) return;
    gsap.fromTo($('.atmos__media', section), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo($('.atmos__title', section), { scale: 0.9, opacity: 0.35 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 85%', end: 'center 65%', scrub: 0.4 } });
  }

  /* HOME · Days: pinned horizontal on desktop */
  function daysMotion(mm) {
    const section = $('[data-days]');
    if (!section) return;
    mm.add('(min-width: 1001px)', () => {
      section.classList.add('is-pinned');
      const track = $('.days__track', section);
      const viewport = $('.days__viewport', section);
      const cards = $$('.day-card', section);
      track.scrollLeft = 0;
      // Slide until the last card's right edge meets the right gutter of the screen
      const distance = () => {
        const left = viewport.getBoundingClientRect().left;
        const gutter = parseFloat(getComputedStyle(section).getPropertyValue('--gutter')) || 40;
        return Math.max(0, track.scrollWidth - (window.innerWidth - left - gutter));
      };
      const tween = gsap.to(track, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => `+=${distance() + window.innerHeight * 0.25}`,
          pin: true, scrub: 0.4, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => setDayActive(section, clamp(Math.round(self.progress * (cards.length - 1)), 0, cards.length - 1)),
        },
      });
      return () => { section.classList.remove('is-pinned'); tween.scrollTrigger?.kill(); gsap.set(track, { clearProps: 'transform' }); };
    });
  }

  /* HOME · Drinks scene */
  function drinksMotion() {
    const section = $('[data-drinks]');
    if (!section) return;
    const st = { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true };
    gsap.fromTo('.drinks__glass', { y: 140, rotation: -4 }, { y: -80, rotation: 3, ease: 'none', scrollTrigger: st });
    gsap.fromTo('.drinks__title', { letterSpacing: '0.12em', opacity: 0.4 }, { letterSpacing: '0.01em', opacity: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 85%', end: 'center center', scrub: true } });
    $$('.leaf', section).forEach((leaf) => {
      const s = Number(leaf.dataset.speed || 0.5);
      gsap.fromTo(leaf, { y: 160 * s, x: -30 * s }, { y: -160 * s, x: 30 * s, ease: 'none', scrollTrigger: st });
    });
  }

  /* HOME · Day / Night wipe */
  function dayNightMotion() {
    const section = $('[data-daynight]');
    if (!section) return;
    const night = $('.daynight__panel--night', section);
    const dayTitle = $('.daynight__panel--day .pair', section);
    const nightTitle = $('.daynight__panel--night .pair', section);
    const fill = $('[data-dn-fill]', section);
    const buttons = $$('[data-dn]', section);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: 'top top', end: () => `+=${window.innerHeight * 1.05}`, pin: true, scrub: 0.4, anticipatePin: 1,
        onUpdate: (self) => {
          fill.style.transform = `scaleX(${Math.max(0.04, self.progress)})`;
          buttons.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.dn === 'night') === self.progress > 0.5)));
        },
      },
    });
    daynight.st = tl.scrollTrigger;
    tl.to(dayTitle, { yPercent: -30, opacity: 0, duration: 0.4 }, 0.15)
      .fromTo(night, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power2.inOut' }, 0.2)
      .from($('img', night), { scale: 1.15, duration: 0.9, ease: 'power2.out' }, 0.2)
      .from(nightTitle, { yPercent: 30, opacity: 0, duration: 0.4 }, 0.6)
      .to({}, { duration: 0.3 });
  }

  /* HOME · Agenda: pinned on desktop */
  function agendaMotion(mm) {
    const section = $('[data-agenda]');
    if (!section) return;
    mm.add('(min-width: 1001px)', () => {
      section.classList.add('is-pinned');
      const n = agenda.items.length;
      const st = ScrollTrigger.create({
        trigger: section, start: 'top top', end: () => `+=${window.innerHeight * (n * 0.3)}`,
        pin: true, anticipatePin: 1,
        onUpdate: (self) => setAgendaActive(clamp(Math.floor(self.progress * n), 0, n - 1)),
      });
      agenda.st = st;
      return () => { section.classList.remove('is-pinned'); agenda.st = null; };
    });
  }

  /* HOME · Waves CTA */
  function ctaMotion() {
    const section = $('[data-cta]');
    if (!section) return;
    gsap.fromTo($('.cta__media', section), { yPercent: -6, scale: 1.08 }, { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* Inner pages · hero */
  function pageHeroMotion() {
    const hero = $('.page-hero[data-hero]');
    if (!hero) return;
    const pair = $('.pair', hero);
    const intro = pairTimeline(pair, { paused: true, delay: 0.3 });
    intro.from($('.page-hero__text', hero), { opacity: 0, y: 20, duration: 1, ease: 'power3.out' }, 0.6);
    intro.from('[data-header]', { yPercent: -100, opacity: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity' }, 0.4);
    const start = () => intro.play();
    if (root.classList.contains('is-ready')) start();
    else new MutationObserver((_, obs) => { if (root.classList.contains('is-ready')) { obs.disconnect(); start(); } }).observe(root, { attributes: true, attributeFilter: ['class'] });

    const media = $('.page-hero__media', hero);
    if (media) gsap.to(media, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to([pair, $('.page-hero__text', hero)], { yPercent: -40, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true } });
  }

  /* Generic reveals, created after pins so positions include pin spacing */
  function genericMotion() {
    const skip = '.hero, .page-hero, [data-journey], [data-daynight]';
    $$('.pair').forEach((pair) => {
      if (pair.closest(skip)) return;
      pairTimeline(pair, { scrollTrigger: { trigger: pair, start: 'top 90%' } });
    });

    $$('[data-reveal]').forEach((el) => {
      gsap.from(el, { y: 28, opacity: 0, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
    });

    $$('[data-reveal-stagger]').forEach((el) => {
      gsap.from(el.children, { y: 34, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });

    $$('[data-img-reveal]').forEach((el) => {
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } })
        .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'expo.inOut' })
        .from($('img', el), { scale: 1.18, duration: 1.1, ease: 'expo.out' }, 0.15);
    });

    $$('[data-frame-parallax]').forEach((el) => {
      const inner = $('.framed__inner img', el);
      const outer = $(':scope > img', el);
      const st = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true };
      if (inner) gsap.fromTo(inner, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: st });
      if (outer) gsap.fromTo(outer, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: st });
    });


    // Gallery tiles rise in a few at a time as the collage scrolls past
    const tiles = $$('.gallery__item');
    if (tiles.length) {
      ScrollTrigger.batch(tiles, {
        start: 'top 94%',
        onEnter: (batch) => gsap.from(batch, { y: 42, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', overwrite: true }),
      });
    }

    $$('[data-speed]').forEach((el) => {
      if (el.closest('[data-drinks]')) return;
      const s = Number(el.dataset.speed);
      gsap.fromTo(el, { y: -s * 100 }, { y: s * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  function setupMotion() {
    gsap.registerPlugin(ScrollTrigger);
    setupLenis();
    const mm = gsap.matchMedia();
    // Sections in page order so each pin measures the ones above it
    heroMotion();
    pageHeroMotion();
    journeyMotion();
    atmosMotion();
    daysMotion(mm);
    drinksMotion();
    dayNightMotion();
    agendaMotion(mm);
    ctaMotion();
    genericMotion();
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  renderStatus();
  setInterval(renderStatus, 60000);
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  setupCurtain();
  setupHeader();
  setupNav();
  setupVideos();
  $$('[data-track-scope]').forEach(setupTrack);
  setupCardImages();
  setupProgressBar();
  setupLockdown();
  setupDaysStatic();
  setupAgenda();
  setupDayNightToggle();
  setupStack();
  setupMission();
  setupGallery();
  setupMenuRows();
  setupCarta();
  setupBooking();

  if (motion) setupMotion();
  else $$('[data-daynight]').forEach((s) => s.classList.add('is-static'));
  setupAnchors();
})();
