// ===========================
// Theme Toggle
// ===========================
// Scroll to top on page load/refresh
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Also ensure page starts at top
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Set initial icon
updateThemeIcon(currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateGitHubStats(newTheme);
});

// ===========================
// GitHub Stats Theme Switcher
// ===========================
function updateGitHubStats(theme) {
    const username = 'saimumarafat';
    const isDark = theme === 'dark';
    const timestamp = new Date().getTime(); // Cache buster
    
    // Theme configurations
    const darkTheme = {
        theme: 'tokyonight',
        bg_color: '0A0A0A',
        title_color: '00D9FF',
        icon_color: '00D9FF',
        text_color: 'A0A0A0',
        ring: '00D9FF',
        fire: '00D9FF',
        currStreakLabel: '00D9FF'
    };
    
    const lightTheme = {
        theme: 'default',
        bg_color: 'FFFFFF',
        title_color: '0EA5E9',
        icon_color: '8B5CF6',
        text_color: '475569',
        ring: '0EA5E9',
        fire: '0EA5E9',
        currStreakLabel: '0EA5E9'
    };
    
    const config = isDark ? darkTheme : lightTheme;
    
    // Update GitHub Stats card
    const statsImg = document.getElementById('github-stats-img');
    if (statsImg) {
        statsImg.src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${config.theme}&hide_border=true&bg_color=${config.bg_color}&title_color=${config.title_color}&icon_color=${config.icon_color}&text_color=${config.text_color}&cache_seconds=1800&t=${timestamp}`;
    }
    
    // Update Top Languages card
    const langsImg = document.getElementById('github-langs-img');
    if (langsImg) {
        langsImg.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${config.theme}&hide_border=true&bg_color=${config.bg_color}&title_color=${config.title_color}&text_color=${config.text_color}&cache_seconds=1800&t=${timestamp}`;
    }
    
    // Update Streak Stats
    const streakImg = document.getElementById('github-streak-img');
    if (streakImg) {
        streakImg.src = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${config.theme}&hide_border=true&background=${config.bg_color}&ring=${config.ring}&fire=${config.fire}&currStreakLabel=${config.currStreakLabel}&date_format=j%20M%5B%20Y%5D&t=${timestamp}`;
    }
    
    // Update Contribution Graph
    const graphImg = document.getElementById('github-graph-img');
    if (graphImg) {
        const graphTheme = isDark ? 'tokyo-night' : 'github-light';
        const graphBg = isDark ? '0A0A0A' : 'FFFFFF';
        const graphColor = isDark ? '00D9FF' : '0EA5E9';
        graphImg.src = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${graphTheme}&hide_border=true&bg_color=${graphBg}&color=${graphColor}&line=${graphColor}&point=${config.text_color}&area=true&area_color=${graphColor}&t=${timestamp}`;
    }
    
    // Update Contribution Calendar
    const calendarImg = document.getElementById('github-calendar-img');
    if (calendarImg) {
        const calendarColor = isDark ? '00D9FF' : '0EA5E9';
        calendarImg.src = `https://ghchart.rshah.org/${calendarColor}/${username}?t=${timestamp}`;
    }
    
    // Update Trophy
    const trophyImg = document.getElementById('github-trophy-img');
    if (trophyImg) {
        const trophyTheme = isDark ? 'tokyonight' : 'flat';
        trophyImg.src = `https://github-profile-trophy.vercel.app/?username=${username}&theme=${trophyTheme}&no-frame=true&no-bg=true&column=4&margin-w=15&margin-h=15&t=${timestamp}`;
    }
}

// ===========================
// Auto-refresh GitHub Stats
// Refreshes stats every 30 minutes
// ===========================
function startAutoRefresh() {
    const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds
    
    setInterval(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        updateGitHubStats(currentTheme);
        console.log('🔄 GitHub stats refreshed at:', new Date().toLocaleTimeString());
    }, REFRESH_INTERVAL);
}

// Initialize GitHub stats with current theme
window.addEventListener('load', () => {
    updateGitHubStats(currentTheme);
    startAutoRefresh(); // Start auto-refresh timer
    
    // Add manual refresh button functionality if exists
    const refreshBtn = document.getElementById('refreshStatsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            updateGitHubStats(currentTheme);
            
            // Visual feedback
            refreshBtn.innerHTML = '<i class="fas fa-check"></i> Refreshed!';
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Stats';
            }, 2000);
        });
    }
});

// ===========================
// Mobile Navigation Toggle
// ===========================
const hamburger = document.querySelector('.hamburger');
const navWrapper = document.querySelector('.nav-wrapper');

