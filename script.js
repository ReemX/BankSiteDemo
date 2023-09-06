'use strict';

///////////////////////////////////////
// Modal window
const header = document.querySelector('.header');
const cookiesMessage = document.createElement('div');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollButton = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//when clicking open account buttons will open modal.
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//when clicking the 'x' button in the modal will close modal.
btnCloseModal.addEventListener('click', closeModal);
//when clicking outside of modal (overlay) will close modal.
overlay.addEventListener('click', closeModal);
//when pressing esc key will close modal.
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

cookiesMessage.classList.add('cookie-message');
cookiesMessage.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit <button class="btn btn--close-cookie">Got it!</buttton>
`;
header.append(cookiesMessage);
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  cookiesMessage.remove();
});
cookiesMessage.style.backgroundColor = '#37383d';
cookiesMessage.style.width = '105%';
cookiesMessage.style.height =
  parseFloat(getComputedStyle(cookiesMessage).height, 10) + 25 + 'px';

scrollButton.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const randomRGB = function () {
  const randomNumber = function () {
    return Math.floor(Math.random() * 256);
  };
  return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
};

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if (e.target.classList.contains('nav__link') && id.includes('section')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Variables for elements
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  // picks the closest tab to the element clicked.
  const clicked = e.target.closest('.operations__tab');
  // guard clause
  if (!clicked) return;
  // dataset from clicked tab
  const clickedData = clicked.dataset.tab;
  // active tab
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // active content
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clickedData}`)
    .classList.add('operations__content--active');
});

const linkHoverEffect = function (e) {
  e.preventDefault();
  const hovered = e.target;
  const siblings = hovered.closest('.nav').querySelectorAll('.nav__link');
  const logo = hovered.closest('.nav').querySelector('img');
  if (hovered.classList.contains('nav__link')) {
    siblings.forEach(el => {
      if (el !== hovered) el.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};
const navBar = document.querySelector('.nav');
navBar.addEventListener('mouseover', linkHoverEffect.bind(0.5));
navBar.addEventListener('mouseout', linkHoverEffect.bind(1));

// sticky navigation bar function
const obsCallback = function (entries) {
  const [entry] = entries;
  !entry.isIntersecting
    ? navBar.classList.add('sticky')
    : navBar.classList.remove('sticky');
};
// options for observer
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navBar.getBoundingClientRect().height}px`,
};
// the observer itself
const headerobserver = new IntersectionObserver(obsCallback, obsOptions);
headerobserver.observe(header);

// all sections variable.
const allSections = document.querySelectorAll('.section');
// 'pop-in animation for sections'
const revealSections = function (entries, observer) {
  const [entry] = entries;
  // guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
// the observer for sections
const sectionObeserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});
// loops over sections and attaches the observer to said sections.
allSections.forEach(section => {
  // section.classList.add('section--hidden');
  sectionObeserver.observe(section);
});

// all lazy images.
const images = document.querySelectorAll('.features__img');
// lazy image loader funtion
const lazyLoader = function (entries, observer) {
  const [entry] = entries;
  // guard clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('lazy-img');
  entry.target.src = entry.target.dataset.src;
  observer.unobserve(entry.target);
};
// image event observer
const imageObserver = new IntersectionObserver(lazyLoader, {
  root: null,
  threshold: 1,
});
// pass images to observer
images.forEach(img => imageObserver.observe(img));

// all slide elements
const slides = document.querySelectorAll('.slide');
// slide index counter
let currSlide = 0;
// amount of slides
const maxSlide = slides.length;
// two slide buttons
const [btnLeft, btnRight] = document.querySelectorAll('.slider__btn');
// a funtion that goes to a slide in an index
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const updateDot = function (index) {
  dots.forEach(dot => dot.classList.remove('dots__dot--active'));
  dots[index].classList.add('dots__dot--active');
};
const dots = document.querySelectorAll('.dots__dot');
// dots.forEach(dot => (dot.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'));
const goToSlide = function (slideIndex) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
    updateDot(slideIndex);
  });
};
// initialzing the slides
goToSlide(0);
// go to the slide on the right
const nextSlide = function () {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
};
// go to the slide on the left
const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
};
// event listener for right slide button
btnRight.addEventListener('click', nextSlide);
// event listener for left slide button
btnLeft.addEventListener('click', prevSlide);
// event listener for left and right arrow keyboard buttons
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const index = Number(e.target.dataset.slide);
    currSlide = index;
    goToSlide(index);
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////Practice////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// window.addEventListener('scroll', function () {
//   const sec1Pos = section1.getBoundingClientRect().top;
//   sec1Pos < 0
//     ? navBar.classList.add('sticky')
//     : navBar.classList.remove('sticky');
// });
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomRGB();
// });
// document.body.addEventListener('click', function () {
//   const rgbs = [0, 0, 0];
//   setInterval(function () {
//     document.body.style.backgroundColor = `rgb(${rgbs[0]},${rgbs[1]},${rgbs[2]})`;
//     rgbs[0] += 10;
//     if (rgbs[0] === 250) {
//       rgbs[0] = 0;
//       rgbs[1] += 10;
//       if (rgbs[1] === 250) {
//         rgbs[1] = 0;
//         rgbs[2] += 10;
//         if (rgbs[2] === 250) {
//           rgbs[2] = 0;
//         }
//       }
//     }
//     console.log(rgbs);
//   }, 10);
// });
// console.log(document.body);

// const animationDuration = 30000;
// const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
// const body = document.body;
// let colorIndex = 0;

// function changeBackgroundColor() {
//   body.style.transition = `background-color ${
//     animationDuration / colors.length
//   }ms linear`;
//   body.style.backgroundColor = colors[colorIndex];
//   colorIndex = (colorIndex + 1) % colors.length;
// }

// setInterval(changeBackgroundColor, animationDuration / colors.length);
