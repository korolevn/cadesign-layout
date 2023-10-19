import validator from "validator";

const fileDefaultCaption = "Загрузить резюме";
const requireCaption = "Это обязательное поле";
const invalidCaption = "Некорректные данные";
const invalidClass = "modal-form__input--invalid";
const validClass = "modal-form__input--valid";
const labelCaptionHoistClass = "modal-form__label-caption--hoist";

const inputs = Array.from(document.querySelectorAll(".modal-form__input"));
const datePicker = document.querySelector(".modal-form__datepicker");
const dateInputLabel = datePicker.parentNode;
const dateTextInput = dateInputLabel.querySelector(".modal-form__input--date-text");
const dateInputCaption = dateInputLabel.querySelector(".modal-form__input-caption");
const submitFormButton = document.querySelector(".agreement__send-form-button");
const agreementCheckbox = document.querySelector(".agreement__input");

const hideClearInvalidButton = (input) => {
  const clearInvalidButton = input.parentNode.querySelector(".modal-form__clear-invalid-button");
  clearInvalidButton.style.display = "none";
};

const showClearInvalidButton = (input) => {
  const clearInvalidButton = input.parentNode.querySelector(".modal-form__clear-invalid-button");
  clearInvalidButton.style.display = "block";
};

const clearInvalidInput = (input) => {
  input.value = "";

  hideClearInvalidButton(input);
};

const changeToValid = (input) => {
  input.classList.remove(invalidClass);
  input.classList.add(validClass);

  hideClearInvalidButton(input);
};

const changeToInvalid = (input) => {
  input.classList.remove(validClass);
  input.classList.add(invalidClass);

  showClearInvalidButton(input);
};

const validateInput = (input, isValid) => {
  if (isValid) {
    changeToValid(input);
  } else {
    changeToInvalid(input);
  }
};

const checkRequiredInputs = (input, inputCaption) => {
  if (input.required && input.value.length === 0) {
    input.classList.add(invalidClass);
    inputCaption.textContent = requireCaption;
  }
};

function makeFormSubmitted() {
  const isFormValid = () => {
    const invalidIsExist = () => inputs.some((input) => input.classList.contains(invalidClass));
    const requiredIsEmpty = () => inputs.some((input) => input.required && !input.value);

    return !invalidIsExist() && !requiredIsEmpty() && agreementCheckbox.checked;
  };

  if (isFormValid()) {
    submitFormButton.removeAttribute("disabled");
  } else {
    submitFormButton.setAttribute("disabled", "disabled");
  }
}

const checkedInvalidInput = (input, inputCaption) => {
  if (input.value.length > 0) {
    inputCaption.textContent = invalidCaption;
  }
  if (input.value.length === 0) {
    inputCaption.textContent = "";
    input.classList.remove(invalidClass);
    hideClearInvalidButton(input);
  }

  makeFormSubmitted();
};

const hoistLabelCaption = (labelCaption) => {
  labelCaption.classList.add(labelCaptionHoistClass);
};

const hoistDateLabel = () => {
  const dateLabelCaption = dateTextInput.parentNode.querySelector(".modal-form__label-caption");
  hoistLabelCaption(dateLabelCaption);
};

function onInputChange(e) {
  const input = e.target;
  const inputCaption = input.parentNode.querySelector(".modal-form__input-caption");
  const defaultInputLength = 5;

  checkRequiredInputs(input, inputCaption);

  switch (input.id) {
    case "vacancy":
      validateInput(input, validator.isLength(input.value, defaultInputLength));
      checkedInvalidInput(input, inputCaption);
      break;
    case "name":
      validateInput(input, validator.matches(
        input.value,
        /^[А-ЯЁ][а-яё]+([А-ЯЁ][а-яё]+)?\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/,
      ));
      // выражение проверяет три слова больше одной буквы, разделённые пробелами

      checkedInvalidInput(input, inputCaption);
      break;
    case "phone":
      validateInput(input, validator.isMobilePhone(input.value));
      checkedInvalidInput(input, inputCaption);
      break;
    case "email":
      validateInput(input, validator.isEmail(input.value));
      checkedInvalidInput(input, inputCaption);
      break;
    case "degree":
      validateInput(input, validator.isLength(input.value, defaultInputLength));
      checkedInvalidInput(input, inputCaption);
      break;
    case "address":
      validateInput(input, validator.isLength(input.value, defaultInputLength));
      checkedInvalidInput(input, inputCaption);
      break;
    case "birthday":
      validateInput(dateTextInput, validator.isDate(input.value, { format: "YYYY-MM-DD" }));

      hoistDateLabel();
      checkedInvalidInput(input, dateInputCaption);

      dateTextInput.value = input.value;
      break;
    case "resume":
      break;
    case "comment":
      validateInput(input, validator.isLength(input.value, defaultInputLength));
      checkedInvalidInput(input, inputCaption);
      break;
    default:
      break;
  }
}

function onInputFocus(e) {
  const input = e.target;
  const labelCaption = input.parentNode.querySelector(".modal-form__label-caption");

  labelCaption && hoistLabelCaption(labelCaption);
}

function onInputBlur(e) {
  const input = e.target;
  const inputCaption = input.parentNode.querySelector(".modal-form__input-caption");

  checkRequiredInputs(input, inputCaption);
}

inputs.map((input) => {
  input.addEventListener("focus", (e) => { onInputFocus(e); });
  input.addEventListener("input", (e) => {
    onInputChange(e);
  });
  input.addEventListener("blur", (e) => { onInputBlur(e); });

  const inputCaption = input.parentNode.querySelector(".modal-form__input-caption");
  const clearInvalidButton = input.parentNode.querySelector(".modal-form__clear-invalid-button");
  if (clearInvalidButton) {
    clearInvalidButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearInvalidInput(input);
      checkedInvalidInput(input, inputCaption);
      checkRequiredInputs(input, inputCaption);
      input.focus();
    });
  }
});

// checkbox

agreementCheckbox.addEventListener("change", () => { makeFormSubmitted(); });

// очистка формы

submitFormButton.addEventListener("click", () => {
  inputs.map((input) => {
    input.value = "";
    input.classList.remove(validClass);
  });

  submitFormButton.setAttribute("disabled", "disabled");
  agreementCheckbox.checked = false;
});

// file input

const fileInput = document.querySelector("#resume");
const fileLabelCaption = fileInput.parentNode.querySelector(".modal-form__label-caption");
const clearFilePickerButton = fileInput.parentNode.querySelector(".modal-form__clear-file-button");

fileInput.addEventListener("change", () => {
  fileLabelCaption.innerText = fileInput.files[0].name;
});

clearFilePickerButton.addEventListener("click", (e) => {
  e.preventDefault();
  fileLabelCaption.innerText = fileDefaultCaption;
});
