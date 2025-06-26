/*
 * Main JavaScript for Sanskar Shrestha Portfolio
 * Handles Three.js globe animation and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    
    console.log('Portfolio JavaScript initialized successfully');
});

/**
 * Initialize Airplane Animation
 */
function initThreeJSGlobe() {
    const container = document.getElementById('globe-canvas');
    if (!container) {
        console.warn('Globe container not found');
        return;
    }

    // Create airplane animation container
    createAirplaneAnimation(container);
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
 * Create animated airplane display
 */
function createAirplaneAnimation(container) {
    container.innerHTML = `
        <div class="airplane-animation-container">
            <div class="airplane-wrapper">
                <div class="airplane">
                    <!-- Airplane body -->
                    <div class="airplane-body"></div>
                    <!-- Wings -->
                    <div class="airplane-wing-left"></div>
                    <div class="airplane-wing-right"></div>
                    <!-- Engines -->
                    <div class="airplane-engine-1"></div>
                    <div class="airplane-engine-2"></div>
                    <div class="airplane-engine-3"></div>
                    <div class="airplane-engine-4"></div>
                    <!-- Tail -->
                    <div class="airplane-tail"></div>
                    <div class="airplane-tail-fin"></div>
                    <!-- Landing gear -->
                    <div class="airplane-gear-front"></div>
                    <div class="airplane-gear-left"></div>
                    <div class="airplane-gear-right"></div>
                </div>
                
                <!-- Flight path lines -->
                <div class="flight-path path-1"></div>
                <div class="flight-path path-2"></div>
                <div class="flight-path path-3"></div>
                
                <!-- Clouds -->
                <div class="cloud cloud-1"></div>
                <div class="cloud cloud-2"></div>
                <div class="cloud cloud-3"></div>
            </div>
        </div>
    `;

    // Add CSS styles for airplane animation
    const style = document.createElement('style');
    style.textContent = `
        .airplane-animation-container {
            width: 100%;
            height: 100%;
            position: relative;
            background: linear-gradient(135deg, #626675 0%, #D1D3CE 50%, #BB4500 100%);
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 
                0 0 50px rgba(98, 102, 117, 0.3),
                0 0 100px rgba(98, 102, 117, 0.2);
        }
        
        .airplane-wrapper {
            width: 100%;
            height: 100%;
            position: relative;
            animation: airplaneFloat 6s ease-in-out infinite;
        }
        
        .airplane {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 40px;
            animation: airplaneFly 8s linear infinite;
        }
        
        .airplane-body {
            position: absolute;
            width: 100px;
            height: 12px;
            background: #666;
            border-radius: 0 50px 50px 0;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .airplane-wing-left,
        .airplane-wing-right {
            position: absolute;
            width: 45px;
            height: 8px;
            background: #888;
            border-radius: 4px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .airplane-wing-left {
            left: 25px;
            transform: translateY(-50%) rotate(-15deg);
        }
        
        .airplane-wing-right {
            left: 25px;
            transform: translateY(-50%) rotate(15deg);
        }
        
        .airplane-engine-1,
        .airplane-engine-2,
        .airplane-engine-3,
        .airplane-engine-4 {
            position: absolute;
            width: 8px;
            height: 6px;
            background: #444;
            border-radius: 50%;
        }
        
        .airplane-engine-1 {
            top: 30%;
            left: 35px;
        }
        
        .airplane-engine-2 {
            top: 65%;
            left: 35px;
        }
        
        .airplane-engine-3 {
            top: 30%;
            left: 50px;
        }
        
        .airplane-engine-4 {
            top: 65%;
            left: 50px;
        }
        
        .airplane-tail {
            position: absolute;
            width: 20px;
            height: 6px;
            background: #666;
            border-radius: 0 4px 4px 0;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }
        
        .airplane-tail-fin {
            position: absolute;
            width: 15px;
            height: 20px;
            background: #777;
            border-radius: 0 8px 8px 0;
            top: 50%;
            right: 5px;
            transform: translateY(-50%);
        }
        
        .airplane-gear-front,
        .airplane-gear-left,
        .airplane-gear-right {
            position: absolute;
            width: 3px;
            height: 8px;
            background: #333;
            border-radius: 0 0 2px 2px;
        }
        
        .airplane-gear-front {
            bottom: -8px;
            left: 15px;
        }
        
        .airplane-gear-left {
            bottom: -8px;
            left: 40px;
        }
        
        .airplane-gear-right {
            bottom: -8px;
            left: 55px;
        }
        
        .flight-path {
            position: absolute;
            height: 2px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 1px;
            animation: pathMove 4s linear infinite;
        }
        
        .path-1 {
            width: 150px;
            top: 25%;
            left: -20px;
            animation-delay: 0s;
        }
        
        .path-2 {
            width: 120px;
            top: 60%;
            left: -15px;
            animation-delay: 1.5s;
        }
        
        .path-3 {
            width: 100px;
            top: 80%;
            left: -10px;
            animation-delay: 3s;
        }
        
        .cloud {
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50px;
            animation: cloudFloat 10s linear infinite;
        }
        
        .cloud-1 {
            width: 40px;
            height: 20px;
            top: 15%;
            left: -50px;
        }
        
        .cloud-2 {
            width: 35px;
            height: 18px;
            top: 75%;
            left: -40px;
            animation-delay: 3s;
        }
        
        .cloud-3 {
            width: 30px;
            height: 15px;
            top: 40%;
            left: -35px;
            animation-delay: 6s;
        }
        
        @keyframes airplaneFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(0px) rotate(0deg); }
            75% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        @keyframes airplaneFly {
            0% { transform: translate(-50%, -50%) translateX(-20px); }
            50% { transform: translate(-50%, -50%) translateX(20px); }
            100% { transform: translate(-50%, -50%) translateX(-20px); }
        }
        
        @keyframes pathMove {
            0% { transform: translateX(0px); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateX(120px); opacity: 0; }
        }
        
        @keyframes cloudFloat {
            0% { transform: translateX(0px); }
            100% { transform: translateX(120px); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Airplane animation created');
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