/* --------------------------------------------
   💘 Partículas de corazones siguiendo el mouse
-------------------------------------------- */

document.addEventListener("mousemove", (e) => {
    const heart = document.createElement("div");
    heart.classList.add("heart-particle");

    /* Colores lindos */
    const colors = [
        "#ff8fa3", // rosa suave
        "#ff4d6d", // rojo rosado
        "#ffb3c6", // pastel rosa
        "#c77dff", // morado
        "#fcbf49", // naranja suave
        "#ff6f91"  // rosa fuerte
    ];

    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    /* Dibujar el corazón con CSS puro */
    heart.innerHTML = "❤";

    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.fontSize = (10 + Math.random() * 14) + "px";
    heart.style.zIndex = 9999;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});
