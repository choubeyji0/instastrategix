// Three.js 3D Sand Particles
let camera, scene, renderer, particles;

function initThree() {
    const container = document.querySelector('.hero');
    if (!container) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const particleCount = 8000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x786e57);
    const color2 = new THREE.Color(0x333333);
    const color3 = new THREE.Color(0xc0c0c0);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.7) * 4;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

        sizes[i] = Math.random() * 0.03 + 0.01;

        const rand = Math.random();
        const color = rand < 0.4 ? color3 : rand < 0.7 ? color2 : color1;
        color.toArray(colors, i * 3);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    animateThree();
}

function onMouseMove(event) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    gsap.to(particles.rotation, { y: x * 0.3, x: y * 0.3, duration: 2 });
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateThree() {
    requestAnimationFrame(animateThree);

    particles.rotation.y += 0.001;
    particles.position.x += 0.002;

    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += 0.005;
        positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001;
        if (positions[i] > 6) positions[i] = -4;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', initThree);
