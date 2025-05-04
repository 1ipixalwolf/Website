/*
// Contents from highlight-nav.js
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = location.pathname.split("/").pop();
    document.querySelectorAll('.nbar a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
    
    // Preload click sound for better response
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        clickSound.load();
    }
});

// Next button functionality
function handleNextClick() {
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        // Play sound with error handling
        clickSound.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
    }

    const active = document.querySelector(".nbar a.active");
    const allLinks = Array.from(document.querySelectorAll(".nbar a"));
    const currentIndex = allLinks.indexOf(active);

    if (currentIndex >= 0 && currentIndex < allLinks.length - 1) {
        window.location.href = allLinks[currentIndex + 1].getAttribute("href");
    }
}


// Contents from script.js (with a fixed typo "0vis" -> "0")
tsParticles.load({
    id: "tsparticles",
    options: {
        "fullScreen": {
            "zIndex": 1
        },
        "particles": {
            "number": {
                "value": 0  // Fixed typo here (was "0vis")
            },
            "color": {
                "value": [
                    "#00FFFC",
                    "#FC00FF",
                    "#fffc00"
                ]
            },
            "shape": {
                "type": [
                    "circle",
                    "square",
                    "triangle"
                ],
                "options": {}
            },
            "opacity": {
                "value": {
                    "min": 0,
                    "max": 1
                },
                "animation": {
                    "enable": true,
                    "speed": 2,
                    "startValue": "max",
                    "destroy": "min"
                }
            },
            "size": {
                "value": {
                    "min": 2,
                    "max": 4
                }
            },
            "links": {
                "enable": false
            },
            "life": {
                "duration": {
                    "sync": true,
                    "value": 5
                },
                "count": 1
            },
            "move": {
                "enable": true,
                "gravity": {
                    "enable": true,
                    "acceleration": 10
                },
                "speed": {
                    "min": 10,
                    "max": 20
                },
                "decay": 0.1,
                "direction": "none",
                "straight": false,
                "outModes": {
                    "default": "destroy",
                    "top": "none"
                }
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "move": true,
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "move": true,
                "value": {
                    "min": 0,
                    "max": 360
                },
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "roll": {
                "darken": {
                    "enable": true,
                    "value": 25
                },
                "enable": true,
                "speed": {
                    "min": 15,
                    "max": 25
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "move": true,
                "speed": {
                    "min": -15,
                    "max": 15
                }
            }
        },
        "emitters": {
            "life": {
                "count": 0,
                "duration": 0.1,
                "delay": 0.4
            },
            "rate": {
                "delay": 0.1,
                "quantity": 150
            },
            "size": {
                "width": 0,
                "height": 0
            }
        }
    }
});
*/



document.addEventListener("DOMContentLoaded", function () {
    // Highlight active navigation item
    highlightActiveNavItem();
    
    // Preload click sound for better response
    preloadClickSound();
    
    // Add mobile navigation functionality
    setupMobileNavigation();
    
    // Setup theme detection and tracking
    setupThemeDetection();
});

// Highlight active navigation link
function highlightActiveNavItem() {
    const currentPage = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nbar a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Preload click sound for better performance
function preloadClickSound() {
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        clickSound.load();
    }
}

// Set up mobile navigation with hamburger menu
function setupMobileNavigation() {
    // Create hamburger menu button if it doesn't exist
    if (!document.querySelector('.menu-toggle')) {
        const navBar = document.querySelector('.nbar');
        if (navBar) {
            // Create the hamburger button
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            menuToggle.innerHTML = '☰';
            navBar.insertBefore(menuToggle, navBar.firstChild);
            
            // Add click event to toggle navigation
            menuToggle.addEventListener('click', toggleMobileNav);
            
            // Add ARIA attributes for accessibility
            const navList = document.querySelector('.nav-list');
            if (navList) {
                navList.setAttribute('aria-expanded', 'false');
                navList.id = 'main-navigation';
                menuToggle.setAttribute('aria-controls', 'main-navigation');
            }
        }
    }
}

// Toggle mobile navigation menu
function toggleMobileNav() {
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navList) {
        const isExpanded = navList.classList.toggle('show');
        
        // Update ARIA attributes
        navList.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        
        // Change hamburger icon to X when menu is open
        menuToggle.innerHTML = isExpanded ? '✕' : '☰';
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
        
        // Close menu when clicking outside or on a link
        if (isExpanded) {
            // Close when clicking a navigation link
            const navLinks = navList.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', toggleMobileNav, { once: true });
            });
            
            // Close when clicking outside navigation
            document.addEventListener('click', function closeNav(e) {
                if (!navList.contains(e.target) && e.target !== menuToggle) {
                    toggleMobileNav();
                    document.removeEventListener('click', closeNav);
                }
            });
        }
    }
}

// Set up theme detection and preference tracking
function setupThemeDetection() {
    // Check if browser supports prefers-color-scheme
    if (window.matchMedia) {
        // Watch for theme preference changes
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Apply theme based on current preference
        applyTheme(darkModeMediaQuery.matches);
        
        // Listen for changes in theme preference
        try {
            // Modern browsers
            darkModeMediaQuery.addEventListener('change', (e) => applyTheme(e.matches));
        } catch (e) {
            // Fallback for older browsers
            darkModeMediaQuery.addListener((e) => applyTheme(e.matches));
        }
    }
}

// Apply theme based on preference
function applyTheme(isDarkMode) {
    // Could be extended with additional theme-specific adjustments
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Next button functionality - Play sound and navigate to next page
function handleNextClick() {
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        // Play sound with error handling
        clickSound.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
    }

    const active = document.querySelector(".nbar a.active");
    const allLinks = Array.from(document.querySelectorAll(".nbar a"));
    const currentIndex = allLinks.indexOf(active);

    if (currentIndex >= 0 && currentIndex < allLinks.length - 1) {
        window.location.href = allLinks[currentIndex + 1].getAttribute("href");
    }
}

// Handle escape key to close mobile navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navList = document.querySelector('.nav-list.show');
        if (navList) {
            toggleMobileNav();
        }
    }
});