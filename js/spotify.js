/* ===============================================
   🎵 SISTEMA DE REPRODUCTORES AUTOMÁTICO
   Detecta cada tarjeta Spotify sin IDs duplicados
   y maneja todo sin conflictos.
================================================ */

const musicaFondo = document.getElementById("musica"); // música de fondo

document.querySelectorAll(".spotify-card").forEach(card => {

    const audio = card.querySelector("audio");
    const playPause = card.querySelector(".play-btn");
    const progressBar = card.querySelector("input[type='range']");
    const currentTimeText = card.querySelector("#currentTime, span[id^='currentTime']");
    const durationText = card.querySelector("#duration, span[id^='duration']");
    const musicCardDiv = card.querySelector(".music-card");

    let isPlaying = false;

    /* DURACIÓN REAL */
    audio.addEventListener("loadedmetadata", () => {
        durationText.textContent = formatTime(audio.duration);
    });

    /* PLAY / PAUSE */
    playPause.addEventListener("click", () => {
        if (!isPlaying) {

            // Reproducir este
            audio.play();
            isPlaying = true;
            playPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
            musicCardDiv.classList.add("playing");

            // Mutear música de fondo
            if (musicaFondo) musicaFondo.muted = true;

            // Pausar todos los demás reproductores
            pauseOthers(card);

        } else {

            audio.pause();
            isPlaying = false;
            playPause.innerHTML = '<i class="fa-solid fa-play"></i>';
            musicCardDiv.classList.remove("playing");

            // Desmutear fondo después de 1 segundo
            setTimeout(() => {
                if (musicaFondo) musicaFondo.muted = false;
            }, 1000);
        }
    });

    /* ACTUALIZAR PROGRESO */
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;
            currentTimeText.textContent = formatTime(audio.currentTime);
        }
    });

    /* CONTROLAR PROGRESO */
    progressBar.addEventListener("input", () => {
        if (audio.duration) {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        }
    });

    /* CUANDO TERMINA */
    audio.addEventListener("ended", () => {
        playPause.innerHTML = '<i class="fa-solid fa-play"></i>';
        musicCardDiv.classList.remove("playing");
        isPlaying = false;

        setTimeout(() => {
            if (musicaFondo) musicaFondo.muted = false;
        }, 1000);
    });

});

/* PAUSAR LOS OTROS REPRODUCTORES AUTOMÁTICAMENTE */
function pauseOthers(currentCard) {
    document.querySelectorAll(".spotify-card").forEach(card => {
        if (card !== currentCard) {
            const audio = card.querySelector("audio");
            const playPause = card.querySelector(".play-btn");
            const musicCardDiv = card.querySelector(".music-card");

            if (!audio.paused) {
                audio.pause();
                playPause.innerHTML = '<i class="fa-solid fa-play"></i>';
                musicCardDiv.classList.remove("playing");
            }
        }
    });
}

/* FORMATO DE TIEMPOS */
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}
