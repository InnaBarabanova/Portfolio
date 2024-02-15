/* аккордион*/
$(".accordion").accordion({
  heightStyle: "content",
  collapsible: true,
  active: false
});

/* бургер*/
let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.nav-list__link');

burger.addEventListener('click', function () {
  document.body.classList.toggle('header-active');
  menuLinks.forEach(function (el) {
    el.addEventListener('click', function () {
      document.body.classList.remove('header-active');
    });
  });
});



/* слайдер*/
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    lastSlideMessage: 'Это последний слайд',
    firstSlideMessage: 'Это первый слайд',
    paginationBulletMessage: 'Перейти к следующему слайду из трех',
  },
});

/*табы*/
let tabBtn = document.querySelectorAll('.tab__link');
let tabItem = document.querySelectorAll('.article-tab');

tabBtn.forEach(function (tabsBtn) {
  tabsBtn.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;
    tabBtn.forEach(function (btn) {
      btn.classList.remove('tab__link--active')
    })
    e.currentTarget.classList.add('tab__link--active');
    tabItem.forEach(function (tabsBtn) {
      tabsBtn.classList.remove('article-tab--active');
    });
    document.querySelector(`[data-target = "${path}"]`).classList.add('article-tab--active');
  });
});

/* поле поиска */
let loupe = document.querySelector('.header__btn');
let search = document.querySelector('.header-form');
let reset = document.querySelector('.header-form__btn-close');


loupe.addEventListener('click', function () {
  search.classList.add('header-form--active');
});

reset.addEventListener('click', function () {
  search.classList.remove('header-form--active')
});

/* чекбокс */
let checkbox = document.querySelector('.checkbox');

checkbox.addEventListener('click', function () {
  checkbox.classList.toggle('checkbox--active');
  if (checkbox.getAttribute('aria-checked') === 'true') {
    checkbox.setAttribute('aria-checked', 'false');
  } else {
    checkbox.setAttribute('aria-checked', 'true');
  };
});

checkbox.addEventListener('keydown', function (event) {
  switch (event.key) {
    case ' ':
    case 'Enter':
      if (checkbox.getAttribute('aria-checked') === 'true') {
        checkbox.setAttribute('aria-checked', 'false');
      } else {
        checkbox.setAttribute('aria-checked', 'true');
      };
      checkbox.classList.toggle('checkbox--active');
      break;
  }
});

