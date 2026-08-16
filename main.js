document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, .service-card');

    // Only run on desktop/devices with a mouse
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Fast custom cursor
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
            
            // Slower follower
            setTimeout(() => {
                cursorFollower.style.left = x + 'px';
                cursorFollower.style.top = y + 'px';
            }, 80);
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                cursorFollower.classList.add('hovered');
            });
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                cursorFollower.classList.remove('hovered');
            });
        });
    } else {
        // Hide custom cursors on touch devices
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto'; // Restore default
    }

    // --- Sticky Navbar Logic ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Simple Scroll Animation (Fade In) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .project-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        observer.observe(el);
    });
});
