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

        // Create low-poly Earth geometry
        const geometry = new THREE.IcosahedronGeometry(5, 1);
        
        // Create base Earth material (blue oceans)
        const earthMaterial = new THREE.MeshLambertMaterial({
            color: 0x4a90e2,
            flatShading: true
        });

        // Create Earth mesh
        const earth = new THREE.Mesh(geometry, earthMaterial);
        scene.add(earth);

        // Add colorful continents as separate meshes
        createContinents(earth);
        
        // Add small characters and objects around the globe
        createCharacters(scene);

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
            
            // Subtle floating motion
            earth.position.y = Math.sin(Date.now() * 0.001) * 0.1;
            
            // Animate characters if they exist
            if (scene.userData.characters) {
                scene.userData.characters.forEach((character, index) => {
                    // Orbital motion around the globe
                    const time = Date.now() * 0.001;
                    const radius = 8 + index * 0.5;
                    const speed = 0.3 + index * 0.1;
                    const offset = index * Math.PI * 0.5;
                    
                    character.position.x = Math.cos(time * speed + offset) * radius;
                    character.position.z = Math.sin(time * speed + offset) * radius;
                    character.position.y += Math.sin(time * 2 + offset) * 0.05;
                    
                    // Rotate characters to face movement direction
                    character.rotation.y = time * speed + offset + Math.PI / 2;
                });
            }
            
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
 * Create colorful continents on the Earth
 */
function createContinents(earth) {
    // Create continent geometries with different colors
    const continentData = [
        // Asia (green)
        { color: 0x7cb342, position: new THREE.Vector3(2, 3, 3), scale: 1.5 },
        { color: 0x8bc34a, position: new THREE.Vector3(1.5, 2.5, 3.5), scale: 1.2 },
        
        // Europe (green)
        { color: 0x66bb6a, position: new THREE.Vector3(0.5, 3.5, 3), scale: 0.8 },
        
        // Africa (green/yellow)
        { color: 0x9ccc65, position: new THREE.Vector3(-1, 1, 4), scale: 1.3 },
        { color: 0xcddc39, position: new THREE.Vector3(-0.5, 0, 4.2), scale: 1.0 },
        
        // Americas (green/yellow)
        { color: 0x7cb342, position: new THREE.Vector3(-3, 2, 2), scale: 1.2 },
        { color: 0xfdd835, position: new THREE.Vector3(-3.5, 0, 1.5), scale: 1.4 },
        { color: 0x8bc34a, position: new THREE.Vector3(-3, -2, 2.5), scale: 1.1 },
        
        // Australia (small green)
        { color: 0x66bb6a, position: new THREE.Vector3(2.5, -2, 3), scale: 0.6 }
    ];

    continentData.forEach(continent => {
        const continentGeometry = new THREE.IcosahedronGeometry(0.8 * continent.scale, 0);
        const continentMaterial = new THREE.MeshLambertMaterial({
            color: continent.color,
            flatShading: true
        });
        
        const continentMesh = new THREE.Mesh(continentGeometry, continentMaterial);
        continentMesh.position.copy(continent.position);
        continentMesh.scale.setScalar(0.3);
        
        earth.add(continentMesh);
    });
}

/**
 * Create small characters and objects around the globe
 */
function createCharacters(scene) {
    const characters = [];
    
    // Walking character on top
    const character1 = createWalkingCharacter();
    character1.position.set(0, 8, 0);
    scene.add(character1);
    characters.push(character1);
    
    // Satellite
    const satellite = createSatellite();
    satellite.position.set(-8, 3, 0);
    scene.add(satellite);
    characters.push(satellite);
    
    // Rocket
    const rocket = createRocket();
    rocket.position.set(6, -2, 4);
    scene.add(rocket);
    characters.push(rocket);
    
    // Airplane
    const airplane = createAirplane();
    airplane.position.set(-5, 6, 3);
    scene.add(airplane);
    characters.push(airplane);
    
    // Store characters for animation
    scene.userData.characters = characters;
}

/**
 * Create a simple walking character
 */
function createWalkingCharacter() {
    const character = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.IcosahedronGeometry(0.3, 0);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.2;
    character.add(head);
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.8, 6);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.4;
    character.add(body);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6, 4);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.4, 0.6, 0);
    leftArm.rotation.z = 0.3;
    character.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.4, 0.6, 0);
    rightArm.rotation.z = -0.3;
    character.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6, 4);
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -0.3, 0);
    character.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -0.3, 0);
    character.add(rightLeg);
    
    return character;
}

/**
 * Create a satellite
 */
function createSatellite() {
    const satellite = new THREE.Group();
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    satellite.add(body);
    
    // Solar panels
    const panelGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.8);
    const panelMaterial = new THREE.MeshLambertMaterial({ color: 0x1565c0 });
    
    const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    leftPanel.position.set(-1, 0, 0);
    satellite.add(leftPanel);
    
    const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    rightPanel.position.set(1, 0, 0);
    satellite.add(rightPanel);
    
    return satellite;
}

/**
 * Create a rocket
 */
function createRocket() {
    const rocket = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.3, 1.5, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xf44336 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    rocket.add(body);
    
    // Nose cone
    const noseGeometry = new THREE.ConeGeometry(0.2, 0.5, 8);
    const noseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.y = 1;
    rocket.add(nose);
    
    // Fins
    const finGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.3);
    const finMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    for (let i = 0; i < 3; i++) {
        const fin = new THREE.Mesh(finGeometry, finMaterial);
        fin.position.y = -0.5;
        fin.position.x = Math.cos(i * Math.PI * 2 / 3) * 0.3;
        fin.position.z = Math.sin(i * Math.PI * 2 / 3) * 0.3;
        rocket.add(fin);
    }
    
    return rocket;
}

