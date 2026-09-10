// ══════════════════════════════════════════════
// Scroll Animations (Intersection Observer)
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // ══════════════════════════════════════════════
    // Blob Parallax Effect
    // ══════════════════════════════════════════════
    const blob = document.querySelector('.blob-main');
    if (blob) {
        document.addEventListener('mousemove', (e) => {
            if (typeof gsap !== 'undefined') {
                const x = (e.clientX / window.innerWidth - 0.5) * 40; // Max 20px movement
                const y = (e.clientY / window.innerHeight - 0.5) * 40;
                
                gsap.to(blob, {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        });
    }

    // ══════════════════════════════════════════════
    // Navbar scroll effect
    // ══════════════════════════════════════════════
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ══════════════════════════════════════════════
    // Smooth scroll for anchor links
    // ══════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ══════════════════════════════════════════════
    // Active nav link highlighting on scroll
    // ══════════════════════════════════════════════
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active-link');
            }
        });
    });

    // ══════════════════════════════════════════════
    // Mobile menu toggle
    // ══════════════════════════════════════════════
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinksEl = document.querySelector('.nav-links');
    const navActionsEl = document.querySelector('.nav-actions');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinksEl.classList.toggle('mobile-open');
            navActionsEl.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');
        });
    }
});

/* ══════════════════════════════════════════════ */
/* VIDEO EXPANSION ANIMATION (GSAP + ScrollTrigger) */
/* ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    // Only run if GSAP is loaded and the section exists
    if (typeof gsap !== 'undefined' && document.querySelector('.video-expansion-section')) {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".video-expansion-section",
                start: "top top",
                end: "+=150%", // Scroll distance for the pinning
                scrub: 1, // Smooth scrubbing
                pin: true,
            }
        });

        // 1. Draw the flowing wire
        // Initial state is dashed out, we animate it to 0
        tl.to(".flowing-wire", {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power1.inOut"
        }, 0);

        // 2. Expand and morph the video wrapper using polygon clip-path
        // The wrapper is full screen, we are just animating the mask.
        
        // Step A: Top right corner gets pulled aggressively to the right and up.
        // Bottom right corner lags behind. Left side stays anchored.
        tl.to(".video-wrapper", {
            clipPath: "polygon(10% 25%, 80% 5%, 55% 85%, 10% 75%)",
            duration: 0.8,
            ease: "power2.out" // Fast pull
        }, 0);

        // Step B: The rest of the shape catches up and it fills the entire screen
        tl.to(".video-wrapper", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "power2.inOut"
        }, 0.8);

        // 3. Fade in the "PLAY REEL" text at the end of the expansion
        tl.to(".video-overlay-text", {
            opacity: 1,
            duration: 0.5
        }, 1.5);
    }
});
