const switchVacancies = document.querySelector(".switch");
const switchInput = switchVacancies.querySelector(".switch__input");
const switchCaptions = Array.from(switchVacancies.querySelectorAll(".switch__caption-content"));
const switchCaptionChoosedClass = "switch__caption-content--choosed";

const switchToAllVacancies = () => {
  switchCaptions.map((caption) => caption.classList.toggle(switchCaptionChoosedClass));
};

switchInput.addEventListener("change", switchToAllVacancies);
