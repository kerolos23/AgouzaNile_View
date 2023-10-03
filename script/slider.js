const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    freeMode: true,
    effect: "fade",
});

var cardsSwiper = new Swiper(".mySwiper", {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    effect: "cards",
    // loop: true,
    grabCursor: true,
    TransitionEvent: 1000,
  });

var swiperReviews = new Swiper(".mySwiperReviews", {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
        slidesPerView: window.innerWidth <= 1024 ? 1 : 3,
        loop:true,
        spaceBetween: 30,
        PauseOnMouseEnter: true,
        freeMode: true,
});