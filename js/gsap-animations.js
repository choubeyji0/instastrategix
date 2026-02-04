gsap.registerPlugin(ScrollTrigger, TextPlugin);
gsap.defaults({ ease: "none" });

// Hero Reveal
gsap.timeline()
    .to(".hero-title", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
    .to(".hero-subtitle", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .to(".hero-description", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .to(".hero-buttons .btn", { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }, "-=0.6");

// Section Staggers
document.querySelectorAll(".section-padding").forEach(section => {
    gsap.from(section.children, {
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
        opacity: 0, y: 60, stagger: 0.2, duration: 1, ease: "power3.out"
    });
});

// Card Hover
document.querySelectorAll(".info-card, .service-card").forEach(card => {
    const tl = gsap.timeline({ paused: true });
    tl.to(card, { y: -20, scale: 1.05, boxShadow: "0 30px 60px rgba(120,110,87,0.3)", duration: 0.5 })
      .to(card.querySelector(".card-icon, .service-icon i"), { scale: 1.25, rotation: 10, color: "#9b8a6b", duration: 0.5 }, 0);
    card.addEventListener("mouseenter", () => tl.play());
    card.addEventListener("mouseleave", () => tl.reverse());
});

// Button Pulse
gsap.to(".btn-primary", { boxShadow: "0 0 0 0 rgba(120,110,87,0.4)", repeat: -1, duration: 2, yoyo: true });

// OPTIMIZED PARALLAX
gsap.utils.toArray(".parallax-layer").forEach(layer => {
    const speed = layer.classList.contains("parallax-bg") ? 0.25 : 0.4;
    gsap.to(layer, {
        yPercent: speed * 100,
        force3D: true,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true
        }
    });
});

gsap.to("#particles-canvas", {
    yPercent: -25,
    force3D: true,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1, invalidateOnRefresh: true }
});

gsap.to(".hero-content", {
    yPercent: -45,
    force3D: true,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true }
});

ScrollTrigger.batch(".info-card, .service-card", {
    onEnter: batch => gsap.to(batch, { yPercent: -25, force3D: true, duration: 1.2, ease: "power2.out", stagger: 0.1 }),
    onLeave: batch => gsap.to(batch, { yPercent: 0, force3D: true, duration: 0.8 }),
    onEnterBack: batch => gsap.to(batch, { yPercent: -25, force3D: true, duration: 1 }),
    onLeaveBack: batch => gsap.to(batch, { yPercent: 0, force3D: true, duration: 0.8 }),
    start: "top 90%",
    end: "bottom 10%",
    scrub: 1,
    invalidateOnRefresh: true
});

document.querySelectorAll(".section-title").forEach(title => {
    gsap.to(title, {
        yPercent: -35,
        force3D: true,
        scrollTrigger: { trigger: title, start: "top bottom", end: "bottom top", scrub: 1 }
    });
});

// Mobile guard
if (window.innerWidth <= 768) {
    ScrollTrigger.getAll().forEach(st => { if (st.vars.scrub) st.vars.scrub = 1.5; });
    ScrollTrigger.refresh();
}
