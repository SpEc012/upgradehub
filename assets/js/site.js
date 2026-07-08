/* ============================================================
   Upgrade Hub — site behaviour
   Theme toggle · nav · catalog search/filter/sort · product
   modal with plan selector · FAQ · scroll reveal
   ============================================================ */
(function () {
    'use strict';

    var catalog = window.productCatalog || {};
    var icons = window.brandIcons || {};
    var contacts = window.contactEndpoints || {};

    var currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    });

    function money(value) {
        if (typeof value !== 'number' || isNaN(value)) return '—';
        return currency.format(value).replace(/\.00$/, '');
    }

    function savings(original, promo) {
        if (typeof original !== 'number' || typeof promo !== 'number' || original <= 0) return null;
        return Math.round(((original - promo) / original) * 100);
    }

    function primaryPlan(product) {
        if (!product || !product.plans || !product.plans.length) return null;
        if (product.featuredPlan) {
            for (var i = 0; i < product.plans.length; i++) {
                if (product.plans[i].id === product.featuredPlan) return product.plans[i];
            }
        }
        return product.plans[0];
    }

    function brandIcon(product, size) {
        var inner = icons[product.icon] || '';
        return '<span class="brand-tile" style="--brand:' + product.accent + '">' +
            '<svg viewBox="0 0 24 24" width="' + (size || 22) + '" height="' + (size || 22) + '" fill="currentColor" aria-hidden="true">' + inner + '</svg>' +
            '</span>';
    }

    /* ---------------- starfield (subtle, dark theme only) ---------------- */
    function initStars() {
        var canvas = document.querySelector('[data-stars]');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var stars = [];
        var meteors = [];
        var width = 0;
        var height = 0;
        var running = false;
        var meteorTimer = 0;

        function resize() {
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
            if (!running) draw(true);
        }

        function seed() {
            var count = Math.min(110, Math.floor((width * height) / 16000));
            stars = [];
            for (var i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 1.1 + 0.3,
                    tint: Math.random() < 0.12 ? '167,139,250' : '235,238,255',
                    phase: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.008 + 0.003
                });
            }
        }

        function spawnMeteor() {
            meteors.push({
                x: Math.random() * width * 0.8 + width * 0.1,
                y: Math.random() * height * 0.3,
                len: Math.random() * 70 + 50,
                speed: Math.random() * 4 + 6,
                angle: Math.PI * 0.78,
                life: 1
            });
        }

        function draw(once) {
            ctx.clearRect(0, 0, width, height);

            for (var i = 0; i < stars.length; i++) {
                var s = stars[i];
                s.phase += s.speed;
                var a = 0.22 + (Math.sin(s.phase) + 1) * 0.2; // 0.22–0.62
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + s.tint + ',' + a.toFixed(2) + ')';
                ctx.fill();
            }

            for (var m = meteors.length - 1; m >= 0; m--) {
                var t = meteors[m];
                var tx = t.x - Math.cos(t.angle) * t.len;
                var ty = t.y - Math.sin(t.angle) * t.len;
                var grad = ctx.createLinearGradient(t.x, t.y, tx, ty);
                grad.addColorStop(0, 'rgba(235,238,255,' + (t.life * 0.7).toFixed(2) + ')');
                grad.addColorStop(1, 'rgba(124,92,255,0)');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.moveTo(t.x, t.y);
                ctx.lineTo(tx, ty);
                ctx.stroke();
                t.x += Math.cos(t.angle) * t.speed;
                t.y += Math.sin(t.angle) * t.speed;
                t.life -= 0.014;
                if (t.life <= 0 || t.y > height + 100) meteors.splice(m, 1);
            }

            // one shooting star roughly every 9–16 seconds
            meteorTimer++;
            if (meteorTimer > 540 + Math.random() * 420) {
                meteorTimer = 0;
                spawnMeteor();
            }

            if (!once && running) requestAnimationFrame(function () { draw(false); });
        }

        resize();
        window.addEventListener('resize', resize);

        if (!reduced) {
            running = true;
            requestAnimationFrame(function () { draw(false); });
        }
    }

    /* ---------------- theme ---------------- */
    function initTheme() {
        var stored = null;
        try { stored = localStorage.getItem('uh-theme'); } catch (e) { /* private mode */ }
        var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', theme);

        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                try { localStorage.setItem('uh-theme', next); } catch (e) { /* ignore */ }
            });
        });
    }

    /* ---------------- header + mobile nav ---------------- */
    function initNav() {
        var header = document.querySelector('[data-header]');
        if (header) {
            var onScroll = function () {
                header.classList.toggle('is-scrolled', window.scrollY > 8);
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        var toggle = document.querySelector('[data-nav-toggle]');
        var menu = document.querySelector('[data-nav-menu]');
        if (toggle && menu) {
            toggle.addEventListener('click', function () {
                var open = menu.classList.toggle('is-open');
                toggle.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', String(open));
            });
            menu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    menu.classList.remove('is-open');
                    toggle.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // highlight current page
        var path = window.location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
        document.querySelectorAll('[data-nav-menu] a').forEach(function (link) {
            var href = (link.getAttribute('href') || '').split('#')[0];
            if (!href) return;
            var normalized = href.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
            if (normalized === path || (path.indexOf('/pricing') === 0 && normalized.indexOf('/pricing') === 0)) {
                link.classList.add('is-active');
            }
        });
    }

    /* ---------------- product cards ---------------- */
    function cardTemplate(product) {
        var plan = primaryPlan(product);
        var pct = plan ? savings(plan.originalPrice, plan.promoPrice) : null;
        var multi = product.plans && product.plans.length > 1;

        return '' +
            '<div class="card__top">' +
                brandIcon(product, 22) +
                (pct ? '<span class="chip chip--save">−' + pct + '%</span>' : '') +
            '</div>' +
            '<h3 class="card__name">' + product.name + '</h3>' +
            '<p class="card__tagline">' + (product.tagline || '') + '</p>' +
            '<p class="card__summary">' + (product.summary || '') + '</p>' +
            '<div class="card__price">' +
                (plan ? (
                    (multi ? '<span class="card__from">from</span>' : '') +
                    '<strong>' + money(plan.promoPrice) + '</strong>' +
                    '<span class="card__period">' + (plan.billingLabel || '') + '</span>' +
                    (plan.originalPrice ? '<s>' + money(plan.originalPrice) + '</s>' : '')
                ) : '') +
            '</div>' +
            '<span class="card__cta">View plans' +
                '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>' +
            '</span>';
    }

    function buildCard(product, index) {
        var card = document.createElement('button');
        card.type = 'button';
        card.className = 'card';
        card.style.setProperty('--brand', product.accent);
        card.setAttribute('data-reveal', '');
        card.style.transitionDelay = (Math.min(index % 6, 5) * 40) + 'ms';
        card.innerHTML = cardTemplate(product);
        card.addEventListener('click', function () { openModal(product.id, card); });
        return card;
    }

    /* ---------------- catalog (grid + search + filter + sort) ---------------- */
    function getMinPrice(product) {
        var plan = primaryPlan(product);
        return plan ? plan.promoPrice : Infinity;
    }

    function getMaxSavings(product) {
        var best = 0;
        (product.plans || []).forEach(function (p) {
            var pct = savings(p.originalPrice, p.promoPrice);
            if (pct && pct > best) best = pct;
        });
        return best;
    }

    function initGrid(grid) {
        var mode = grid.getAttribute('data-products') || 'all';
        var searchInput = document.querySelector('[data-search]');
        var filterBar = document.querySelector('[data-filter-bar]');
        var sortSelect = document.querySelector('[data-sort]');
        var countEl = document.querySelector('[data-count]');
        var emptyEl = document.querySelector('[data-empty]');

        var state = { query: '', category: 'all', sort: 'featured' };

        function ids() {
            if (mode === 'featured') return window.featuredProductIds || [];
            return window.fullCatalogOrder || Object.keys(catalog);
        }

        function render() {
            var list = ids().map(function (id) { return catalog[id]; }).filter(Boolean);

            if (state.category !== 'all') {
                list = list.filter(function (p) { return p.category === state.category; });
            }
            if (state.query) {
                var q = state.query.toLowerCase();
                list = list.filter(function (p) {
                    return (p.name + ' ' + (p.tagline || '') + ' ' + (p.summary || '') + ' ' + (p.categoryLabel || ''))
                        .toLowerCase().indexOf(q) !== -1;
                });
            }
            if (state.sort === 'price-asc') {
                list.sort(function (a, b) { return getMinPrice(a) - getMinPrice(b); });
            } else if (state.sort === 'price-desc') {
                list.sort(function (a, b) { return getMinPrice(b) - getMinPrice(a); });
            } else if (state.sort === 'savings') {
                list.sort(function (a, b) { return getMaxSavings(b) - getMaxSavings(a); });
            }

            grid.innerHTML = '';
            var frag = document.createDocumentFragment();
            list.forEach(function (p, i) { frag.appendChild(buildCard(p, i)); });
            grid.appendChild(frag);
            observeReveal(grid);

            if (countEl) countEl.textContent = list.length + (list.length === 1 ? ' product' : ' products');
            if (emptyEl) emptyEl.hidden = list.length !== 0;
        }

        if (searchInput) {
            searchInput.addEventListener('input', function () {
                state.query = searchInput.value.trim();
                render();
            });
        }
        if (filterBar) {
            filterBar.addEventListener('click', function (event) {
                var chip = event.target.closest('[data-filter]');
                if (!chip) return;
                filterBar.querySelectorAll('[data-filter]').forEach(function (c) {
                    c.classList.remove('is-active');
                    c.setAttribute('aria-pressed', 'false');
                });
                chip.classList.add('is-active');
                chip.setAttribute('aria-pressed', 'true');
                state.category = chip.getAttribute('data-filter');
                render();
            });
        }
        if (sortSelect) {
            sortSelect.addEventListener('change', function () {
                state.sort = sortSelect.value;
                render();
            });
        }

        render();
    }

    /* ---------------- product modal ---------------- */
    var modal = document.querySelector('[data-modal]');
    var modalBody = modal ? modal.querySelector('[data-modal-body]') : null;
    var lastFocused = null;

    function planRow(product, plan, checked) {
        var pct = savings(plan.originalPrice, plan.promoPrice);
        return '' +
            '<label class="plan' + (checked ? ' is-selected' : '') + '">' +
                '<input type="radio" name="plan" value="' + plan.id + '"' + (checked ? ' checked' : '') + '>' +
                '<span class="plan__radio" aria-hidden="true"></span>' +
                '<span class="plan__info">' +
                    '<span class="plan__label">' + plan.label + '</span>' +
                    '<span class="plan__desc">' + (plan.description || '') + '</span>' +
                '</span>' +
                '<span class="plan__price">' +
                    '<strong>' + money(plan.promoPrice) + '</strong>' +
                    (plan.originalPrice ? '<s>' + money(plan.originalPrice) + '</s>' : '') +
                    (pct ? '<em>−' + pct + '%</em>' : '') +
                '</span>' +
            '</label>';
    }

    function openModal(productId, trigger) {
        if (!modal || !modalBody) return;
        var product = catalog[productId];
        if (!product) return;
        lastFocused = trigger || document.activeElement;

        var featured = primaryPlan(product);
        var plansHtml = product.plans.map(function (plan) {
            return planRow(product, plan, featured && plan.id === featured.id);
        }).join('');

        modalBody.innerHTML = '' +
            '<div class="modal__brand" style="--brand:' + product.accent + '">' +
                brandIcon(product, 26) +
                '<div>' +
                    '<h3 class="modal__name" id="modal-title">' + product.name + '</h3>' +
                    '<p class="modal__tagline">' + (product.tagline || '') + '</p>' +
                '</div>' +
            '</div>' +
            '<p class="modal__desc">' + (product.description || product.summary || '') + '</p>' +
            '<div class="modal__section-label">' + (product.plans.length > 1 ? 'Choose a plan' : 'Plan') + '</div>' +
            '<div class="modal__plans" data-plans>' + plansHtml + '</div>' +
            '<div class="modal__section-label">What you get</div>' +
            '<ul class="modal__features">' +
                (product.features || []).map(function (f) {
                    return '<li><svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg>' + f + '</li>';
                }).join('') +
            '</ul>' +
            '<div class="modal__actions">' +
                '<a class="btn btn--primary" data-order href="' + contacts.discord + '" target="_blank" rel="noreferrer">' +
                    '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">' + icons.discord + '</svg>' +
                    '<span>Order on Discord</span>' +
                '</a>' +
                '<a class="btn btn--ghost" href="' + contacts.telegram + '" target="_blank" rel="noreferrer">' +
                    '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">' + icons.telegram + '</svg>' +
                    '<span>Telegram DM</span>' +
                '</a>' +
            '</div>' +
            '<p class="modal__note">Open a ticket, mention <strong>' + product.name + '</strong> and the plan you picked — average response time is under 5 minutes.</p>';

        var plansWrap = modalBody.querySelector('[data-plans]');
        if (plansWrap) {
            plansWrap.addEventListener('change', function (event) {
                if (event.target.name !== 'plan') return;
                plansWrap.querySelectorAll('.plan').forEach(function (row) {
                    row.classList.toggle('is-selected', row.querySelector('input').checked);
                });
            });
        }

        modal.classList.add('is-open');
        modal.removeAttribute('hidden');
        document.body.classList.add('modal-open');
        var closeBtn = modal.querySelector('[data-modal-close]');
        if (closeBtn) closeBtn.focus();
        modal.querySelector('.modal__panel').scrollTop = 0;
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('hidden', '');
        document.body.classList.remove('modal-open');
        if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function initModal() {
        if (!modal) return;
        modal.addEventListener('click', function (event) {
            if (event.target === modal || event.target.closest('[data-modal-close]')) closeModal();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
    }

    /* ---------------- FAQ accordion ---------------- */
    function initFaq() {
        document.querySelectorAll('[data-faq]').forEach(function (item) {
            var btn = item.querySelector('.faq__q');
            var answer = item.querySelector('.faq__a');
            if (!btn || !answer) return;
            btn.addEventListener('click', function () {
                var isOpen = item.classList.contains('is-open');
                document.querySelectorAll('[data-faq].is-open').forEach(function (other) {
                    other.classList.remove('is-open');
                    other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
                    other.querySelector('.faq__a').style.maxHeight = '';
                });
                if (!isOpen) {
                    item.classList.add('is-open');
                    btn.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    /* ---------------- scroll reveal ---------------- */
    var revealObserver = null;

    function observeReveal(scope) {
        var els = (scope || document).querySelectorAll('[data-reveal]:not(.is-visible)');
        if (!('IntersectionObserver' in window) ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            els.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }
        if (!revealObserver) {
            revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        }
        els.forEach(function (el) { revealObserver.observe(el); });
    }

    /* ---------------- back to top ---------------- */
    function initBackToTop() {
        var btn = document.querySelector('[data-back-to-top]');
        if (!btn) return;
        window.addEventListener('scroll', function () {
            btn.classList.toggle('is-visible', window.scrollY > 600);
        }, { passive: true });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------------- boot ---------------- */
    function boot() {
        initStars();
        initTheme();
        initNav();
        initModal();
        initFaq();
        initBackToTop();
        document.querySelectorAll('[data-product-grid]').forEach(initGrid);
        observeReveal();
        var year = document.getElementById('year');
        if (year) year.textContent = new Date().getFullYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    window.openProductModal = openModal;
})();
