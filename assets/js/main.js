/**
 * Main JavaScript for GF WMS Knowledge Wiki
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeNavigation();
    initializeSearch();
    initializeTheme();
    initializeAnimations();
    initializeAccessibility();
    initializePerformance();
}

// Navigation Functions
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                navToggle.focus();
            }
        });
    }
    
    // Active navigation highlighting
    highlightActiveNavigation();
}

function highlightActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || currentPath.startsWith(linkPath + '/')) {
            link.classList.add('active');
        }
    });
}

// Search Functions
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchModal = document.getElementById('search-modal');
    const modalSearchInput = document.getElementById('modal-search-input');
    const searchResults = document.getElementById('search-results');
    const searchModalClose = document.querySelector('.search-modal-close');
    
    // Search data - In a real implementation, this would come from an API or generated file
    const searchData = [
        {
            title: "WMS Basics",
            url: "/pages/training/basics/",
            category: "Training",
            excerpt: "Learn the fundamentals of the Warehouse Management System"
        },
        {
            title: "System Navigation",
            url: "/pages/training/navigation/",
            category: "Training",
            excerpt: "Master the art of navigating through the WMS interface"
        },
        {
            title: "Receiving Process",
            url: "/pages/wiki/receiving/",
            category: "Wiki",
            excerpt: "Complete guide to receiving inventory in the WMS"
        },
        {
            title: "Picking & Packing",
            url: "/pages/wiki/picking/",
            category: "Wiki",
            excerpt: "Learn efficient picking and packing procedures"
        },
        {
            title: "Common Errors",
            url: "/pages/errors/common/",
            category: "Errors",
            excerpt: "Solutions for the most frequently encountered issues"
        },
        {
            title: "System Errors",
            url: "/pages/errors/system/",
            category: "Errors",
            excerpt: "Troubleshooting system-level problems"
        }
    ];
    
    // Open search modal
    if (searchInput && searchButton) {
        searchInput.addEventListener('focus', openSearchModal);
        searchButton.addEventListener('click', openSearchModal);
    }
    
    // Close search modal
    if (searchModalClose) {
        searchModalClose.addEventListener('click', closeSearchModal);
    }
    
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }
    
    // Search functionality
    if (modalSearchInput) {
        modalSearchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            performSearch(query, searchData, searchResults);
        });
        
        modalSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSearchModal();
            }
        });
    }
    
    function openSearchModal() {
        if (searchModal) {
            searchModal.classList.add('active');
            searchModal.setAttribute('aria-hidden', 'false');
            if (modalSearchInput) {
                modalSearchInput.focus();
            }
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('active');
            searchModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (searchInput) {
                searchInput.blur();
            }
        }
    }
    
    function performSearch(query, data, resultsContainer) {
        if (!query || !resultsContainer) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        const results = data.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.excerpt.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }
        
        resultsContainer.innerHTML = results.map(result => `
            <div class="search-result" onclick="navigateToResult('${result.url}')">
                <div class="search-result-title">${highlightQuery(result.title, query)}</div>
                <div class="search-result-category">${result.category}</div>
                <div class="search-result-excerpt">${highlightQuery(result.excerpt, query)}</div>
            </div>
        `).join('');
    }
    
    function highlightQuery(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    window.navigateToResult = function(url) {
        window.location.href = url;
    };
}

// Theme Functions
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get stored theme or default to system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply theme
    applyTheme(currentTheme);
    
    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        const themeIcon = themeToggle?.querySelector('i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Animation Functions
function initializeAnimations() {
    // Smooth scrolling for anchor links
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
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .quick-access-card, .update-card, .stat-card').forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.hero-content');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// Accessibility Functions
function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Focus management for modals
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                trapFocus(modal, e);
            }
        });
    });
    
    function trapFocus(element, event) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    window.announce = function(message) {
        announcer.textContent = message;
        setTimeout(() => announcer.textContent = '', 1000);
    };
}

// Performance Functions
function initializePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const preloadLinks = [
        '/assets/css/main.css',
        '/assets/js/main.js'
    ];
    
    preloadLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Utility Functions
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
    };
}

// Analytics (placeholder for actual implementation)
function trackEvent(category, action, label) {
    // In a real implementation, this would send data to your analytics service
    console.log('Analytics:', { category, action, label });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In a real implementation, this would send error reports to your monitoring service
});

// Print styles
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initializeNavigation,
        initializeSearch,
        initializeTheme,
        initializeAnimations,
        initializeAccessibility,
        initializePerformance,
        debounce,
        throttle,
        trackEvent
    };
}