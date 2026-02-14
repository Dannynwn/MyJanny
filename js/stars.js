
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function createStars() {
    for (let i = 0; i < 380; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            alpha: Math.random(),
            speed: Math.random() * 0.02
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.alpha += star.speed;

        if (star.alpha <= 0 || star.alpha >= 1) {
            star.speed = -star.speed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 6);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "white";
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

createStars();
animateStars();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

(function () {

    const canvas = document.getElementById("space");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let stars = [];
    let comets = [];
    let moon;

    const STAR_COUNT = 180;
    const COMET_COUNT = 3;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    function randomMoon() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.6,
            size: 40 + Math.random() * 60,
            alpha: 0,
            fadingIn: true,
            timer: 0,
            duration: 4000 + Math.random() * 3000
        };
    }

    function randomComet() {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 2;

        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: 100 + Math.random() * 80
        };
    }

    function init() {

        stars = [];
        comets = [];

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                alpha: Math.random(),
                speed: Math.random() * 0.015
            });
        }

        for (let i = 0; i < COMET_COUNT; i++) {
            comets.push(randomComet());
        }

        moon = randomMoon();
    }

    init();

    function drawStars() {
        for (let star of stars) {

            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0) star.speed *= -1;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
            ctx.fill();
        }
    }

    function drawComets() {

        for (let comet of comets) {

            comet.x += comet.vx;
            comet.y += comet.vy;

            if (
                comet.x < -200 || comet.x > canvas.width + 200 ||
                comet.y < -200 || comet.y > canvas.height + 200
            ) {
                Object.assign(comet, randomComet());
            }

            let gradient = ctx.createLinearGradient(
                comet.x, comet.y,
                comet.x - comet.vx * comet.length,
                comet.y - comet.vy * comet.length
            );

            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");

            ctx.beginPath();
            ctx.moveTo(comet.x, comet.y);
            ctx.lineTo(
                comet.x - comet.vx * comet.length,
                comet.y - comet.vy * comet.length
            );
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    function drawMoon() {

        moon.timer += 16;

        // Fade in
        if (moon.fadingIn) {
            moon.alpha += 0.01;
            if (moon.alpha >= 1) {
                moon.alpha = 1;
                moon.fadingIn = false;
            }
        }

        // Fade out after duration
        if (moon.timer > moon.duration) {
            moon.alpha -= 0.01;
            if (moon.alpha <= 0) {
                moon = randomMoon();
            }
        }

        ctx.save();
        ctx.globalAlpha = moon.alpha;

        ctx.beginPath();
        ctx.arc(moon.x, moon.y, moon.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";
        ctx.fill();

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(moon.x + moon.size * 0.5, moon.y, moon.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

        ctx.restore();
    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawStars();
        drawComets();
        drawMoon();

        requestAnimationFrame(animate);
    }

    animate();

})();
