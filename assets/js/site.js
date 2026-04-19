(function () {
    'use strict';

    // ============================================
    // STARFIELD CANVAS — parallax stars + occasional shooting stars
    // ============================================
    function initStarfield() {
        const canvas = document.getElementById('starfield');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let stars = [];
        let shooting = [];
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seedStars();
        }

        function seedStars() {
            const density = Math.max(80, Math.floor((width * height) / 9000));
            stars = [];
            for (let i = 0; i < density; i++) {
                const layer = Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3;
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: layer === 1 ? Math.random() * 0.8 + 0.3 : layer === 2 ? Math.random() * 1.1 + 0.6 : Math.random() * 1.5 + 1,
                    layer,
                    speed: layer === 1 ? 0.015 : layer === 2 ? 0.04 : 0.08,
                    twinkleSpeed: Math.random() * 0.015 + 0.005,
                    twinklePhase: Math.random() * Math.PI * 2,
                    hueShift: Math.random() < 0.85 ? 0 : Math.random() < 0.5 ? 1 : 2
                });
            }
        }

        function spawnShootingStar() {
            if (prefersReducedMotion) return;
            const startX = Math.random() * width * 0.9;
            const startY = Math.random() * height * 0.4;
            shooting.push({
                x: startX,
                y: startY,
                len: Math.random() * 80 + 60,
                speed: Math.random() * 6 + 8,
                angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15),
                opacity: 1
            });
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            for (const star of stars) {
                star.twinklePhase += star.twinkleSpeed;
                const twinkle = 0.55 + Math.sin(star.twinklePhase) * 0.45;
                star.y += star.speed;
                if (star.y > height) {
                    star.y = -2;
                    star.x = Math.random() * width;
                }
                let color;
                if (star.hueShift === 1) {
                    color = `rgba(167, 139, 250, ${twinkle})`;
                } else if (star.hueShift === 2) {
                    color = `rgba(56, 189, 248, ${twinkle})`;
                } else {
                    color = `rgba(255, 255, 255, ${twinkle})`;
                }
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();

                if (star.layer === 3) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
                    ctx.fillStyle = color.replace(/[\d.]+\)$/, (twinkle * 0.12).toFixed(2) + ')');
                    ctx.fill();
                }
            }

            for (let i = shooting.length - 1; i >= 0; i--) {
                const s = shooting[i];
                const tailX = s.x - Math.cos(s.angle) * s.len;
                const tailY = s.y - Math.sin(s.angle) * s.len;
                const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
                grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
                grad.addColorStop(0.4, `rgba(167, 139, 250, ${s.opacity * 0.6})`);
                grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();

                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.012;
                if (s.opacity <= 0 || s.x > width + 200 || s.y > height + 200) {
                    shooting.splice(i, 1);
                }
            }

            requestAnimationFrame(draw);
        }

        resize();
        window.addEventListener('resize', resize);
        if (!prefersReducedMotion) {
            requestAnimationFrame(draw);
            setInterval(() => {
                if (Math.random() < 0.4) spawnShootingStar();
            }, 4500);
        } else {
            draw();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStarfield);
    } else {
        initStarfield();
    }

    // ============================================
    // PRODUCT CATALOG, GRID, MODAL
    // ============================================
    if (!window.productCatalog) return;

    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    });

    const modal = document.querySelector('[data-product-modal]');
    const modalBody = modal ? modal.querySelector('.modal__body') : null;
    const modalTitle = modal ? modal.querySelector('[data-modal-title]') : null;

    function formatCurrency(value) {
        if (typeof value !== 'number' || Number.isNaN(value)) return 'Contact for price';
        return currency.format(value);
    }

    function computeSavings(original, promo) {
        if (typeof original !== 'number' || typeof promo !== 'number') return null;
        if (original === 0) return null;
        return Math.round(((original - promo) / original) * 100);
    }

    function getPrimaryPlan(product) {
        if (!product) return null;
        if (!Array.isArray(product.plans) || product.plans.length === 0) {
            return product;
        }
        if (product.featuredPlan) {
            const match = product.plans.find((plan) => plan.id === product.featuredPlan);
            if (match) return match;
        }
        return product.plans[0];
    }

    function buildCard(product, index) {
        const primary = getPrimaryPlan(product);
        const promo = primary?.promoPrice ?? product.promoPrice;
        const original = primary?.originalPrice ?? product.originalPrice;
        const savings = computeSavings(original, promo);
        const billingLabel = primary?.billingLabel ?? product.billingLabel ?? '';

        const card = document.createElement('article');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        card.setAttribute('data-reveal', '');
        card.setAttribute('data-reveal-delay', String(Math.min(((index || 0) % 5) + 1, 5)));
        if (product.accent) {
            card.style.setProperty('--card-accent', product.accent);
        }

        card.innerHTML = `
            <div class="product-card__media" style="background-image:url('${product.image}')">
                ${product.badge ? `<span class="product-card__badge product-card__badge--accent">${product.badge}</span>` : ''}
                ${product.label ? `<span class="product-card__badge" style="right:12px; left:auto;">${product.label}</span>` : ''}
            </div>
            <div class="product-card__body">
                ${product.category ? `<span class="pill">${product.category}</span>` : ''}
                <h3>${product.name}</h3>
                <p>${product.summary || product.description || ''}</p>
                ${promo
                ? `<div class="product-price">
                        <span class="product-price__promo">${formatCurrency(promo)}</span>
                        ${billingLabel ? `<span class="product-price__period">${billingLabel}</span>` : ''}
                        ${original ? `<span class="product-price__retail">${formatCurrency(original)}</span>` : ''}
                    </div>`
                : ''}
                ${savings ? `<span class="pill pill--success">Save ${savings}%</span>` : ''}
            </div>
            <div class="product-card__footer">
                <button class="btn" type="button">${product.cta || 'View details'} <i class="fas fa-arrow-right" aria-hidden="true"></i></button>
            </div>
        `;

        const handler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            openProductModal(product.id);
        };
        card.addEventListener('click', handler);

        return card;
    }

    function renderGrid(grid) {
        if (!grid) return;
        const listId = grid.dataset.products;
        let ids;

        if (!listId || listId === 'all') {
            ids = window.fullCatalogOrder ?? Object.keys(window.productCatalog);
        } else if (listId === 'featured') {
            ids = window.featuredProductIds;
        } else {
            ids = listId.split(',').map((id) => id.trim()).filter(Boolean);
        }

        const fragment = document.createDocumentFragment();
        ids.forEach((id, index) => {
            const product = window.productCatalog[id];
            if (!product) return;
            const card = buildCard(product, index);
            fragment.appendChild(card);
        });

        grid.innerHTML = '';
        grid.appendChild(fragment);
        observeReveal(grid);
    }

    function buildPlanMarkup(product) {
        if (!product.plans || product.plans.length === 0) return '';
        return `
            <div class="modal-plans">
                ${product.plans
                    .map(
                        (plan) => `
                        <div class="plan-card">
                            <strong>${plan.label}</strong>
                            <span class="plan-card__desc">${plan.description || ''}</span>
                            <div class="product-price">
                                <span class="product-price__promo">${formatCurrency(plan.promoPrice)}</span>
                                ${plan.billingLabel ? `<span class="product-price__period">${plan.billingLabel}</span>` : ''}
                                ${plan.originalPrice ? `<span class="product-price__retail">${formatCurrency(plan.originalPrice)}</span>` : ''}
                            </div>
                            ${computeSavings(plan.originalPrice, plan.promoPrice) ? `<span class="pill pill--success" style="margin-top:0.6rem;">Save ${computeSavings(plan.originalPrice, plan.promoPrice)}%</span>` : ''}
                        </div>
                    `
                    )
                    .join('')}
            </div>
        `;
    }

    function buildComparisonMarkup(comparison) {
        if (!Array.isArray(comparison) || comparison.length === 0) return '';
        const rows = comparison
            .map(
                (row) => {
                    const savings = computeSavings(row.retail, row.ours);
                    return `
                <div class="comparison__row">
                    <div>
                        <small>${row.label}</small>
                    </div>
                    <div>
                        <small>Normal</small>
                        <strong class="retail-price">${formatCurrency(row.retail)}</strong>
                    </div>
                    <div>
                        <small>You pay</small>
                        <strong class="ours-price">${formatCurrency(row.ours)}${savings ? ` <span style="font-size:0.7rem; color:var(--success); font-weight:600;">(-${savings}%)</span>` : ''}</strong>
                    </div>
                </div>
            `;
                }
            )
            .join('');
        return `
            <div class="comparison">
                <div class="comparison__header"><i class="fas fa-bolt" aria-hidden="true"></i> Real savings vs. retail</div>
                ${rows}
            </div>
        `;
    }

    function openProductModal(productId) {
        if (!modal || !modalBody || !modalTitle) return;
        const product = window.productCatalog[productId];
        if (!product) return;

        const primary = getPrimaryPlan(product);
        const promo = primary?.promoPrice ?? product.promoPrice;
        const original = primary?.originalPrice ?? product.originalPrice;
        const billingLabel = primary?.billingLabel ?? product.billingLabel ?? '';
        const savings = computeSavings(original, promo);

        modalTitle.textContent = product.name;

        modalBody.innerHTML = `
            <div class="modal-product">
                <div class="modal-product__media" style="background-image:url('${product.image}')"></div>
                <div class="modal-product__content">
                    ${product.category ? `<span class="pill">${product.category}</span>` : ''}
                    <h3>${product.name}</h3>
                    <p>${product.description || product.summary || ''}</p>
                    ${promo
                ? `<div class="product-price" style="margin:1.1rem 0 0.5rem;">
                            <span class="product-price__promo">${formatCurrency(promo)}</span>
                            ${billingLabel ? `<span class="product-price__period">${billingLabel}</span>` : ''}
                            ${original ? `<span class="product-price__retail">${formatCurrency(original)}</span>` : ''}
                        </div>`
                : ''}
                    ${savings ? `<span class="pill pill--success">You save ${savings}%</span>` : ''}
                    ${product.features && product.features.length
                ? `<ul class="modal-features">
                            ${product.features.map((feature) => `<li>${feature}</li>`).join('')}
                        </ul>`
                : ''}
                </div>
            </div>
            ${product.plans && product.plans.length > 1 ? `
                <div style="margin-top:1.6rem;">
                    <small style="display:block; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-muted); font-size:0.75rem; font-weight:600; margin-bottom:0.6rem;">Choose your plan</small>
                    ${buildPlanMarkup(product)}
                </div>` : ''}
            ${product.comparison ? buildComparisonMarkup(product.comparison) : ''}
            ${product.note ? `<div class="modal-note"><i class="fas fa-info-circle"></i><span>${product.note}</span></div>` : ''}
            <div class="modal-actions">
                <a class="btn" href="${window.contactEndpoints.discord}" target="_blank" rel="noreferrer">
                    <i class="fab fa-discord" aria-hidden="true"></i> Open a Discord ticket
                </a>
                <a class="btn btn--ghost" href="${window.contactEndpoints.telegram}" target="_blank" rel="noreferrer">
                    <i class="fab fa-telegram-plane" aria-hidden="true"></i> Telegram DM
                </a>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalBody.scrollTop = 0;
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function setupModalListeners() {
        if (!modal) return;
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        modal.querySelectorAll('[data-close-modal]').forEach((button) =>
            button.addEventListener('click', closeModal)
        );

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ============================================
    // ACTIVE NAV + MOBILE MENU
    // ============================================
    function normalizePath(input) {
        if (!input) return '';
        let value = input.split('#')[0].split('?')[0];
        value = value.replace(/index\.html$/, '');
        value = value.replace(/\/+$/, '');
        if (value === '' || value === '/') return '';
        return value;
    }

    function highlightActiveNav() {
        const path = normalizePath(window.location.pathname);
        document.querySelectorAll('[data-nav] a').forEach((link) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#')) return;
            const normalized = href === '/' ? '' : normalizePath(href.replace(/\.html$/, ''));
            if (normalized === path) {
                link.classList.add('active');
            }
        });
    }

    function setupMobileNav() {
        const toggle = document.querySelector('[data-nav-toggle]');
        const links = document.querySelector('.nav__links');
        if (!toggle || !links) return;

        toggle.addEventListener('click', () => {
            const open = links.classList.toggle('nav__links--open');
            document.body.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });

        links.querySelectorAll('a').forEach((link) =>
            link.addEventListener('click', () => {
                links.classList.remove('nav__links--open');
                document.body.classList.remove('nav-open');
            })
        );
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    function setupFaq() {
        document.querySelectorAll('[data-faq]').forEach((card) => {
            const question = card.querySelector('.faq-card__q');
            if (!question) return;
            question.addEventListener('click', () => {
                const isOpen = card.classList.contains('open');
                document.querySelectorAll('[data-faq].open').forEach((c) => c.classList.remove('open'));
                if (!isOpen) card.classList.add('open');
            });
        });
    }

    // ============================================
    // SCROLL REVEAL
    // ============================================
    function observeReveal(scope) {
        if (!('IntersectionObserver' in window)) {
            (scope || document).querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        (scope || document).querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
    }

    // ============================================
    // PRICING PAGE FILTERS
    // ============================================
    function setupFilters() {
        const filterBar = document.querySelector('[data-filter-bar]');
        const grid = document.querySelector('[data-filterable]');
        if (!filterBar || !grid) return;

        filterBar.addEventListener('click', (event) => {
            const chip = event.target.closest('.filter-chip');
            if (!chip) return;
            filterBar.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
            chip.classList.add('active');
            const filter = chip.dataset.filter;

            const ids = filter === 'all'
                ? (window.fullCatalogOrder || Object.keys(window.productCatalog))
                : (window.catalogCategories || []).find((c) => c.id === filter)?.ids || [];

            grid.dataset.products = ids.join(',');
            renderGrid(grid);
        });
    }

    // ============================================
    // BOOT
    // ============================================
    function boot() {
        document.querySelectorAll('[data-product-grid]').forEach(renderGrid);
        setupModalListeners();
        highlightActiveNav();
        setupMobileNav();
        setupFaq();
        setupFilters();
        observeReveal();
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    window.openProductModal = openProductModal;
})();
