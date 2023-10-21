const lists = Array.from(document.querySelectorAll(".slides"));

function initSlider(list) {
  const slides = list.querySelectorAll(".slide");
  const bullets = Array.from(list.parentElement.querySelectorAll(".slider-bullet"));
  const buttons = Array.from(list.parentElement.querySelectorAll(".slider-button"));

  const size = slides.length % 2 ? slides.length : slides.length - 1;
  const transitionWidth = 20;
  const gapProperty = parseInt(window.getComputedStyle(list)["column-gap"], 10);
  const gap = gapProperty ? gapProperty : 0;
  const activeBulletClass = "slider-bullet--active";

  let currentSlide = 0;
  let slideWidth = slides[0].getBoundingClientRect().width;

  let xCoord = -currentSlide * slideWidth;
  let startXCoord = null;
  let dragXCoord = null;
  let clickXCoord = null;
  let currentSlideWasChanged = false;

  function setPosition() {
    list.style.transform = `translate3d(${xCoord}px, 0, 0)`;
  }

  function calculateSlideWidth() {
    slideWidth = slides[0].getBoundingClientRect().width;
  }

  function dragging(e) {
    list.style.cursor = "grabbing";

    dragXCoord = e.touches ? e.touches[0].pageX : e.pageX;
    const dragShift = dragXCoord - clickXCoord;
    xCoord = startXCoord + dragShift;

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
    xCoord = -index * slideWidth + (-gap * index);

    setPosition();

    bullets.map((bullet) => bullet.classList.remove(activeBulletClass));
    bullets[index].classList.add(activeBulletClass);

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
    clickXCoord = e.touches ? e.touches[0].pageX : e.pageX;
    startXCoord = xCoord;
    calculateSlideWidth();

    list.addEventListener("mousemove", dragging);
    list.addEventListener("touchmove", dragging);
    list.addEventListener("mouseup", drop);
    list.addEventListener("touchend", drop);
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

  bullets[0].classList.add(activeBulletClass);
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

  list.addEventListener("mousedown", drag);
  list.addEventListener("touchstart", drag);
  window.addEventListener("resize", throttle(() => {
    calculateSlideWidth();
    slide(currentSlide);
  }, 300));
}

lists.map((list) => initSlider(list));
