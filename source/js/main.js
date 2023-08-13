/* eslint-disable no-undef */
/* eslint-disable no-new */
import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {findVideos} from './vendor/video';
import {initAccordions, accordions} from './vendor/init-accordion';
import {initTabs} from './vendor/init-tabs';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();
  initTabs();
  initAccordions();
  setTimeout(() => accordions.updateAccordionsHeight(), 1000);

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// swiper

// eslint-disable-next-line no-undef, new-cap
let mySwiper = new Swiper('#reviews-slider', {
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

function initTrainersSlider() {
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

initTrainersSlider();

// вызов скрипта для видео

findVideos();

/* // скрипт для табов
const tabsTriggersitems = document.querySelectorAll('.faq__item');
tabsTriggersitems.forEach((item) =>
  item.addEventListener('click', function (e) {
    e.preventDefault();

    const id = e.target.getAttribute('href').replace('#', '');

    document.querySelectorAll('.faq__item').forEach(
        (child) => child.classList.remove('faq__item--activ')
    );
    document.querySelectorAll('.faq-wrapper__item').forEach(
        (child) => child.classList.remove('faq-wrapper__item--activ')
    );

    item.classList.add('faq__item--activ');
    document.getElementById(id).classList.add('faq-wrapper__item--activ');
  })
);

// eslint-disable-next-line no-unused-expressions
document.querySelectorAll('.faq__item')[2].click();

// скрипт на аккордион
// eslint-disable-next-line no-new, no-undef
new Accordion('#tab-1');
// eslint-disable-next-line no-new, no-undef
new Accordion('#tab-2');
// eslint-disable-next-line no-new, no-undef
new Accordion('#tab-3');
// eslint-disable-next-line no-new, no-undef
new Accordion('#tab-4');
 */

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
