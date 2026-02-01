// ============================================================================
// Main JavaScript – InstaStrategix
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('nav-open', isOpen);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Sticky / Hide Header on Scroll
    const navbar = document.querySelector('.site-header');
    let lastScroll = 0;
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 80) {
                navbar.classList.add('navbar-scrolled');
                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
            } else {
                navbar.classList.remove('navbar-scrolled', 'navbar-hidden');
            }
            lastScroll = currentScroll;
        });
    }

    // Active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Footer year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // GSAP Hero Animation
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".hero h1 span", { y: "180%", opacity: 0, stagger: 0.3, duration: 1.8 }, 0.5)
        .from(".hero p",       { y: 100, opacity: 0, duration: 1.5 }, "-=1.3")
        .from(".btn-hero",     { y: 80, opacity: 0, scale: 0.85, duration: 1.4 }, "-=1.1");

    // Gentle video parallax (desktop only)
    if (window.innerWidth > 768) {
        gsap.to(".video-wrap video", {
            y: "6%",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=50%",
                scrub: 1.2,
                invalidateOnRefresh: true
            }
        });
    }

    // Refresh ScrollTrigger on resize
    window.addEventListener('resize', () => ScrollTrigger.refresh());
});
