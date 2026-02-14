/* -------------------------------------------
   🌸 Fondo blanco + ocultar carta al inicio
------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("carta").style.display = "none";

    const tree = document.querySelector(".tree");
    const leftText = document.querySelector(".left-text");

    if (tree) tree.style.opacity = "0";
    if (leftText) leftText.style.opacity = "0";

    startHeartSnow();
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("carta").style.display = "none";

    const tree = document.querySelector(".tree");
    const leftText = document.querySelector(".left-text");

    if (tree) tree.style.opacity = "0";
    if (leftText) leftText.style.opacity = "0";

    startHeartSnow2();
});



/* -------------------------------------------
   ❤️ Corazones cayendo desde arriba
------------------------------------------- */
function startHeartSnow() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "❤";
        heart.style.position = "fixed";
        heart.style.color = "rgb(255, 80, 141)";
        heart.style.fontSize = (15 + Math.random() * 30) + "px";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = "-20px";
        heart.style.pointerEvents = "none";
        heart.style.animation = `fallHeart ${9 + Math.random() * 9}s linear`;
        heart.style.zIndex = "1";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 9000);
    }, 300);
}

function startHeartSnow2() {
    setInterval(() => {
        const heart2 = document.createElement("div");
        heart2.innerHTML = "❤";
        heart2.style.position = "fixed";
        heart2.style.color = "rgb(255, 166, 221)";
        heart2.style.fontSize = (5 + Math.random() * 15) + "px";
        heart2.style.left = Math.random() * window.innerWidth + "px";
        heart2.style.top = "-20px";
        heart2.style.pointerEvents = "none";
        heart2.style.animation = `fallHeart ${9 + Math.random() * 9}s linear`;
        heart2.style.zIndex = "1";
        document.body.appendChild(heart2);
        setTimeout(() => heart2.remove(), 9000);
    }, 300);
}

/* -------------------------------------------
   💓 Animación del botón corazón
------------------------------------------- */
const heartBtn = document.getElementById("heartBtn");
heartBtn.classList.add("animate__animated", "animate__pulse");
heartBtn.style.animationDuration = "2s";
heartBtn.style.animationIterationCount = "infinite";

/* -------------------------------------------
   🎁 Click → despliega carta
------------------------------------------- */
const carta = document.getElementById("carta");

heartBtn.addEventListener("click", (e) => {
    explodeParticles(e.clientX, e.clientY);

    heartBtn.classList.add("animate__fadeOut");

    setTimeout(() => {
        heartBtn.style.display = "none";
    }, 700);

    setTimeout(() => {
        carta.style.display = "flex";
        carta.classList.add("animate__animated", "animate__fadeInUp");
        carta.style.opacity = "1";
    }, 600);

    const leftText = document.querySelector(".left-text");
    setTimeout(() => {
        leftText.style.opacity = "1";
        leftText.classList.add("animate__animated", "animate__fadeInUp");
    }, 1200);


    const audio = document.getElementById("audio");
    audio.volume = 0.04;
    audio.play();
});

/* -------------------------------------------
   💥 Explosión de partículas
------------------------------------------- */
function explodeParticles(x, y) {
    for (let i = 0; i < 35; i++) {
        const part = document.createElement("div");
        part.style.position = "fixed";
        part.style.left = x + "px";
        part.style.top = y + "px";
        part.style.width = part.style.height = "10px";
        part.style.background = `hsl(${Math.random() * 360},80%,70%)`;
        part.style.borderRadius = "50%";
        part.style.zIndex = "9999";
        part.style.transition = "transform 0.9s ease-out, opacity 0.9s";
        document.body.appendChild(part);

        setTimeout(() => {
            part.style.transform = `translate(${(Math.random() - 0.5) * 250}px, ${(Math.random() - 0.5) * 250}px) scale(0.3)`;
            part.style.opacity = "0";
        }, 30);

        setTimeout(() => part.remove(), 1100);
    }
}


document.addEventListener("DOMContentLoaded", function () {

    const wrappers = document.querySelectorAll(".video-wrapper");

    wrappers.forEach(wrapper => {

        const video = wrapper.querySelector("video");

        if (!video) return;

        video.loop = false;
        video.controls = false;

        wrapper.addEventListener("click", function () {

            // Pausar todos los demás videos primero
            document.querySelectorAll(".video-wrapper video").forEach(v => {
                if (v !== video) {
                    v.pause();
                    v.parentElement.classList.remove("playing");
                }
            });

            if (video.paused) {
                video.play();
                wrapper.classList.add("playing");
            } else {
                video.pause();
                wrapper.classList.remove("playing");
            }

        });

        video.addEventListener("ended", function () {
            wrapper.classList.remove("playing");
        });

    });

});

