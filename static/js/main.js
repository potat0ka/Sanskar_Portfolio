/*
 * Main JavaScript for Sanskar Shrestha Portfolio
 * Handles Three.js globe animation and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all functionality
    initThreeJSGlobe();
    initSmoothScrolling();
    initScrollAnimations();
    
    console.log('Portfolio JavaScript initialized successfully');
});

/**
 * Initialize Three.js Earth Globe
 */
function initThreeJSGlobe() {
    const container = document.getElementById('globe-canvas');
    if (!container) {
        console.warn('Globe container not found');
        return;
    }

    if (typeof THREE === 'undefined') {
        console.warn('Three.js library not loaded, creating fallback globe');
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

        // Create Earth geometry
        const geometry = new THREE.SphereGeometry(5, 64, 64);
        
        // Create realistic Earth material
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

        // Add rim lighting
        const rimLight = new THREE.DirectionalLight(0x4a90e2, 0.3);
        rimLight.position.set(-10, 0, -5);
        scene.add(rimLight);

        // Position camera
        camera.position.z = 15;

        // Add stars background
        createStarField(scene);

        // Animation loop with slow rotation (30 seconds per revolution)
        function animate() {
            requestAnimationFrame(animate);
            
            // Slow, smooth rotation
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
 * Create star field background for Three.js scene
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
 * Create fallback animated globe when Three.js fails
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
                <circle cx="200" cy="180" r="4" fill="#FFCB82" class="location-marker">
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
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    // Handle CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#about');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Handle all smooth scroll links
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
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add scroll indicator behavior
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
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