const audio = document.querySelector(".player-container audio");
const video = document.querySelector(".vid-container video");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600; // default 10 mins
let currentTime = 0;
let timer;
let isPlaying = false;

audio.muted = true; // prevent autoplay block

function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timeDisplay.textContent = `${mins}:${secs}`; // match "10:0" not "10:00"
}

function startTimer() {
  currentTime = duration;
  updateTimeDisplay(currentTime);

  timer = setInterval(() => {
    currentTime--;
    updateTimeDisplay(currentTime);

    if (currentTime <= 0) {
      clearInterval(timer);
      playButton.textContent = "Play";
      audio.pause();
      video.pause();
      isPlaying = false;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function togglePlay() {
  if (!isPlaying) {
    audio.play();
    video.play();
    playButton.textContent = "Pause";
    isPlaying = true;
    startTimer();
  } else {
    audio.pause();
    video.pause();
    playButton.textContent = "Play";
    isPlaying = false;
    stopTimer();
  }
}

// Time selection buttons
timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const minutes = parseInt(button.getAttribute("data-time"));
    duration = minutes * 60;
    updateTimeDisplay(duration);
  });
});

// Sound switch buttons
soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sound = button.getAttribute("data-sound");
    const vid = button.getAttribute("data-video");

    audio.src = `./Sounds/${sound}`;
    video.src = `./Sounds/${vid}`;
    audio.load();
    video.load();

    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

// Play button event
playButton.addEventListener("click", togglePlay);

// Initial display
updateTimeDisplay(duration);
