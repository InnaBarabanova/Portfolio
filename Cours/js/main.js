// burger
let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.nav-link');

burger.addEventListener('click', function () {
   document.body.classList.toggle('header-active');
   menuLinks.forEach(function (el) {
      el.addEventListener('click', function () {
         document.body.classList.remove('header-active');
      });
   });
});