// Toggle mobile menu on hamburger click
hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    
    navWrapper.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Update ARIA attribute for accessibility
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-btn').forEach(link => {
    link.addEventListener('click', () => {
        navWrapper.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ===========================
// Smooth Scrolling for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Navbar Scroll Effect & Scroll to Top Button
// ===========================
// Navbar Scroll Effect & Scroll to Top Button
// ===========================
const scrollTopBtn = document.getElementById('scrollTopBtn');
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show navbar based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    
    // Enhance navbar shadow on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll to top button functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Active Navigation Link Highlighting
// ===========================
const sections = document.querySelectorAll('section');
const navButtons = document.querySelectorAll('.nav-btn');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Determine which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    // Update active link styling
    navButtons.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Typewriter Effect for Hero Subtitle
// Multiple phrases that rotate
// ===========================
const heroSubtitle = document.querySelector('.hero-subtitle');
const phrases = [
    'Professional Web Developer',
    'Full Stack Engineer',
    'UI/UX Designer',
    'Software Architect',
    'Digital Solution Expert'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    // Type or delete characters
    if (isDeleting) {
        heroSubtitle.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        heroSubtitle.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }
    
    // Switch between typing and deleting
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingDelay = 2000; // Pause at end of phrase
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
        typingDelay = 500;
    }
    
    setTimeout(typeWriter, typingDelay);
}

// Start typewriter effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ===========================
// Scroll-Triggered Animations - Simplified
// Elements are visible by default, subtle effects on scroll
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animations removed for professional appearance
            // Content is visible by default
        }
    });
}, observerOptions);

// ===========================
// Project Filtering System
// Filter projects by category with smooth animations
// ===========================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter and animate project cards
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===========================
// Contact Form Validation and Handling
// Real-time validation with visual feedback
// ===========================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    input.classList.remove('success');
    input.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
}

// Show success
function showSuccess(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    input.classList.add('success');
    input.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
}

// Clear validation
function clearValidation(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.remove('error', 'success');
    input.removeAttribute('aria-invalid');
    errorElement.textContent = '';
}

// Real-time validation on blur
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() === '') {
        clearValidation(nameInput);
    } else if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters');
    } else {
        showSuccess(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() === '') {
        clearValidation(emailInput);
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        showSuccess(emailInput);
    }
});

subjectInput.addEventListener('blur', () => {
    if (subjectInput.value.trim() === '') {
        clearValidation(subjectInput);
    } else if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters');
    } else {
        showSuccess(subjectInput);
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() === '') {
        clearValidation(messageInput);
    } else if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters');
    } else {
        showSuccess(messageInput);
    }
});

// Form submission with validation
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        showSuccess(nameInput);
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        showSuccess(emailInput);
    }
    
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters');
        isValid = false;
    } else {
        showSuccess(subjectInput);
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        showSuccess(messageInput);
    }
    
    if (!isValid) {
        showFormFeedback('Please fix the errors above', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    try {
        await simulateFormSubmission();
        
        // Show success message
        showFormFeedback('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();
        
        // Clear all validation states
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            clearValidation(input);
        });
        
    } catch (error) {
        showFormFeedback('Oops! Something went wrong. Please try again later.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Simulate form submission (replace with your backend API)
function simulateFormSubmission() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

// Show form feedback messages
function showFormFeedback(message, type) {
    const feedback = document.getElementById('formFeedback');
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 5000);
}

// ===========================
// Dynamic Year in Footer
// ===========================
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}

// ===========================
// Project Cards 3D Tilt Effect
// Cards tilt based on mouse movement
// ===========================
const allProjectCards = document.querySelectorAll('.project-card');

allProjectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Card Reveal Toggle (touch & keyboard fallback)
// Allows hidden extra info to be toggled on touch devices and via keyboard
// Elements targeted: .skill-card, .detail-item, .project-card
// Clicking links inside a card will not toggle the reveal state.
// ===========================
const revealables = document.querySelectorAll('.skill-card, .detail-item, .project-card');

revealables.forEach(el => {
    // Click / tap toggles reveal unless the click was on a link
    el.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // ignore clicks on links
        el.classList.toggle('revealed');
        el.setAttribute('aria-expanded', el.classList.contains('revealed'));
    });

    // Keyboard support: Enter or Space toggles
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // emulate a click
            el.click();
        }
    });
});

// ===========================
// Performance Optimization
// Lazy load images and smooth page load
// ===========================
window.addEventListener('load', () => {
    // Smooth page appearance
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Console Message
// ===========================
console.log('%c👋 Welcome to my portfolio!', 'color: #58A6FF; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS & JavaScript', 'color: #C9D1D9; font-size: 14px;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'color: #8B949E; font-size: 12px;');
