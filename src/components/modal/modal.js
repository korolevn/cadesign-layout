const modal = document.querySelector(".modal");
const modalActiveClass = "modal--active";

const formWindow = modal.querySelector(".modal__window--form");
const successWindow = modal.querySelector(".modal__window--success");
const modalOpenButtons = Array.from(document.querySelectorAll(".modal-open-button"));

function initModalWindow(modalWindow) {
  const modalCloseButton = modalWindow.querySelector(".modal__close-button");
  const sendFormButton = document.querySelector(".agreement__send-form-button");

  const openModal = () => {
    modal.style.display = "block";
    modal.classList.add(modalActiveClass);
  };

  const closeModal = () => {
    modal.classList.remove(modalActiveClass);
    modal.style.display = "none";
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
  modalCloseButton.addEventListener("click", closeModal);
  modal.addEventListener("click", closeModal);

  modalWindow.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  modalOpenButtons.map((modalOpenButton) => {
    modalOpenButton.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();

      formWindow.style.display = "block";
      successWindow.style.display = "none";
    });
  });

  sendFormButton.addEventListener("click", (e) => {
    e.preventDefault();

    formWindow.style.display = "none";
    successWindow.style.display = "block";
  });
}

initModalWindow(formWindow);
initModalWindow(successWindow);
