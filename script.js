//your JS code here. If required.
const playBtn = document.querySelector(".play");
const audio = document.getElementById("medAudio");
const video = document.getElementById("bgVideo");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");

let fakeDuration = 600; // default 10 minutes
let timer;

// Update duration when time button is clicked
timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.id === "smaller-mins") fakeDuration = 120;
    if (button.id === "medium-mins") fakeDuration = 300;
    if (button.id === "long-mins") fakeDuration = 600;
    updateTimeDisplay(fakeDuration);
  });
});

// Change audio/video source
soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sound = `./Sounds/${button.dataset.sound}.mp3`;
    const vid = `./Sounds/${button.dataset.video}.mp4`;
    audio.src = sound;
    video.src = vid;
    audio.load();
    video.load();
    if (!audio.paused) {
      audio.play();
      video.play();
    }
  });
});

// Play/pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    video.play();
    playBtn.textContent = "Pause";
    startCountdown();
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = "Play";
    clearInterval(timer);
  }
});

// Countdown logic
function startCountdown() {
  let remaining = fakeDuration;
  updateTimeDisplay(remaining);

  timer = setInterval(() => {
    remaining--;
    updateTimeDisplay(remaining);

    if (remaining <= 0) {
      clearInterval(timer);
      audio.pause();
      video.pause();
      playBtn.textContent = "Play";
      updateTimeDisplay(fakeDuration);
    }
  }, 1000);
}

// Format display time
function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
}
