// ------------- VARIABLES ------------- //
let ticking = false;
const isFirefox = /Firefox/i.test(navigator.userAgent);
const isIe =
  /MSIE/i.test(navigator.userAgent) ||
  /Trident.*rv\:11\./i.test(navigator.userAgent);
const scrollSensitivitySetting = 30;
const slideDurationSetting = 600;
let currentSlideNumber = 0;
const totalSlideNumber = document.querySelectorAll('.background').length;

function parallaxScroll(evt) {
  let delta;
  if (isFirefox) {
    delta = evt.detail * -120;
  } else if (isIe) {
    delta = -evt.deltaY;
  } else {
    delta = evt.wheelDelta;
  }

  if (!ticking) {
    if (delta <= -scrollSensitivitySetting) {
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
    }
  }
}

const mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

function nextItem() {
  const previousSlide =
    document.querySelectorAll('.background')[currentSlideNumber - 1];
  previousSlide.classList.remove('up-scroll');
  previousSlide.classList.add('down-scroll');
}
