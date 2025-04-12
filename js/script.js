// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (button && menu) {
            // Show menu on hover
            dropdown.addEventListener('mouseenter', () => {
                menu.classList.remove('hidden');
            });
            
            // Hide menu when mouse leaves dropdown area
            dropdown.addEventListener('mouseleave', () => {
                menu.classList.add('hidden');
            });
            
            // For mobile devices, toggle on click
            button.addEventListener('click', (e) => {
                e.preventDefault();
                menu.classList.toggle('hidden');
            });
        }
    });
    
    // Schedule tabs
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleContents = document.querySelectorAll('.schedule-content');
    
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            scheduleTabs.forEach(t => {
                t.classList.remove('active');
                t.classList.remove('bg-primary');
                t.classList.remove('text-white');
                t.classList.add('bg-gray-200');
                t.classList.add('text-gray-700');
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            tab.classList.add('bg-primary');
            tab.classList.add('text-white');
            tab.classList.remove('bg-gray-200');
            tab.classList.remove('text-gray-700');
            
            // Hide all content
            scheduleContents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            // Show content for clicked tab
            const contentId = tab.getAttribute('data-day');
            const content = document.getElementById(contentId);
            if (content) {
                content.classList.remove('hidden');
                content.classList.add('active');
            }
        });
    });
    
    // Countdown timer
    const conferenceDate = new Date('June 10, 2025 09:00:00').getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = conferenceDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysElement) daysElement.innerText = days;
        if (hoursElement) hoursElement.innerText = hours;
        if (minutesElement) minutesElement.innerText = minutes;
        if (secondsElement) secondsElement.innerText = seconds;
    }
    
    // Update countdown every second if the countdown elements exist
    if (daysElement && hoursElement && minutesElement && secondsElement) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if it's open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add active state for current section in navbar
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();
    
    // Enhance navbar hover effects
    const navLinks = document.querySelectorAll('.navbar a, .dropdown-toggle');
    
    navLinks.forEach(link => {
        const indicator = link.querySelector('span.absolute');
        if (indicator) {
            link.addEventListener('mouseenter', () => {
                indicator.style.transition = 'all 0.3s ease-in-out';
            });
        }
    });
}); 