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

    // --- Sticky Navbar & Mobile Menu Logic ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinksList = document.querySelectorAll('.nav-link');
    
    // Toggle Mobile Menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

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

    // --- Hero Canvas Scroll Animation ---
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
        const context = canvas.getContext("2d");
        const frameCount = 103;
        const currentFrame = index => (
            `images/handshake/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
        );

        const images = [];
        
        // Preload all images
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        const renderImage = (image) => {
            if (!image || !image.complete) return;
            // Calculate the scale to cover the whole canvas (object-fit: cover equivalent)
            const scale = Math.max(canvas.width / image.width, canvas.height / image.height);

            // Calculate the centered position
            const x = (canvas.width / 2) - (image.width / 2) * scale;
            const y = (canvas.height / 2) - (image.height / 2) * scale;

            // Clear canvas before drawing
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw image centered and scaled to cover
            context.drawImage(image, x, y, image.width * scale, image.height * scale);
        };

        const updateImage = index => {
            const nextImage = images[index];
            if (nextImage && nextImage.complete) {
                renderImage(nextImage);
            } else if (nextImage) {
                nextImage.onload = () => renderImage(nextImage);
            }
        };

        // Initialize the first frame
        images[0].onload = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderImage(images[0]);
        };

        // --- Scroll Animation Logic ---
        const handleScrollAnimation = () => {
            const heroSection = document.getElementById('hero-section');
            if (!heroSection) return;

            // The amount we have scrolled down relative to the hero section top
            const scrollTop = Math.max(0, window.scrollY - heroSection.offsetTop);
            
            // The total scrollable distance for the hero section
            // Use offsetHeight instead of scrollHeight for accuracy.
            const maxScroll = heroSection.offsetHeight - window.innerHeight;

            // Multiply maxScroll by 0.9 so the animation finishes slightly before the section ends
            // This guarantees the last frame is reached while still comfortably in view.
            const scrollFraction = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / (maxScroll * 0.9))) : 0;

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );

            requestAnimationFrame(() => updateImage(frameIndex));
        };

        window.addEventListener('scroll', handleScrollAnimation);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            handleScrollAnimation();
        });
    }
});
