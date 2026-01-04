// ============================================================================
// Animations and Scroll Effects - Instastrategix
// ============================================================================

// Initialize animations when DOM is loaded
function initAnimations() {
    // Intersection Observer for scroll animations
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
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
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
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100); // Stagger effect
                    cardsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
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
        }, {
            threshold: 0.5
        });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    // ============================================================================
    // Parallax Effect for Hero Section
    // ============================================================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // ============================================================================
    // Hover Effects Enhancement
    // ============================================================================
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .service-card, .logo');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mouseleave', function() {
            // Reset transition after hover effect completes
            setTimeout(() => {
                this.style.transition = '';
            }, 300);
        });
    });
    
    // ============================================================================
    // Text Animation for Hero Title
    // ============================================================================
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        // Split text into characters for animation
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            heroTitle.appendChild(span);
            
            // Animate each character with delay
            setTimeout(() => {
                span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100 + (i * 50));
        }
    }
    
    // ============================================================================
    // Gradient Animation for Section Titles
    // ============================================================================
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        const originalHTML = title.innerHTML;
        
        title.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color))';
            this.style.backgroundSize = '200% 100%';
            this.style.backgroundClip = 'text';
            this.style.webkitBackgroundClip = 'text';
            this.style.webkitTextFillColor = 'transparent';
            this.style.animation = 'gradientShift 2s ease infinite';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.animation = '';
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
                this.style.backgroundClip = '';
                this.style.webkitBackgroundClip = '';
                this.style.webkitTextFillColor = '';
            }, 500);
        });
    });
    
    // ============================================================================
    // Pulse Animation for CTA Buttons
    // ============================================================================
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        // Add subtle pulse animation
        setInterval(() => {
            button.style.boxShadow = '0 10px 25px -5px rgba(79, 70, 229, 0.4)';
            
            setTimeout(() => {
                button.style.boxShadow = 'var(--shadow-md)';
            }, 1000);
        }, 5000); // Pulse every 5 seconds
    });
}

// ============================================================================
// Counter Animation Function
// ============================================================================
function animateCounter(element) {
    const target = parseInt(element.textContent.replace('+', ''));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ============================================================================
// Add CSS for animations
// ============================================================================
const animationStyles = `
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .reveal-animation {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .reveal-animation.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stagger-animation {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .stagger-animation.animate-in {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .service-card:hover .service-icon {
        transform: scale(1.1) rotate(5deg);
    }
    
    .stat-item:hover .stat-number {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    
    .form-group.focused .form-label {
        color: var(--primary-color);
        transform: translateY(-5px);
        transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
        transform: translateY(-3px) scale(1.05);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

// Add animation styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// ============================================================================
// Export for use in main.js
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAnimations,
        animateCounter
    };
}
