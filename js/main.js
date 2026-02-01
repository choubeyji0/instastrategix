// ============================================================================
// Main JavaScript – InstaStrategix (Enhanced 2026)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            document.body.classList.toggle('nav-open');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Sticky Header
    const navbar = document.querySelector('.site-header');
    let lastScroll = 0;
    if (navbar) {
        window.addEventListener('scroll', () => {
            const current = window.pageYOffset;
            if (current > 80) {
                navbar.classList.add('navbar-scrolled');
                if (current > lastScroll && current > 200) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
            } else {
                navbar.classList.remove('navbar-scrolled', 'navbar-hidden');
            }
            lastScroll = current;
        });
    }

    // Active Nav Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // Footer Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth Scroll for # links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Scroll to Top Button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });

    // GSAP Hero Animation
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".hero h1 span", { y: "140%", opacity: 0, stagger: 0.25, duration: 1.6 }, 0.5)
        .from(".hero p", { y: 80, opacity: 0, duration: 1.3 }, "-=1.0")
        .from(".btn-hero", { y: 60, opacity: 0, scale: 0.9, duration: 1.2 }, "-=0.9");

    // Gentle Parallax on Video
    gsap.to(".video-wrap video", {
        y: "5%",
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=50%",
            scrub: true
        }
    });

    // Subtle Fade-in for Sections/Cards
    const fadeElements = document.querySelectorAll('.welcome-section, .services-preview, .social-proof, .blog-integration, .cards-grid > *, .service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // Refresh GSAP on resize
    window.addEventListener('resize', () => ScrollTrigger.refresh());
});
