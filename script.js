const playBtn = document.querySelector(".play");
const audio = document.getElementById("medAudio");
const video = document.getElementById("bgVideo");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");

let fakeDuration = 600;
let timer;

// Default time
updateTimeDisplay(fakeDuration);

// Update time
timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.id === "smaller-mins") fakeDuration = 120;
    else if (button.id === "medium-mins") fakeDuration = 300;
    else if (button.id === "long-mins") fakeDuration = 600;
    updateTimeDisplay(fakeDuration);
  });
});

// Switch sound and video
soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sound = `./Sounds/${button.dataset.sound}.mp3`;
    const vid = `./Sounds/${button.dataset.video}.mp4`;
    audio.src = sound;
    video.src = vid;
    if (!audio.paused) {
      audio.play();
      video.play();
    }
  });
});

// Play or pause logic
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(err => console.log("Audio play error", err));
    video.play();
    playBtn.textContent = "Pause";
    startTimer();
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = "Play";
    clearInterval(timer);
  }
});

function startTimer() {
  let timeLeft = fakeDuration;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimeDisplay(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      audio.pause();
      video.pause();
      playBtn.textContent = "Play";
      updateTimeDisplay(fakeDuration);
    }
  }, 1000);
}

function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
}
