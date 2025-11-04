// Omar Ali Portfolio - JavaScript

// Global variables
let isScrolled = false;
let isMobileMenuOpen = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

var Typed = new Typed(".work-text",{
    strings:["Software Tester" , "Front-End Developer" , "Java Developer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:100,
    loop:true
})



function initializeApp() {
    // Set up event listeners
    setupScrollHandling();
    setupMobileMenu();
    setupContactForm();
    setupSmoothScrolling();
    setupProgressBars();
    updateCurrentYear();
    
    // Initialize animations
    initializeAnimations();
    
    console.log('Omar Ali Portfolio loaded successfully!');
}

// Scroll handling
function setupScrollHandling() {
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scrollPosition = window.scrollY;
    const newIsScrolled = scrollPosition > 20;
    
    if (newIsScrolled !== isScrolled) {
        isScrolled = newIsScrolled;
        updateNavigationStyle();
    }
    
    // Update progress bars when skills section is visible
    updateProgressBarsOnScroll();
}

function updateNavigationStyle() {
    const navigation = document.getElementById('navigation');
    if (isScrolled) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
}

// Mobile menu handling
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.add('active');
        mobileMenuBtn.classList.add('active');
    } else {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
}

function closeMobileMenu() {
    isMobileMenuOpen = false;
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
}

// Smooth scrolling
function setupSmoothScrolling() {
    // Add smooth scrolling to all nav links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        const offset = 80; // Account for fixed navigation
        const targetPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
        closeMobileMenu();
    }
}

// Progress bars animation
function setupProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function updateProgressBarsOnScroll() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        animateProgressBars();
    }
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.parentElement.parentElement.querySelector('.skill-level').textContent;
            bar.style.width = targetWidth;
        }, index * 100);
    });
}

// Contact form handling
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validate form data
    if (!validateContactForm(data)) {
        return;
    }
    
    // Simulate form submission
    submitContactForm(data);
}

function validateContactForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter your name', 'error');
        return false;
    }
    
    if (!data.email.trim() || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!data.message.trim()) {
        showNotification('Please enter your message', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Contact form submission with EmailJS
function submitContactForm(data) {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
    submitBtn.disabled = true;

    // استبدل دول بالقيم اللي من EmailJS Dashboard
    const SERVICE_ID = "service_k4v1anj";
    const TEMPLATE_ID = "template_svvwesg";
    const PUBLIC_KEY = "U4A5iNLD1ClfGuNU9";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: data.name,
        from_email: data.email,
        message: data.message
    }, PUBLIC_KEY)
    .then(() => {
        showNotification('Message sent successfully! Check your Gmail inbox.', 'success');
        document.getElementById('contact-form').reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    })
    .catch((error) => {
        console.error("EmailJS error:", error);
        showNotification('Failed to send message. Try again later.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}


function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'hsl(120, 100%, 25%)';
    } else if (type === 'error') {
        notification.style.background = 'hsl(0, 84%, 60%)';
    } else {
        notification.style.background = 'hsl(217, 91%, 60%)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Update current year
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .experience-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedHandleScroll = debounce(handleScroll, 10);
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', debouncedHandleScroll);

// Loading state management
function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: hsl(220, 26%, 8%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    const spinner = loadingOverlay.querySelector('.loading-spinner');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid hsl(217, 91%, 60%, 0.3);
        border-top: 3px solid hsl(217, 91%, 60%);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    document.body.appendChild(loadingOverlay);
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the following lines if you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Export functions for use in HTML onclick handlers
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
    }
    
    // Add other keyboard shortcuts as needed
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        // Focus on contact form or search (if implemented)
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            scrollToSection('#contact');
            setTimeout(() => {
                const nameInput = document.getElementById('name');
                if (nameInput) nameInput.focus();
            }, 500);
        }
    }
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    
    // If you're using Google Analytics, uncomment and modify:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track page interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track button clicks
    if (target.matches('.hero-btn, .project-btn, .contact-btn')) {
        trackEvent('button_click', {
            button_text: target.textContent.trim(),
            section: target.closest('section')?.id || 'unknown'
        });
    }
    
    // Track project links
    if (target.closest('.project-actions')) {
        trackEvent('project_link_click', {
            project: target.closest('.project-card')?.querySelector('h3')?.textContent || 'unknown',
            link_type: target.textContent.includes('Code') ? 'github' : 'demo'
        });
    }
    
    // Track social links
    if (target.closest('.social-btn')) {
        trackEvent('social_link_click', {
            platform: target.getAttribute('aria-label') || 'unknown'
        });
    }
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint') {
            console.log(`${entry.name}: ${entry.startTime}ms`);
        }
    }
});

if (typeof PerformanceObserver !== 'undefined') {
    performanceObserver.observe({ entryTypes: ['paint'] });
}

// Lazy loading for images (if needed)
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
setupLazyLoading();

console.log('Omar Ali Portfolio JavaScript loaded successfully!');


