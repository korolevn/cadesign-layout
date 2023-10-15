const lists = Array.from(document.querySelectorAll(".slides"));

function initSlider(list) {
  const slides = list.querySelectorAll(".slide");
  const bullets = Array.from(list.parentElement.querySelectorAll(".slider-bullet"));
  const buttons = Array.from(list.parentElement.querySelectorAll(".slider-button"));

  const size = slides.length % 2 ? slides.length : slides.length - 1;
  const transitionWidth = 20;
  const gapProperty = parseInt(window.getComputedStyle(list)["column-gap"], 10);
  const gap = gapProperty ? gapProperty : 0;

  let startX = null;
  let dragX = null;
  let clickX = null;
  let currentSlide = 0;
  let slideWidth = slides[0].getBoundingClientRect().width;
  let x = -currentSlide * slideWidth;
  let currentSlideWasChanged = false;

  function setPosition() {
    list.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function calculateSlideWidth() {
    slideWidth = slides[0].getBoundingClientRect().width;
  }

  function dragging(e) {
    list.style.cursor = "grabbing";


    dragX = e.touches ? e.touches[0].pageX : e.pageX;
    const dragShift = dragX - clickX;
    x = startX + dragShift;

    setPosition();

    if (dragShift > transitionWidth && currentSlide > 0 && !currentSlideWasChanged) {
      currentSlideWasChanged = true;
      currentSlide -= 1;
    }
    if (dragShift < -transitionWidth && currentSlide < size - 1 && !currentSlideWasChanged) {
      currentSlideWasChanged = true;
      currentSlide += 1;
    }
  }

  function slide(index) {
    currentSlide = index;
    x = -index * slideWidth + (-gap * index);

    setPosition();

    bullets.map((bullet) => bullet.classList.remove("slider-bullet--active"));
    bullets[index].classList.add("slider-bullet--active");

    if (buttons.length !== 0) {
      buttons[0].removeAttribute("disabled", "disabled");
      buttons[1].removeAttribute("disabled", "disabled");
      if (currentSlide === 0) {
        buttons[0].setAttribute("disabled", "disabled");
      }
      if (currentSlide === size - 1) {
        buttons[1].setAttribute("disabled", "disabled");
      }
    }
  }

  function drop() {
    list.style.cursor = "grab";

    list.removeEventListener("mousemove", dragging);
    list.addEventListener("touchmove", dragging);
    list.removeEventListener("mouseup", drop);
    list.addEventListener("touchend", drop);

    slide(currentSlide);
  }

  function drag(e) {
    currentSlideWasChanged = false;
    clickX = e.touches ? e.touches[0].pageX : e.pageX;
    startX = x;

    list.addEventListener("mousemove", dragging);
    list.addEventListener("touchmove", dragging);
    list.addEventListener("mouseup", drop);
    list.addEventListener("touchend", drop);
  }

  list.style.transitionDuration = "0.3s";

  bullets[0].classList.add("slider-bullet--active");
  bullets.map((bullet, index) => bullet.addEventListener("click", () => {
    slide(index);
  }));

  if (buttons.length !== 0) {
    buttons[0].setAttribute("disabled", "disabled");

    buttons.map((button, index) => button.addEventListener("click", () => {
      // если первая кнопка - слайд влево, иначе вправо

      if (index === 0 && currentSlide > 0) {
        currentSlide -= 1;
        slide(currentSlide);
      }
      if (index === 1 && currentSlide < (size - 1)) {
        currentSlide += 1;
        slide(currentSlide);
      }
    }));
  }

  // троттлинг для оптимизации перерисовок при смене размера экрана
  function throttle(callee, timeout) {
    let timer = null;
    return function perform(...args) {
      if (timer) return;

      timer = setTimeout(() => {
        callee(...args);

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  list.addEventListener("mousedown", drag);
  list.addEventListener("touchstart", drag);
  window.addEventListener("resize", throttle(() => {
    calculateSlideWidth();
    slide(currentSlide);
  }, 300));
}

lists.map((list) => initSlider(list));
