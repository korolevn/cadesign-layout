const toggleButton = document.querySelector(".navigation__toggle-button");
const navigation = document.querySelector(".navigation");

toggleButton.addEventListener("click", () => {
  navigation.classList.toggle("navigation--opened");
  navigation.classList.toggle("navigation--closed");
});
