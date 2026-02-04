// ============================================================================
// Animations and Scroll Effects - Instastrategix
// ============================================================================

function initAnimations() {
    if ('IntersectionObserver' in window) {

        // ============================================================================
        // Section Reveal Animation
        // ============================================================================
        const revealSections = document.querySelectorAll('.service-card, .mission-card, .audience-card, .expertise-card, .stat-item, .form-group');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealSections.forEach(section => {
            section.classList.add('reveal-animation');
            revealObserver.observe(section);
        });

        // ============================================================================
        // Staggered Animation for Service Cards
        // ============================================================================
        const serviceCards = document.querySelectorAll('.service-card, .service-detail-card');
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('animate-in'), index * 100);
                    cardsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        serviceCards.forEach(card => {
            card.classList.add('stagger-animation');
            cardsObserver.observe(card);
        });

        // ============================================================================
        // Counter Animation for Stats
        // ============================================================================
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // ============================================================================
    // Parallax Effect for Hero Section
    // ============================================================================
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            lastScroll = window.pageYOffset;
            requestAnimationFrame(() => {
                heroSection.style.transform = `translateY(${lastScroll * -0.5}px)`;
            });
        });
    }

    // ============================================================================
    // Hover Effects Enhancement
    // ============================================================================
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .service-card, .logo');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        el.addEventListener('mouseleave', () => setTimeout(() => el.style.transition = '', 300));
    });

    // ============================================================================
    // Text Animation for Hero Title
    // ============================================================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            heroTitle.appendChild(span);
            setTimeout(() => {
                span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100 + i * 50);
        });
    }

    // ============================================================================
    // Gradient Animation for Section Titles
    // ============================================================================
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const originalHTML = title.innerHTML;
        title.addEventListener('mouseenter', () => {
            title.style.background = 'linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color))';
            title.style.backgroundSize = '200% 100%';
            title.style.backgroundClip = 'text';
            title.style.webkitBackgroundClip = 'text';
            title.style.webkitTextFillColor = 'transparent';
            title.style.animation = 'gradientShift 2s ease infinite';
        });
        title.addEventListener('mouseleave', () => {
            title.style.animation = '';
            setTimeout(() => {
                title.innerHTML = originalHTML;
                title.style.background = '';
                title.style.backgroundClip = '';
                title.style.webkitBackgroundClip = '';
                title.style.webkitTextFillColor = '';
            }, 500);
        });
    });

    // ============================================================================
    // Pulse Animation for CTA Buttons
    // ============================================================================
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        if (!btn.dataset.pulseInit) {
            btn.dataset.pulseInit = 'true';
            setInterval(() => {
                btn.style.boxShadow = '0 10px 25px -5px rgba(79, 70, 229, 0.4)';
                setTimeout(() => { btn.style.boxShadow = 'var(--shadow-md)'; }, 1000);
            }, 5000);
        }
    });
}

// ============================================================================
// Counter Animation Function
// ============================================================================
function animateCounter(el) {
    const target = parseInt(el.textContent.replace(/\D/g, '')) || 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ============================================================================
const animationStyles = `
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
.reveal-animation { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal-animation.revealed { opacity: 1; transform: translateY(0); }
.stagger-animation { opacity: 0; transform: translateY(20px); }
.stagger-animation.animate-in { opacity: 1; transform: translateY(0); transition: opacity 0.5s ease, transform 0.5s ease; }
.service-card:hover .service-icon { transform: scale(1.1) rotate(5deg); }
.stat-item:hover .stat-number { transform: scale(1.1); transition: transform 0.3s ease; }
.form-group.focused .form-label { color: var(--primary-color); transform: translateY(-5px); transition: all 0.3s ease; }
.btn-primary:hover { transform: translateY(-3px) scale(1.05); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
`;
const styleSheet = document.createElement('style');
if (!document.head.querySelector('#animations-style')) {
    styleSheet.id = 'animations-style';
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initAnimations, animateCounter };
}
