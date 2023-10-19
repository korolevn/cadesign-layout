const player = document.querySelector(".video-section__player");
const video = player.querySelector(".video");
const playButton = player.querySelector(".video-button--play");
const pauseButton = player.querySelector(".video-button--pause");
const progressBar = player.querySelector(".progress-bar");
const time = player.querySelector(".controls__time");

const clearPauseButton = () => {
  pauseButton.style.display = "none";
  playButton.style.display = "block";
};
const clearPlayButton = () => {
  playButton.style.display = "none";
  pauseButton.style.display = "block";
};
const toggleVideo = () => {
  if (video.paused) {
    video.play();
    clearPlayButton();
  } else {
    video.pause();
    clearPauseButton();
  }
};

const updateProgressBar = () => {
  progressBar.value = (video.currentTime / video.duration) * 100;
  const checkTime = (units) => units < 10 ? `0${units}` : units;

  const minutes = Math.floor(video.currentTime / 60);
  const seconds = Math.floor(video.currentTime % 60);

  time.innerText = `${checkTime(minutes)}:${checkTime(seconds)}`;
};

const setTime = () => {
  video.currentTime = (progressBar.value * video.duration) / 100;
};

playButton.addEventListener("click", toggleVideo);
pauseButton.addEventListener("click", toggleVideo);
progressBar.addEventListener("change", setTime);
video.addEventListener("timeupdate", () => {
  updateProgressBar();
  if (video.currentTime === video.duration) {
    clearPauseButton();
  }
});
