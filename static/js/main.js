/**
 * Main JavaScript File for Sanskar Shrestha Portfolio
 * Handles smooth scrolling, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Three.js Earth Globe
    initThreeJSGlobe();
    
    // Scroll animations
    initScrollAnimations();
    
    // Contact form enhancements
    initContactEnhancements();
    
    // Performance optimizations
    initPerformanceOptimizations();
    
    console.log('Portfolio JavaScript initialized successfully');
});

/**
 * Initialize navigation functionality
 * Handles navbar scrolling effects and mobile menu
 */
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            handleNavbarScroll();
            updateActiveNavLink();
        });
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash
            if (href === '#' || href === '#!') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Three.js Earth Globe
 */
function initThreeJSGlobe() {
    const container = document.getElementById('threejs-globe');
    if (!container) {
        console.warn('Three.js globe container not found');
        return;
    }

    if (typeof THREE === 'undefined') {
        console.warn('Three.js library not loaded, creating fallback animated globe');
        createFallbackGlobe(container);
        return;
    }

    try {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        
        // Set renderer size and properties
        const size = Math.min(container.clientWidth, container.clientHeight);
        renderer.setSize(size, size);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create Earth geometry and materials
        const geometry = new THREE.SphereGeometry(5, 64, 64);
        
        // Earth material with realistic colors
        const material = new THREE.MeshPhongMaterial({
            color: 0x2563eb,
            specular: 0x222222,
            shininess: 25,
            transparent: true,
            opacity: 0.9
        });

        // Create Earth mesh
        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        // Add atmospheric glow
        const atmosphereGeometry = new THREE.SphereGeometry(5.2, 64, 64);
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x4a90e2,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        scene.add(atmosphere);

        // Add realistic lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 5, 5);
        scene.add(directionalLight);

        // Add subtle rim lighting
        const rimLight = new THREE.DirectionalLight(0x4a90e2, 0.3);
        rimLight.position.set(-10, 0, -5);
        scene.add(rimLight);

        // Position camera
        camera.position.z = 15;

        // Add stars background
        createStarField(scene);

        // Animation loop with slow, smooth rotation
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate Earth slowly (30 seconds per full rotation)
            earth.rotation.y += 0.002;
            atmosphere.rotation.y += 0.001;
            
            // Subtle floating motion
            earth.position.y = Math.sin(Date.now() * 0.001) * 0.1;
            atmosphere.position.y = earth.position.y;
            
            renderer.render(scene, camera);
        }

        // Start animation
        animate();

        // Handle window resize
        function onWindowResize() {
            const newSize = Math.min(container.clientWidth, container.clientHeight);
            camera.aspect = 1;
            camera.updateProjectionMatrix();
            renderer.setSize(newSize, newSize);
        }

        window.addEventListener('resize', onWindowResize);

        console.log('Three.js Earth globe initialized successfully');

    } catch (error) {
        console.error('Error initializing Three.js globe:', error);
        createFallbackGlobe(container);
    }
}

/**
 * Create star field background
 */
