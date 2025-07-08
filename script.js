document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            }
        });
    });

    // Mobile Navigation Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav ul');

    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        hamburgerMenu.classList.toggle('open'); // For animation if desired
    });

    // Slider functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const slideIntervalTime = 5000; // 5 seconds

    function moveSlider() {
        // Get the current slide width every time the function runs
        const currentSlideWidth = slides[0].clientWidth;
        currentIndex = (currentIndex + 1) % slides.length;
        slider.style.transform = `translateX(-${currentIndex * currentSlideWidth}px)`;
    }

    // Adjust slider width on window resize
    window.addEventListener('resize', () => {
        // No need to recalculate slideWidth here, as moveSlider will do it
        slider.style.transition = 'none'; // Disable transition during resize
        // Re-apply the transform immediately after resize to prevent jump
        // Using the current slide width for correct positioning
        const currentSlideWidth = slides[0].clientWidth;
        slider.style.transform = `translateX(-${currentIndex * currentSlideWidth}px)`;
        setTimeout(() => {
            slider.style.transition = 'transform 0.8s ease-in-out'; // Re-enable transition
        }, 0);
    });

    setInterval(moveSlider, slideIntervalTime);

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for fixed header
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.main-nav ul li a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});