/**
 * Create an airplane
 */
function createAirplane() {
    const airplane = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.15, 1.2, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    airplane.add(body);
    
    // Wings
    const wingGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.3);
    const wingMaterial = new THREE.MeshLambertMaterial({ color: 0x2196f3 });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    airplane.add(wings);
    
    // Tail
    const tailGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.2);
    const tailMaterial = new THREE.MeshLambertMaterial({ color: 0x2196f3 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.x = -0.5;
    airplane.add(tail);
    
    return airplane;
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
                </defs>
                
                <!-- Earth -->
                <circle cx="200" cy="200" r="160" fill="url(#earthGradient)" class="earth-sphere"/>
                
                <!-- Colorful continents -->
                <g class="continents">
                    <!-- Asia (green) -->
                    <polygon points="220,120 280,140 270,180 230,170" fill="#7cb342" class="continent"/>
                    <polygon points="230,170 270,180 260,200 240,190" fill="#8bc34a" class="continent"/>
                    
                    <!-- Europe (green) -->
                    <polygon points="180,110 220,120 210,140 190,130" fill="#66bb6a" class="continent"/>
                    
                    <!-- Africa (green/yellow) -->
                    <polygon points="160,160 200,170 190,220 170,210" fill="#9ccc65" class="continent"/>
                    <polygon points="170,210 190,220 180,250 160,240" fill="#cddc39" class="continent"/>
                    
                    <!-- Americas (green/yellow) -->
                    <polygon points="80,140 120,150 110,180 90,170" fill="#7cb342" class="continent"/>
                    <polygon points="70,180 110,190 100,230 80,220" fill="#fdd835" class="continent"/>
                    <polygon points="90,230 130,240 120,270 100,260" fill="#8bc34a" class="continent"/>
                    
                    <!-- Australia (small green) -->
                    <polygon points="260,240 280,245 275,260 265,255" fill="#66bb6a" class="continent"/>
                </g>
                
                <!-- Characters around the globe -->
                <g class="characters">
                    <!-- Walking person on top -->
                    <g transform="translate(200, 50)">
                        <circle cx="0" cy="0" r="8" fill="#ffffff" class="character-head"/>
                        <rect x="-6" y="8" width="12" height="20" fill="#333333" class="character-body"/>
                        <line x1="-10" y1="15" x2="-15" y2="25" stroke="#ffffff" stroke-width="3" class="character-arm"/>
                        <line x1="10" y1="15" x2="15" y2="25" stroke="#ffffff" stroke-width="3" class="character-arm"/>
                        <line x1="-3" y1="28" x2="-8" y2="40" stroke="#ffffff" stroke-width="3" class="character-leg"/>
                        <line x1="3" y1="28" x2="8" y2="40" stroke="#ffffff" stroke-width="3" class="character-leg"/>
                    </g>
                    
                    <!-- Satellite -->
                    <g transform="translate(80, 120)" class="satellite">
                        <rect x="-15" y="-8" width="30" height="16" fill="#cccccc"/>
                        <rect x="-35" y="-2" width="15" height="4" fill="#1565c0"/>
                        <rect x="20" y="-2" width="15" height="4" fill="#1565c0"/>
                    </g>
                    
                    <!-- Rocket -->
                    <g transform="translate(320, 280)" class="rocket">
                        <polygon points="0,-20 -8,15 8,15" fill="#f44336"/>
                        <polygon points="0,-20 -4,-30 4,-30" fill="#ffffff"/>
                        <polygon points="-8,15 -12,25 -4,25" fill="#333333"/>
                        <polygon points="8,15 12,25 4,25" fill="#333333"/>
                    </g>
                    
                    <!-- Airplane -->
                    <g transform="translate(120, 80)" class="airplane">
                        <ellipse cx="0" cy="0" rx="25" ry="4" fill="#ffffff"/>
                        <rect x="-30" y="-2" width="60" height="4" fill="#2196f3"/>
                        <rect x="-25" y="-8" width="4" height="16" fill="#2196f3"/>
                    </g>
                </g>
            </svg>
        </div>
    `;

    // Add CSS animation for rotation
    const style = document.createElement('style');
    style.textContent = `
        .fallback-globe svg {
            animation: slowRotate 30s linear infinite;
        }
        .continent {
            animation: continentPulse 3s ease-in-out infinite alternate;
        }
        .characters {
            animation: characterFloat 4s ease-in-out infinite alternate;
        }
        .satellite {
            animation: satelliteOrbit 8s linear infinite;
        }
        .rocket {
            animation: rocketFloat 2s ease-in-out infinite alternate;
        }
        .airplane {
            animation: airplaneFloat 3s ease-in-out infinite alternate;
        }
        @keyframes slowRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes continentPulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        @keyframes characterFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
        @keyframes satelliteOrbit {
            from { transform: translate(80px, 120px) rotate(0deg) translate(20px) rotate(0deg); }
            to { transform: translate(80px, 120px) rotate(360deg) translate(20px) rotate(-360deg); }
        }
        @keyframes rocketFloat {
            0%, 100% { transform: translate(320px, 280px) translateY(0px); }
            50% { transform: translate(320px, 280px) translateY(-8px); }
        }
        @keyframes airplaneFloat {
            0%, 100% { transform: translate(120px, 80px) translateY(0px); }
            50% { transform: translate(120px, 80px) translateY(-6px); }
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