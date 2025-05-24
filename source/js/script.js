

// бургер //

let navMain = document.querySelector('.header__down');
let navToggle = document.querySelector('.header__burger-toggle');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('header__down--closed')) {
    navMain.classList.remove('header__down--closed');
    navMain.classList.add('header__down--opened');
  } else {
    navMain.classList.add('header__down--closed');
    navMain.classList.remove('header__down--opened');
  }
});

//закрепленное меню в мобильной версии//