function createStarField(scene) {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

/**
 * Create fallback animated globe
 */
function createFallbackGlobe(container) {
    container.innerHTML = `
        <div class="fallback-globe">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
                <defs>
                    <radialGradient id="earthGradient" cx="30%" cy="30%">
                        <stop offset="0%" style="stop-color:#4a90e2;stop-opacity:1" />
                        <stop offset="70%" style="stop-color:#2563eb;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="atmosphereGradient" cx="50%" cy="50%">
                        <stop offset="70%" style="stop-color:#4a90e2;stop-opacity:0" />
                        <stop offset="100%" style="stop-color:#4a90e2;stop-opacity:0.3" />
                    </radialGradient>
                </defs>
                
                <!-- Atmosphere -->
                <circle cx="200" cy="200" r="190" fill="url(#atmosphereGradient)" class="atmosphere-glow"/>
                
                <!-- Earth -->
                <circle cx="200" cy="200" r="160" fill="url(#earthGradient)" class="earth-sphere"/>
                
                <!-- Continents outline -->
                <g class="continents" opacity="0.6">
                    <path d="M 80 200 Q 150 160 220 200 Q 150 240 80 200" fill="none" stroke="#1e40af" stroke-width="2"/>
                    <path d="M 200 80 Q 240 150 200 220 Q 160 150 200 80" fill="none" stroke="#1e40af" stroke-width="2"/>
                    <path d="M 120 140 Q 180 120 240 140 Q 180 160 120 140" fill="none" stroke="#1e40af" stroke-width="1"/>
                    <path d="M 120 260 Q 180 240 240 260 Q 180 280 120 260" fill="none" stroke="#1e40af" stroke-width="1"/>
                </g>
                
                <!-- Nepal marker -->
                <circle cx="200" cy="180" r="4" fill="#f59e0b" class="location-marker">
                    <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                </circle>
            </svg>
        </div>
    `;

    // Add CSS animation for rotation
    const style = document.createElement('style');
    style.textContent = `
        .fallback-globe svg {
            animation: slowRotate 30s linear infinite;
        }
        .atmosphere-glow {
            animation: atmospherePulse 4s ease-in-out infinite alternate;
        }
        @keyframes slowRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes atmospherePulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Fallback animated globe created');
}

/**
 * Enhance globe animation with additional effects
 */
function initGlobeAnimation() {
    const globe = document.querySelector('.animated-globe');
    const nasaGlobe = document.querySelector('.nasa-earth-globe');
    const webglEarthContainer = document.getElementById('earth');
    
    // Handle SVG globe if present
    if (globe) {
        // Add hover effect to globe
        globe.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.05) rotate(10deg)';
            this.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))';
        });
        
        globe.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
            this.style.filter = '';
        });
        
        // Add click effect
        globe.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 100);
            
            // Add a pulse effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
    
    // Handle NASA globe iframe if present
    if (nasaGlobe) {
        const globeContainer = nasaGlobe.closest('.globe-container');
        
        if (globeContainer) {
            // Add hover effect to container since iframe blocks direct interaction
            globeContainer.addEventListener('mouseenter', function() {
                nasaGlobe.style.animationPlayState = 'paused';
                nasaGlobe.style.transform = 'scale(1.02)';
                nasaGlobe.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))';
            });
            
            globeContainer.addEventListener('mouseleave', function() {
                nasaGlobe.style.animationPlayState = 'running';
                nasaGlobe.style.transform = '';
                nasaGlobe.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))';
            });
        }
        
        // Ensure iframe loads properly
        nasaGlobe.addEventListener('load', function() {
            console.log('NASA Earth globe loaded successfully');
        });
        
        nasaGlobe.addEventListener('error', function() {
            console.warn('NASA Earth globe failed to load, falling back to SVG');
            // Could implement fallback to SVG here if needed
        });
    }
    
    // Initialize WebGL Earth globe if container exists
    if (webglEarthContainer && typeof WE !== 'undefined') {
        try {
            // Initialize WebGL Earth
            const earth = new WE.map('earth', {
                zoom: 3,
                center: [27.7172, 85.3240], // Start centered on Nepal
                sky: true,
                atmosphere: true
            });
            
            // Add satellite imagery layer
            WE.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '© Esri, NASA, USGS'
            }).addTo(earth);
            
            // Store the earth instance globally for access from search functions
            window.earthGlobe = earth;
            
            // Location search functionality
            const searchInput = document.getElementById('locationSearch');
            const searchBtn = document.getElementById('searchBtn');
            const destinationTags = document.querySelectorAll('.destination-tag');
            
            // Predefined locations for quick access
            const locations = {
                'Nepal': [27.7172, 85.3240],
                'Kathmandu': [27.7172, 85.3240],
                'Pokhara': [28.2096, 83.9856],
                'Everest': [27.9881, 86.9250],
                'Chitwan': [27.5291, 84.3542],
                'Lumbini': [27.4833, 83.2667],
                'Annapurna': [28.5967, 83.8203],
                'Tibet': [29.6474, 91.1175],
                'Bhutan': [27.5142, 90.4336],
                'India': [20.5937, 78.9629],
                'Thailand': [15.8700, 100.9925],
                'Myanmar': [21.9162, 95.9560],
                'China': [35.8617, 104.1954]
            };
            
            // Function to search and zoom to location
            function searchLocation(query) {
                const location = locations[query];
                if (location) {
                    earth.setCenter(location);
                    earth.setZoom(8);
                    
                    // Add a marker for the location
                    addLocationMarker(location, query);
                    
                    console.log(`Navigated to ${query}: ${location}`);
                } else {
                    // Try to geocode the location using a simple approach
                    geocodeLocation(query);
                }
            }
            
            // Simple geocoding function (you could enhance this with a real geocoding service)
            function geocodeLocation(query) {
                console.log(`Searching for: ${query}`);
                // For now, just show a message
                alert(`Location "${query}" not found in predefined locations. Try: Nepal, Kathmandu, Pokhara, Everest, Chitwan, Lumbini`);
            }
            
            // Add location marker
            function addLocationMarker(coords, name) {
                // Remove existing markers
                const existingMarkers = document.querySelectorAll('.location-marker');
                existingMarkers.forEach(marker => marker.remove());
                
                // Create new marker (simplified approach)
                const marker = WE.marker(coords).addTo(earth);
                console.log(`Added marker for ${name} at ${coords}`);
            }
            
            // Search button event
            if (searchBtn) {
                searchBtn.addEventListener('click', function() {
                    const query = searchInput.value.trim();
                    if (query) {
                        searchLocation(query);
                    }
                });
            }
            
            // Search input enter key
            if (searchInput) {
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const query = this.value.trim();
                        if (query) {
                            searchLocation(query);
                        }
                    }
                });
            }
            
            // Destination tag clicks
            destinationTags.forEach(tag => {
                tag.addEventListener('click', function() {
                    const location = this.getAttribute('data-location');
                    searchLocation(location);
                    if (searchInput) {
                        searchInput.value = location;
                    }
                });
            });
            
            // Globe controls
            const zoomInBtn = document.getElementById('zoomIn');
            const zoomOutBtn = document.getElementById('zoomOut');
            const resetViewBtn = document.getElementById('resetView');
            
            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', function() {
                    const currentZoom = earth.getZoom();
                    earth.setZoom(Math.min(currentZoom + 1, 18));
                });
            }
            
            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', function() {
                    const currentZoom = earth.getZoom();
                    earth.setZoom(Math.max(currentZoom - 1, 1));
                });
            }
            
            if (resetViewBtn) {
                resetViewBtn.addEventListener('click', function() {
                    earth.setCenter([27.7172, 85.3240]); // Reset to Nepal
                    earth.setZoom(3);
                    if (searchInput) {
                        searchInput.value = '';
                    }
                    // Remove markers
                    const existingMarkers = document.querySelectorAll('.location-marker');
                    existingMarkers.forEach(marker => marker.remove());
                });
            }
            
            // Auto-rotation (can be paused/resumed)
            let rotationEnabled = true;
            let rotation = 85.3240; // Start from Nepal longitude
            
            const rotateEarth = () => {
                if (rotationEnabled) {
                    rotation += 0.05;
                    earth.setCenter([27.7172, rotation % 360]);
                }
                requestAnimationFrame(rotateEarth);
            };
            
            // Start rotation after initial load
            setTimeout(() => {
                rotateEarth();
            }, 2000);
            
            // Pause rotation on interaction
            earth.on('click', function() {
                rotationEnabled = false;
                setTimeout(() => {
                    rotationEnabled = true;
                }, 5000); // Resume after 5 seconds
            });
            
            // Add hover effects to container
            const globeContainer = webglEarthContainer.closest('.globe-container');
            if (globeContainer) {
                globeContainer.addEventListener('mouseenter', function() {
                    webglEarthContainer.style.animationPlayState = 'paused';
                    webglEarthContainer.style.transform = 'scale(1.02)';
                    webglEarthContainer.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))';
                    rotationEnabled = false; // Pause rotation on hover
                });
                
                globeContainer.addEventListener('mouseleave', function() {
                    webglEarthContainer.style.animationPlayState = 'running';
                    webglEarthContainer.style.transform = '';
                    webglEarthContainer.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))';
                    setTimeout(() => {
                        rotationEnabled = true; // Resume rotation
                    }, 1000);
                });
            }
            
            console.log('WebGL Earth globe initialized successfully with search functionality');
            
        } catch (error) {
            console.warn('WebGL Earth failed to initialize:', error);
            // Fallback could be implemented here
        }
    }
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animateElements = document.querySelectorAll(
        '.service-card, .destination-card, .stat-card, .expertise-item, .contact-item'
    );
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        
        observer.observe(element);
    });
    
    // Add CSS for animate-in class
    if (!document.querySelector('#scroll-animations-style')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations-style';
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Animate counters in stats section
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

/**
 * Animate counter numbers
 */
function animateCounter(element) {
    const finalNumber = element.textContent.replace(/\D/g, '');
    const suffix = element.textContent.replace(/[\d]/g, '');
    
    if (!finalNumber) return;
    
    const duration = 2000;
    const start = 0;
    const end = parseInt(finalNumber);
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Enhance contact section functionality
 */
function initContactEnhancements() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover glow effect
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 123, 255, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add ripple effect styles
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            .contact-btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize performance optimizations
 */
function initPerformanceOptimizations() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle any resize-specific logic here
            console.log('Window resized');
        }, 250);
    });
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

/**
 * Utility function to throttle function calls
 */
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

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.querySelectorAll('.animated-globe').forEach(globe => {
            globe.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page becomes visible
        document.querySelectorAll('.animated-globe').forEach(globe => {
            globe.style.animationPlayState = 'running';
        });
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            document.querySelector('.navbar-toggler').click();
        }
    }
    
    // Handle Enter key on contact buttons for better accessibility
    if (e.key === 'Enter' && e.target.classList.contains('contact-btn')) {
        e.target.click();
    }
});

// Error handling for failed resource loads
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Failed to load image:', e.target.src);
        // You could set a fallback image here
        // e.target.src = '/static/assets/fallback-image.svg';
    }
});

console.log('Sanskar Shrestha Portfolio - JavaScript loaded successfully');
