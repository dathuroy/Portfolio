// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const themeToggle = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contact-form');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            if (document.body.classList.contains('dark')) {
                navbar.style.backgroundColor = 'rgba(17, 24, 39, 0.98)';
            }
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            if (document.body.classList.contains('dark')) {
                navbar.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
            }
        }
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        
        if (document.body.classList.contains('dark')) {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '🌙';
    }

    // Smooth scrolling for navigation links
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Animate counter numbers
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.setProperty('--skill-width', width);
            bar.style.width = width;
        });
    }

    // Animate counter numbers
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
            }, 20);
        });
    }

    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '⏳ Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = '✅ Message Sent!';
            submitButton.style.backgroundColor = 'var(--secondary-color)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    });

    // Typing animation for hero title
    function typeWriter() {
        const text = "Hi, I'm Lakshmi tejaswini Nasimsetty";
        const heroTitle = document.querySelector('.hero-title');
        let i = 0;
        
        function type() {
            if (i < text.length) {
                heroTitle.innerHTML = text.slice(0, i + 1) + '<span class="cursor">|</span>';
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => {
                    heroTitle.innerHTML = 'Hi, I\'m <span class="text-gradient">Lakshmi tejaswini Nasimsetty</span>';
                }, 500);
            }
        }
        
        type();
    }

    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = 
        '<div class="notification-content">' +
            '<span>' + message + '</span>' +
            '<button class="notification-close" onclick="this.parentElement.parentElement.remove()">' +
                '✕' +
            '</button>' +
        '</div>';
    
    // Add notification styles
    notification.style.cssText = 
        'position: fixed;' +
        'top: 20px;' +
        'right: 20px;' +
        'background-color: ' + (type === 'success' ? 'var(--secondary-color)' : 'var(--primary-color)') + ';' +
        'color: white;' +
        'padding: 15px 20px;' +
        'border-radius: 8px;' +
        'box-shadow: var(--shadow-medium);' +
        'z-index: 3000;' +
        'animation: slideInRight 0.3s ease;' +
        'max-width: 300px;';
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = 
    '@keyframes slideInRight {' +
        'from {' +
            'transform: translateX(100%);' +
            'opacity: 0;' +
        '}' +
        'to {' +
            'transform: translateX(0);' +
            'opacity: 1;' +
        '}' +
    '}' +
    
    '.notification-content {' +
        'display: flex;' +
        'align-items: center;' +
        'justify-content: space-between;' +
        'gap: 10px;' +
    '}' +
    
    '.notification-close {' +
        'background: none;' +
        'border: none;' +
        'color: white;' +
        'cursor: pointer;' +
        'padding: 0;' +
        'font-size: 14px;' +
    '}' +
    
    '.notification-close:hover {' +
        'opacity: 0.8;' +
    '}';
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        hero.style.transform = 'translateY(' + rate + 'px)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Modal functionality
function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});