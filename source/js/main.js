import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана


  // Скрипт на видео
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});


function findVideos() {
  let videos = document.querySelectorAll('.video');

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(link);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  let url = media.href;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();


// выбор первого таба
document.querySelector('.months-list').click();

// скрипт для табов
const tabsTriggersitems = document.querySelectorAll('.tabs__triggers-item');
tabsTriggersitems.forEach((item) =>
  item.addEventListener('click', function (e) {
    e.preventDefault();

    const id = e.target.getAttribute('href').replace('#', '');

    document.querySelectorAll('.tabs__triggers-item').forEach(
        (child) => child.classList.remove('tabs__triggers-item--activ')
    );
    document.querySelectorAll('.tabs__content-item').forEach(
        (child) => child.classList.remove('tabs__content-item--activ')
    );

    item.classList.add('tabs__triggers-item--activ');
    document.getElementById(id).classList.add('tabs__content-item--activ');
  })

);

document.querySelector('.tabs__triggers-item').click();

// скрипт на аккордион
// eslint-disable-next-line no-new, no-undef
new Accordion('#tab-1');
// eslint-disable-next-line no-new, no-undef
new Accordion('#tab-2');
// eslint-disable-next-line no-new, no-undef
new Accordion('#tab-3');
// eslint-disable-next-line no-new, no-undef
new Accordion('#tab-4');

// swiper
// eslint-disable-next-line no-new, no-undef
new Swiper('.swiper', {

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
      spaceBetween: 40,
    },
  },

  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


// ---------------------------------

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
