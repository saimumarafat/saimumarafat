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

// Initialize theme toggle when DOM is ready
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    if (!themeToggle) return;

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateGitHubStats(newTheme);
    });
}

// Call theme initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}

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
    
});

// ===========================
// Animated Dot Background (MKBHD Style) - Auto Floating Animation
// ===========================
function initializeDotAnimation() {
const heroCanvas = document.getElementById('dotCanvas');
const aboutCanvas = document.getElementById('aboutDotCanvas');
const skillsCanvas = document.getElementById('skillsDotCanvas');
const githubCanvas = document.getElementById('githubDotCanvas');
const projectsCanvas = document.getElementById('projectsDotCanvas');
const contactCanvas = document.getElementById('contactDotCanvas');
const footerCanvas = document.getElementById('footerDotCanvas');

if (heroCanvas || aboutCanvas || skillsCanvas || githubCanvas || projectsCanvas || contactCanvas || footerCanvas) {
    let allDots = [];
    
    // Configuration - MKBHD exact style
    const GRID_SPACING = 45; // Exact spacing for complete grid
    const DOT_SIZE = 1.5; // Small dots like MKBHD
    const CONNECTION_DISTANCE = 80; // Shorter connections
    const FLOAT_RANGE = 8; // How far dots float from home position
    const FLOAT_SPEED = 0.015; // Slow, gentle floating
    
    // Get theme-appropriate colors
    function getDotColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
    }
    
    function getLineColor(opacity) {
        const theme = document.documentElement.getAttribute('data-theme');
        const baseOpacity = opacity || 0.15;
        return theme === 'light' 
            ? `rgba(0, 0, 0, ${baseOpacity})` 
            : `rgba(255, 255, 255, ${baseOpacity})`;
    }
    
    // Grid-based Dot class with auto-floating animation
    class Dot {
        constructor(x, y, yOffset = 0) {
            this.homeX = x;
            this.homeY = y;
            this.x = x;
            this.y = y;
            this.yOffset = yOffset;
            this.radius = DOT_SIZE;
            
            // Random floating parameters for organic movement
            this.angleX = Math.random() * Math.PI * 2;
            this.angleY = Math.random() * Math.PI * 2;
            this.speedX = FLOAT_SPEED + Math.random() * FLOAT_SPEED;
            this.speedY = FLOAT_SPEED + Math.random() * FLOAT_SPEED;
            this.floatRangeX = FLOAT_RANGE * (0.5 + Math.random() * 0.5);
            this.floatRangeY = FLOAT_RANGE * (0.5 + Math.random() * 0.5);
            
            // Fade in/out parameters (MKBHD style)
            this.opacity = Math.random(); // Start with random opacity
            this.targetOpacity = Math.random() > 0.3 ? 1 : 0; // 70% visible, 30% hidden
            this.fadeSpeed = 0.003 + Math.random() * 0.005; // Random fade speed
            this.fadeDelay = Math.random() * 3000; // Random delay before fading
            this.fadeTimer = 0;
        }
        
        update() {
            // Gentle floating animation using sine waves
            this.angleX += this.speedX;
            this.angleY += this.speedY;
            
            // Calculate new position with sine wave for smooth bouncing
            this.x = this.homeX + Math.sin(this.angleX) * this.floatRangeX;
            this.y = this.homeY + Math.cos(this.angleY) * this.floatRangeY;
            
            // Update fade timer
            this.fadeTimer += 16; // ~60fps
            
            // Fade in/out logic (MKBHD style - random appearing/disappearing)
            if (this.fadeTimer > this.fadeDelay) {
                // Gradually fade towards target opacity
                if (this.opacity < this.targetOpacity) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= this.targetOpacity) {
                        this.opacity = this.targetOpacity;
                        // Set new target and delay
                        this.targetOpacity = Math.random() > 0.3 ? 1 : 0;
                        this.fadeDelay = 2000 + Math.random() * 4000;
                        this.fadeTimer = 0;
                    }
                } else if (this.opacity > this.targetOpacity) {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= this.targetOpacity) {
                        this.opacity = this.targetOpacity;
                        // Set new target and delay
                        this.targetOpacity = Math.random() > 0.3 ? 1 : 0;
                        this.fadeDelay = 2000 + Math.random() * 4000;
                        this.fadeTimer = 0;
                    }
                }
            }
        }
        
        draw(ctx) {
            // Only draw if visible
            if (this.opacity > 0.05) {
                // Simple dot with opacity
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                
                // Apply opacity to dot color
                const theme = document.documentElement.getAttribute('data-theme');
                const baseColor = theme === 'light' ? '0, 0, 0' : '255, 255, 255';
                ctx.fillStyle = `rgba(${baseColor}, ${this.opacity * 0.5})`;
                ctx.fill();
            }
        }
        
        getAbsolutePosition() {
            return { x: this.x, y: this.y + this.yOffset };
        }
    }
    
    // Setup canvases
    function setupCanvas(canvas, section) {
        if (!canvas) return null;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = section.offsetHeight;
        
        return { canvas, ctx, section };
    }
    
    let heroSetup = null;
    let aboutSetup = null;
    let skillsSetup = null;
    let githubSetup = null;
    let projectsSetup = null;
    let contactSetup = null;
    let footerSetup = null;
    
    if (heroCanvas) {
        heroSetup = setupCanvas(heroCanvas, document.querySelector('.hero'));
    }
    
    if (aboutCanvas) {
        aboutSetup = setupCanvas(aboutCanvas, document.querySelector('.about'));
    }
    
    if (skillsCanvas) {
        skillsSetup = setupCanvas(skillsCanvas, document.querySelector('.skills'));
    }
    
    if (githubCanvas) {
        githubSetup = setupCanvas(githubCanvas, document.querySelector('.github-stats'));
    }
    
    if (projectsCanvas) {
        projectsSetup = setupCanvas(projectsCanvas, document.querySelector('.projects'));
    }
    
    if (contactCanvas) {
        contactSetup = setupCanvas(contactCanvas, document.querySelector('.contact'));
    }
    
    if (footerCanvas) {
        footerSetup = setupCanvas(footerCanvas, document.querySelector('.footer'));
    }
    
    // Initialize grid-based dots (complete grid, no gaps)
    function initDots() {
        allDots = [];
        let yOffset = 0;
        
        // Create complete grid for hero section
        if (heroSetup) {
            const cols = Math.ceil(heroSetup.canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(heroSetup.canvas.height / GRID_SPACING) + 1;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * GRID_SPACING;
                    const y = row * GRID_SPACING;
                    const dot = new Dot(x, y, yOffset);
                    dot.section = 'hero';
                    allDots.push(dot);
                }
            }
            yOffset += heroSetup.canvas.height;
        }
        
        // Create complete grid for about section
        if (aboutSetup) {
            const cols = Math.ceil(aboutSetup.canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(aboutSetup.canvas.height / GRID_SPACING) + 1;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * GRID_SPACING;
                    const y = row * GRID_SPACING;
                    const dot = new Dot(x, y, yOffset);
                    dot.section = 'about';
                    allDots.push(dot);
                }
            }
            yOffset += aboutSetup.canvas.height;
        }
        
        // Create complete grid for skills section
        if (skillsSetup) {
            const cols = Math.ceil(skillsSetup.canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(skillsSetup.canvas.height / GRID_SPACING) + 1;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * GRID_SPACING;
                    const y = row * GRID_SPACING;
                    const dot = new Dot(x, y, yOffset);
                    dot.section = 'skills';
                    allDots.push(dot);
                }
            }
            yOffset += skillsSetup.canvas.height;
        }
        
        // Create complete grid for github section
        if (githubSetup) {
            const cols = Math.ceil(githubSetup.canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(githubSetup.canvas.height / GRID_SPACING) + 1;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * GRID_SPACING;
                    const y = row * GRID_SPACING;
                    const dot = new Dot(x, y, yOffset);
                    dot.section = 'github';
                    allDots.push(dot);
                }
            }
            yOffset += githubSetup.canvas.height;
        }
        
        // Create complete grid for projects section
        if (projectsSetup) {
            const cols = Math.ceil(projectsSetup.canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(projectsSetup.canvas.height / GRID_SPACING) + 1;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * GRID_SPACING;
                    const y = row * GRID_SPACING;
                    const dot = new Dot(x, y, yOffset);
                    dot.section = 'projects';
                    allDots.push(dot);
                }
            }
            yOffset += projectsSetup.canvas.height;
        }
        
        // Create complete grid for contact section
        if (contactSetup) {
            const cols = Math.ceil(contactSetup.canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(contactSetup.canvas.height / GRID_SPACING) + 1;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * GRID_SPACING;
                    const y = row * GRID_SPACING;
                    const dot = new Dot(x, y, yOffset);
                    dot.section = 'contact';
                    allDots.push(dot);
                }
            }
            yOffset += contactSetup.canvas.height;
        }
        
        // Create complete grid for footer section
        if (footerSetup) {
            const cols = Math.ceil(footerSetup.canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(footerSetup.canvas.height / GRID_SPACING) + 1;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * GRID_SPACING;
                    const y = row * GRID_SPACING;
                    const dot = new Dot(x, y, yOffset);
                    dot.section = 'footer';
                    allDots.push(dot);
                }
            }
        }
    }
    
    // Draw connections between nearby dots (MKBHD style)
    function drawConnections(ctx, sectionDots) {
        for (let i = 0; i < sectionDots.length; i++) {
            // Skip if dot is nearly invisible
            if (sectionDots[i].opacity < 0.1) continue;
            
            for (let j = i + 1; j < sectionDots.length; j++) {
                // Skip if second dot is nearly invisible
                if (sectionDots[j].opacity < 0.1) continue;
                
                const dot1 = sectionDots[i];
                const dot2 = sectionDots[j];
                
                const dx = dot1.x - dot2.x;
                const dy = dot1.y - dot2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONNECTION_DISTANCE) {
                    // Calculate opacity based on distance and dot opacity
                    const distanceOpacity = (1 - distance / CONNECTION_DISTANCE) * 0.3;
                    const avgDotOpacity = (dot1.opacity + dot2.opacity) / 2;
                    const finalOpacity = distanceOpacity * avgDotOpacity;
                    
                    ctx.beginPath();
                    ctx.moveTo(dot1.x, dot1.y);
                    ctx.lineTo(dot2.x, dot2.y);
                    ctx.strokeStyle = getLineColor(finalOpacity);
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Unified animation loop
    function animate() {
        // Update all dots
        allDots.forEach(dot => dot.update());
        
        // Draw hero section
        if (heroSetup) {
            heroSetup.ctx.clearRect(0, 0, heroSetup.canvas.width, heroSetup.canvas.height);
            const heroDots = allDots.filter(d => d.section === 'hero');
            heroDots.forEach(dot => dot.draw(heroSetup.ctx));
            drawConnections(heroSetup.ctx, heroDots);
        }
        
        // Draw about section
        if (aboutSetup) {
            aboutSetup.ctx.clearRect(0, 0, aboutSetup.canvas.width, aboutSetup.canvas.height);
            const aboutDots = allDots.filter(d => d.section === 'about');
            aboutDots.forEach(dot => dot.draw(aboutSetup.ctx));
            drawConnections(aboutSetup.ctx, aboutDots);
        }
        
        // Draw skills section
        if (skillsSetup) {
            skillsSetup.ctx.clearRect(0, 0, skillsSetup.canvas.width, skillsSetup.canvas.height);
            const skillsDots = allDots.filter(d => d.section === 'skills');
            skillsDots.forEach(dot => dot.draw(skillsSetup.ctx));
            drawConnections(skillsSetup.ctx, skillsDots);
        }
        
        // Draw github section
        if (githubSetup) {
            githubSetup.ctx.clearRect(0, 0, githubSetup.canvas.width, githubSetup.canvas.height);
            const githubDots = allDots.filter(d => d.section === 'github');
            githubDots.forEach(dot => dot.draw(githubSetup.ctx));
            drawConnections(githubSetup.ctx, githubDots);
        }
        
        // Draw projects section
        if (projectsSetup) {
            projectsSetup.ctx.clearRect(0, 0, projectsSetup.canvas.width, projectsSetup.canvas.height);
            const projectsDots = allDots.filter(d => d.section === 'projects');
            projectsDots.forEach(dot => dot.draw(projectsSetup.ctx));
            drawConnections(projectsSetup.ctx, projectsDots);
        }
        
        // Draw contact section
        if (contactSetup) {
            contactSetup.ctx.clearRect(0, 0, contactSetup.canvas.width, contactSetup.canvas.height);
            const contactDots = allDots.filter(d => d.section === 'contact');
            contactDots.forEach(dot => dot.draw(contactSetup.ctx));
            drawConnections(contactSetup.ctx, contactDots);
        }
        
        // Draw footer section
        if (footerSetup) {
            footerSetup.ctx.clearRect(0, 0, footerSetup.canvas.width, footerSetup.canvas.height);
            const footerDots = allDots.filter(d => d.section === 'footer');
            footerDots.forEach(dot => dot.draw(footerSetup.ctx));
            drawConnections(footerSetup.ctx, footerDots);
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    initDots();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (heroSetup) {
            heroSetup.canvas.width = window.innerWidth;
            heroSetup.canvas.height = heroSetup.section.offsetHeight;
        }
        if (aboutSetup) {
            aboutSetup.canvas.width = window.innerWidth;
            aboutSetup.canvas.height = aboutSetup.section.offsetHeight;
        }
        if (skillsSetup) {
            skillsSetup.canvas.width = window.innerWidth;
            skillsSetup.canvas.height = skillsSetup.section.offsetHeight;
        }
        if (githubSetup) {
            githubSetup.canvas.width = window.innerWidth;
            githubSetup.canvas.height = githubSetup.section.offsetHeight;
        }
        if (projectsSetup) {
            projectsSetup.canvas.width = window.innerWidth;
            projectsSetup.canvas.height = projectsSetup.section.offsetHeight;
        }
        if (contactSetup) {
            contactSetup.canvas.width = window.innerWidth;
            contactSetup.canvas.height = contactSetup.section.offsetHeight;
        }
        if (footerSetup) {
            footerSetup.canvas.width = window.innerWidth;
            footerSetup.canvas.height = footerSetup.section.offsetHeight;
        }
        initDots();
    });
    
    // Initialize and start
    initDots();
    animate();
    
    // Handle theme changes
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(() => {
                if (heroSetup) heroSetup.ctx.clearRect(0, 0, heroSetup.canvas.width, heroSetup.canvas.height);
                if (aboutSetup) aboutSetup.ctx.clearRect(0, 0, aboutSetup.canvas.width, aboutSetup.canvas.height);
                if (skillsSetup) skillsSetup.ctx.clearRect(0, 0, skillsSetup.canvas.width, skillsSetup.canvas.height);
                if (githubSetup) githubSetup.ctx.clearRect(0, 0, githubSetup.canvas.width, githubSetup.canvas.height);
                if (projectsSetup) projectsSetup.ctx.clearRect(0, 0, projectsSetup.canvas.width, projectsSetup.canvas.height);
                if (contactSetup) contactSetup.ctx.clearRect(0, 0, contactSetup.canvas.width, contactSetup.canvas.height);
                if (footerSetup) footerSetup.ctx.clearRect(0, 0, footerSetup.canvas.width, footerSetup.canvas.height);
            }, 100);
        });
    }
}
}

// Initialize dot animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDotAnimation);
} else {
    initializeDotAnimation();
}

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
// Make project images clickable
// ===========================
document.querySelectorAll('.project-image').forEach(imageDiv => {
    imageDiv.style.cursor = 'pointer';
    imageDiv.addEventListener('click', (e) => {
        // Don't trigger if clicking on the action buttons
        if (!e.target.closest('.project-link')) {
            const demoLink = imageDiv.querySelector('.project-link[aria-label*="demo"]');
            if (demoLink) {
                window.open(demoLink.href, '_blank');
            }
        }
    });
});

// ===========================
// Console Message
// ===========================
console.log('%c👋 Welcome to my portfolio!', 'color: #58A6FF; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS & JavaScript', 'color: #C9D1D9; font-size: 14px;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'color: #8B949E; font-size: 12px;');
