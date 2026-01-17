import check from '/src/assets/check.svg'  // ✅ Same directory level
import star from '/src/assets/star.svg'    // ✅ Same directory level

// Ensure soup1 and soup2 are imported if you are using them in your 'cards' array!
// import soup1 from '../assets/soup1.png' 

import AOS from "aos";
import "aos/dist/aos.css";

// Init AOS animation with faster settings
AOS.init({
    duration: 600,        // Faster animation (was 1000ms)
    easing: 'ease-out-cubic',
    once: true,           // Animation happens only once
    offset: 50,           // Triggers earlier (was 100)
    delay: 0,
    disable: false,
    startEvent: 'DOMContentLoaded',
    throttleDelay: 99,
    debounceDelay: 50,
    anchorPlacement: 'top-bottom',
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const menuIcon = document.getElementById('menu-icon');

    // Add a check to prevent errors if the elements are missing on certain pages
    if (menuToggle && mobileDrawer && menuIcon) {
        menuToggle.addEventListener('click', () => {
            // 1. Slide the menu in/out
            mobileDrawer.classList.toggle('active');
            
            // 2. Animate the book icon container
            menuToggle.classList.toggle('active');

            // 3. Swap book icon for an 'X'
            if (mobileDrawer.classList.contains('active')) {
                menuIcon.classList.replace('fa-book-open', 'fa-xmark');
            } else {
                menuIcon.classList.replace('fa-xmark', 'fa-book-open');
            }
        });

        // Close the menu automatically when a link is clicked
        document.querySelectorAll('.mobile-drawer li a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
                menuToggle.classList.remove('active');
                menuIcon.classList.replace('fa-xmark', 'fa-book-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileDrawer.classList.remove('active');
                menuToggle.classList.remove('active');
                menuIcon.classList.replace('fa-xmark', 'fa-book-open');
            }
        });

        // Close the menu when resizing back to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900 && mobileDrawer.classList.contains('active')) {
                mobileDrawer.classList.remove('active');
                menuToggle.classList.remove('active');
                menuIcon.classList.replace('fa-xmark', 'fa-book-open');
            }
        });
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Food filter functionality
    const filterButtons = document.querySelectorAll('.popular-foods__filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Simple animation for button feedback
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }

    // Newsletter form validation
    const subscriptionForm = document.querySelector('.subscription__form');
    if (subscriptionForm) {
        const emailInput = subscriptionForm.querySelector('input[type="email"]');
        const submitButton = subscriptionForm.querySelector('button');
        
        if (submitButton && emailInput) {
            submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailInput.value.trim();
                
                if (email === '') {
                    alert('Please enter your email address');
                    emailInput.focus();
                    return;
                }
                
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address');
                    emailInput.focus();
                    return;
                }
                
                // Success feedback
                submitButton.textContent = 'Subscribed! ✓';
                submitButton.style.background = '#28a745';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitButton.textContent = 'Get Started';
                    submitButton.style.background = '';
                }, 3000);
            });
        }
    }

    // Backup intersection observer for faster loading (if AOS fails)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply to elements (backup if AOS doesn't load properly)
    const animateElements = document.querySelectorAll('[data-aos]');
    if (animateElements.length > 0 && typeof AOS === 'undefined') {
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeInObserver.observe(el);
        });
    }
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}