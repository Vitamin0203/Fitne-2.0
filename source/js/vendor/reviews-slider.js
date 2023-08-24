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
