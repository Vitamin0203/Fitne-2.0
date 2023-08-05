import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import Accordion from './vendor/accordion';
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
  let link = video.querySelector('.video-link');
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
document.querySelector('.subscription__link').click();

// скрипт для табов
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

// swiper
// eslint-disable-next-line no-new, no-undef
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

const initTrainersSlider = () => {
  // eslint-disable-next-line no-unused-vars, no-undef, no-new
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
};
initTrainersSlider();

// скрипт для валидации
function validateName(name) {
  if (name.trim() === '') {
    return 'Введите имя';
  }
  return '';
}

// Функция для проверки валидности телефона
function validatePhone(phone) {
  if (phone.trim() === '') {
    return 'Введите телефон';
  }
  return '';
}

// Функция для обновления текста ошибки
function updateErrorLabel(labelElement, errorMessage) {
  labelElement.textContent = errorMessage;
  if (errorMessage) {
    labelElement.style.color = 'red';
    labelElement.style.marginTop = '34px';
  } else {
    labelElement.style.color = '';
    labelElement.style.marginTop = '';
  }
}

// Найти форму
const form = document.querySelector('.feedback-form__data');

// Найти элементы ввода и метки
const nameInput = form.querySelector('input[name="name"]');
const phoneInput = form.querySelector('input[name="phone"]');
const nameLabel = form.querySelector('.form-name');
const phoneLabel = form.querySelector('.form-phone');

// Обработчик события отправки формы
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Проверка валидности имени и обновление текста ошибки
  const nameError = validateName(nameInput.value);
  updateErrorLabel(nameLabel, nameError);

  // Проверка валидности телефона и обновление текста ошибки
  const phoneError = validatePhone(phoneInput.value);
  updateErrorLabel(phoneLabel, phoneError);

  // Если нет ошибок, очистить форму
  if (!nameError && !phoneError) {
    form.reset();
  }
});

// Обработчик события клика по кнопке отправки формы
const submitButton = form.querySelector('.btn');
submitButton.addEventListener('click', function () {
  form.dispatchEvent(new Event('submit'));
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
