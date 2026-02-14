const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 1800,
    autoplay: {
        delay: 2200,
        disableOnInteraction: false,
    },
    coverflowEffect: {
        rotate: 25,
        stretch: 0,
        depth: 180,
        modifier: 1.3,
        slideShadows: true,
    },
});