export function initReviewsSlider() {
  const mySwiper = new Swiper('#reviews-slider', {
  direction: 'horizontal',
  navigation: {
    nextEl: '.reviews-box__arrow--next',
    prevEl: '.reviews-box__arrow--prev',
  },
});

mySwiper.on('slideChange', function () {
  // Заблокировать кнопку "назад" при первом слайде
  if (mySwiper.activeIndex === 0) {
    mySwiper.navigation.$prevEl.addClass('reviews-box__arrow--prev-disabled');
  } else {
    mySwiper.navigation.$prevEl.removeClass('reviews-box__arrow--prev-disabled');
  }

  // Заблокировать кнопку "вперед" при последнем слайде
  if (mySwiper.activeIndex === mySwiper.slides.length - 1) {
    mySwiper.navigation.$nextEl.addClass('reviews-box__arrow--next-disabled');
  } else {
    mySwiper.navigation.$nextEl.removeClass('reviews-box__arrow--next-disabled');
  }
});

}

export function initTrainersSlider() {
  new Swiper('#trainers-slaider', {
    slidesPerView: 4,
    spaceBetween: 60,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },

    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
