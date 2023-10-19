const modal = document.querySelector(".modal");
const formWindow = modal.querySelector(".modal__window--form");
const successWindow = modal.querySelector(".modal__window--success");
const modalOpenButtons = Array.from(document.querySelectorAll(".modal-open-button"));

function initModalWindow(modalWindow) {
  const modalCloseButton = modalWindow.querySelector(".modal__close-button");
  const sendFormButton = document.querySelector(".agreement__send-form-button");

  function clearModal() {
    formWindow.style.display = "block";
    successWindow.style.display = "none";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalWindow.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  modalOpenButtons.map((modalOpenButton) => {
    modalOpenButton.addEventListener("click", (e) => {
      e.preventDefault();

      modal.style.display = "block";
      modal.scrollIntoView();

      clearModal();
    });
  });

  modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  sendFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    formWindow.style.display = "none";
    successWindow.style.display = "block";
  });
}

initModalWindow(formWindow);
initModalWindow(successWindow);
