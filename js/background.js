// Animated Floating Circles
function initBackgroundAnimation() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const circles = [];
    const circleCount = 30;

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < circleCount; i++) {
        circles.push({
            x: random(0, width),
            y: random(0, height),
            radius: random(20, 80),
            speed: random(0.2, 0.8),
            color: `rgba(255, 255, 255, ${random(0.05, 0.2)})`
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        circles.forEach(circle => {
            circle.y -= circle.speed;
            if (circle.y + circle.radius < 0) {
                circle.y = height + circle.radius;
                circle.x = random(0, width);
            }

            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = circle.color;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

// Initialize background animation
document.addEventListener('DOMContentLoaded', initBackgroundAnimation);
