// ============================================================================
// Main JavaScript – Instastrategix (ENHANCED VERSION)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION (ENHANCED)
       ========================================================================== */

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        navMenu.classList.add('active');
        menuToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('nav-open');
        menuToggle.setAttribute('aria-expanded', 'true');

        // Focus first link (accessibility)
        const firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.contains('active') ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', closeMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // ESC key closes menu
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    /* ==========================================================================
       FOOTER YEAR
       ========================================================================== */

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ==========================================================================
       SMOOTH ANCHOR SCROLL
       ========================================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    /* ==========================================================================
       FORM INPUT UX ENHANCEMENT
       ========================================================================== */

    document.querySelectorAll('.form-control').forEach(input => {
        const parent = input.closest('.form-group');

        if (input.value) parent.classList.add('focused');

        input.addEventListener('focus', () => parent.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value) parent.classList.remove('focused');
        });
    });

    /* ==========================================================================
       BUTTON RIPPLE EFFECT
       ========================================================================== */

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            setTimeout(() => ripple.remove(), 600);
        });
    });

});
