(function () {
  var root = document.documentElement;

  // Light / dark switch (starts from the device setting, remembers the visitor's choice)
  var themeBtn = document.getElementById('theme-btn');
  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function syncThemeIcon() { root.setAttribute('data-theme', current()); }
  if (themeBtn) {
    syncThemeIcon();
    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('listaso-theme', next); } catch (e) {}
    });
  }

  // Mobile menu
  var menuBtn = document.getElementById('menu-btn');
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var open = document.body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', open);
  });

  // Dropdowns: click to open; on desktop also hover, with a short delay before closing
  // so the menu stays open while the pointer travels down to it.
  var dds = [].slice.call(document.querySelectorAll('[data-dd]'));
  var desktop = window.matchMedia('(min-width: 1280px)');
  function setOpen(d, open) {
    d.classList.toggle('open', open);
    d.querySelector('.dd-btn').setAttribute('aria-expanded', open);
  }
  function closeAll(except) { dds.forEach(function (d) { if (d !== except) setOpen(d, false); }); }
  dds.forEach(function (d) {
    var b = d.querySelector('.dd-btn'), timer = null;
    function cancel() { if (timer) { clearTimeout(timer); timer = null; } }
    b.addEventListener('click', function (e) {
      e.stopPropagation(); cancel();
      var open = !d.classList.contains('open');
      if (desktop.matches) closeAll(d);
      setOpen(d, open);
    });
    d.addEventListener('mouseenter', function () { if (!desktop.matches) return; cancel(); closeAll(d); setOpen(d, true); });
    d.addEventListener('mouseleave', function () { if (!desktop.matches) return; cancel(); timer = setTimeout(function () { setOpen(d, false); }, 400); });
    d.addEventListener('focusout', function (e) { if (desktop.matches && !d.contains(e.relatedTarget)) setOpen(d, false); });
  });
  document.addEventListener('click', function (e) { if (desktop.matches && !e.target.closest('[data-dd]')) closeAll(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeAll(); document.body.classList.remove('menu-open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  // New pages always open at the top (Back/Forward still returns to where you were)
  try {
    var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (!location.hash && (!nav || nav.type === 'navigate')) {
      window.scrollTo(0, 0);
      // When the site is shown inside another page's frame (like a preview viewer),
      // the outer page keeps its own scroll position; this brings the top back into view.
      if (window.top !== window.self) {
        var top = document.getElementById('page-top');
        if (top && top.scrollIntoView) top.scrollIntoView({ block: 'start' });
      }
    }
  } catch (e) {}

  // Header fit: show the "Listaso" name next to the logo whenever it fits.
  // If space is tight, first shrink "Log in" to an icon, then hide the demo button
  // on small phones, and only then show just the logo mark.
  var topBar = document.querySelector('.top');
  var desktop = window.matchMedia('(min-width: 1280px)');
  // True only when header pieces actually touch or run past the edge.
  function crowded() {
    var wrapR = topBar.querySelector('.wrap').getBoundingClientRect();
    var logo = topBar.querySelector('.logo').getBoundingClientRect();
    var right = topBar.querySelector('.top-right').getBoundingClientRect();
    if (right.right > wrapR.right + 1) return true;
    var navEl = topBar.querySelector('.nav');
    if (getComputedStyle(navEl).position !== 'fixed') {
      var items = [].slice.call(navEl.children).filter(function (e) { return getComputedStyle(e).display !== 'none'; });
      if (items.length) {
        var first = items[0].getBoundingClientRect(), last = items[items.length - 1].getBoundingClientRect();
        if (logo.right > first.left + 1 || last.right > right.left - 4) return true;
      }
    }
    return logo.right > right.left - 4;
  }
  function fit() {
    if (!topBar) return;
    // On desktop there is always room for the "Listaso" name, so only the
    // "Log in" label and nav spacing are ever squeezed there.
    var steps = desktop.matches ? ['fit-1', 'fit-2'] : ['fit-1', 'fit-2', 'fit-3'];
    ['fit-1', 'fit-2', 'fit-3'].forEach(function (c) { topBar.classList.remove(c); });
    for (var i = 0; i < steps.length && crowded(); i++) topBar.classList.add(steps[i]);
  }
  var fitQueued = false;
  function queueFit() { if (!fitQueued) { fitQueued = true; requestAnimationFrame(function () { fitQueued = false; fit(); }); } }
  fit();
  window.addEventListener('resize', queueFit);
  window.addEventListener('load', fit);
  if (document.fonts) {
    if (document.fonts.ready) document.fonts.ready.then(fit);
    if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', queueFit);
  }
  setTimeout(fit, 1500);


  // Customer reviews slider: arrows move one screenful; "1 / 2" shows where you are
  [].forEach.call(document.querySelectorAll('[data-carousel]'), function (c) {
    var track = c.querySelector('.quotes'), prev = c.querySelector('.q-prev'), next = c.querySelector('.q-next'), count = c.querySelector('.q-count');
    if (!track) return;
    function step() {
      var cards = track.children, gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var w = cards.length ? cards[0].getBoundingClientRect().width + gap : track.clientWidth;
      var per = Math.max(1, Math.round((track.clientWidth + gap) / w));
      return { w: w, per: per, total: Math.ceil(cards.length / per) };
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth, st = step();
      var page = Math.min(st.total, Math.round(track.scrollLeft / (st.w * st.per)) + 1);
      if (max > 2 && track.scrollLeft >= max - 2) page = st.total;
      if (count) count.textContent = page + ' / ' + st.total;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max - 2;
      c.querySelector('.q-nav').style.display = max <= 2 ? 'none' : '';
    }
    function go(dir) { var st = step(); track.scrollBy({ left: dir * st.w * st.per, behavior: 'smooth' }); }
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });
    var t; track.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(update, 60); });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  });

  // Monthly / yearly prices
  var bm = document.getElementById('bill-m'), by = document.getElementById('bill-y');
  if (bm && by) {
    var es = root.lang === 'es';
    function setBill(y) {
      bm.setAttribute('aria-pressed', !y); by.setAttribute('aria-pressed', y);
      document.querySelectorAll('[data-m]').forEach(function (el) {
        if (el.classList.contains('fine')) {
          var v = el.getAttribute('data-y');
          el.textContent = y ? (es ? 'Pago anual de $' + v + ' por usuario' : 'Billed $' + v + ' per user, yearly') : '';
        } else {
          el.textContent = '$' + el.getAttribute(y ? 'data-y' : 'data-m');
        }
      });
    }
    bm.addEventListener('click', function () { setBill(false); });
    by.addEventListener('click', function () { setBill(true); });
  }
})();
