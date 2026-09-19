// ══════════════════════════════════════════════
// Window Load (Hide Loader with artificial delay)
// ══════════════════════════════════════════════
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
        }, 800); // 800ms artificial delay so it's visible locally
    }
});

// ══════════════════════════════════════════════
// Scroll Animations (Intersection Observer)
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

    // Massive Text Load Animation
    if (typeof gsap !== 'undefined') {
        gsap.from(".text-appleberry", {
            x: 200,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });
        gsap.from(".text-solutions", {
            x: -200,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.3
        });
        gsap.from(".text-lets-grow", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.8
        });
    }





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
    const blobWrapper = document.querySelector('.floating-elements');
    if (blobWrapper) {
        document.addEventListener('mousemove', (e) => {
            if (typeof gsap !== 'undefined') {
                const x = (e.clientX / window.innerWidth - 0.5) * 100; // Increased movement
                const y = (e.clientY / window.innerHeight - 0.5) * 100;

                gsap.to(blobWrapper, {
                    x: x,
                    y: y,
                    duration: 1.5,
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
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navLinksEl.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // ══════════════════════════════════════════════
    // Mobile dropdown toggle (Double tap to go)
    // ══════════════════════════════════════════════
    const dropdownToggles = document.querySelectorAll('.nav-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                const parent = this.parentElement;
                if (!parent.classList.contains('mobile-open')) {
                    e.preventDefault(); // Stop navigation on first tap
                    parent.classList.add('mobile-open'); // Open dropdown
                }
            }
        });
    });

    // ══════════════════════════════════════════════
    // Close mobile menu on regular link click
    // ══════════════════════════════════════════════
    const navItems = document.querySelectorAll('.nav-links a:not(.nav-dropdown > a)');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                if (navLinksEl && navLinksEl.classList.contains('active')) {
                    navLinksEl.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    
                    document.querySelectorAll('.nav-dropdown.mobile-open').forEach(dropdown => {
                        dropdown.classList.remove('mobile-open');
                    });
                }
            }
        });
    });

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
/* TYPOGRAPHY WIRE ANIMATION (GSAP + ScrollTrigger) */
/* ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && document.querySelector('.typography-section')) {
        gsap.registerPlugin(ScrollTrigger);
        
        ScrollTrigger.create({
            trigger: ".typography-section",
            start: "top 60%", // Trigger when section is in view
            once: true,
            onEnter: () => {
                // Text Split Reveal Animation
                gsap.fromTo(".top-line", 
                    { y: "100%", x: 0 }, 
                    { y: "0%", duration: 0.6, ease: "power3.out" }
                );
                gsap.fromTo(".bottom-line", 
                    { y: "-100%" }, 
                    { y: "0%", duration: 0.6, ease: "power3.out" }
                );

                // Left Align Animation
                const topText = document.querySelector('.top-line');
                const bottomText = document.querySelector('.bottom-line');
                if (topText && bottomText) {
                    const diff = (bottomText.offsetWidth - topText.offsetWidth) / 2;
                    gsap.to(".top-line", {
                        x: -diff,
                        duration: 0.5,
                        delay: 0.4, // Starts while reveal is finishing
                        ease: "power2.out"
                    });
                }

                // Wire Animation
                gsap.to(".typo-wire", {
                    strokeDashoffset: 0,
                    duration: 3.5,
                    ease: "power2.out",
                    delay: 0.1
                });
            }
        });
    }


});

// ══════════════════════════════════════════════
// Scroll to Top Button Logic
// ══════════════════════════════════════════════
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
