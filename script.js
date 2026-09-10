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
