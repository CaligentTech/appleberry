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

    // ══════════════════════════════════════════════
    // AJAX Form Submission (Formspree)
    // ══════════════════════════════════════════════
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            const data = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = '<div class="status-message success">Thanks for reaching out! We will get back to you shortly.</div>';
                    contactForm.reset();
                } else {
                    const responseData = await response.json();
                    if (responseData.hasOwnProperty('errors')) {
                        formStatus.innerHTML = '<div class="status-message error">' + responseData.errors.map(error => error.message).join(', ') + '</div>';
                    } else {
                        formStatus.innerHTML = '<div class="status-message error">Oops! There was a problem submitting your form.</div>';
                    }
                }
            } catch (error) {
                formStatus.innerHTML = '<div class="status-message error">Oops! There was a problem submitting your form.</div>';
            }

            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Clear message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
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
                end: "+=150%", // Scrub over the 150vh sticky distance
                scrub: 1 // Smooth scrubbing
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
        tl.to("#video-mask-path", {
            attr: { d: "M 0.1500,0.3000 C 0.1500,0.2700 0.1693,0.2448 0.1983,0.2371 L 0.8017,0.0629 C 0.8307,0.0552 0.8430,0.0687 0.8324,0.0968 L 0.5676,0.8032 C 0.5570,0.8313 0.5305,0.8457 0.5012,0.8392 L 0.1988,0.7608 C 0.1695,0.7543 0.1500,0.7300 0.1500,0.7000 L 0.1500,0.3000 Z" },
            duration: 0.8,
            ease: "power2.out"
        }, 0);

        // Step B: The rest catches up and settles into a framed rectangle with margins
        tl.to("#video-mask-path", {
            attr: { d: "M 0.0400,0.1700 C 0.0400,0.1400 0.0600,0.1200 0.0900,0.1200 L 0.9100,0.1200 C 0.9400,0.1200 0.9600,0.1400 0.9600,0.1700 L 0.9600,0.8300 C 0.9600,0.8600 0.9400,0.8800 0.9100,0.8800 L 0.0900,0.8800 C 0.0600,0.8800 0.0400,0.8600 0.0400,0.8300 L 0.0400,0.1700 Z" },
            duration: 1.2,
            ease: "power2.inOut"
        }, 0.8);
    }
});
