// DOM Elements
const timeDisplay = document.querySelector('.time-display');
const playBtn = document.querySelector('.play');
const timeSelectBtns = document.querySelectorAll('.time-select button');
const soundPickerBtns = document.querySelectorAll('.sound-picker button');
const video = document.getElementById('video');

// Audio
const beachSound = new Audio('Sounds/beach.mp3');
const rainSound = new Audio('Sounds/rain.mp3');
let currentSound = beachSound;

// Time variables
let totalTime = 300; // Default to 5 minutes (matching active button)
let timeRemaining = totalTime;
let isPlaying = false;
let timer;

// Initialize
updateTimeDisplay();
beachSound.loop = true;
rainSound.loop = true;

// Event Listeners
playBtn.addEventListener('click', togglePlay);

timeSelectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        timeSelectBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Set time based on data attribute
        totalTime = parseInt(this.dataset.time);
        timeRemaining = totalTime;
        updateTimeDisplay();
        
        // If currently playing, restart timer with new time
        if (isPlaying) {
            clearInterval(timer);
            startTimer();
        }
    });
});

soundPickerBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        soundPickerBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Change sound and video based on selection
        if (this.id === 'beach-sound') {
            currentSound = beachSound;
            video.src = 'beach.mp4';
            rainSound.pause();
            rainSound.currentTime = 0;
            if (isPlaying) {
                beachSound.play();
            }
        } else if (this.id === 'rain-sound') {
            currentSound = rainSound;
            video.src = 'rain.mp4';
            beachSound.pause();
            beachSound.currentTime = 0;
            if (isPlaying) {
                rainSound.play();
            }
        }
        
        // Reload video to apply new source
        video.load();
        video.play();
    });
});

// Functions
function togglePlay() {
    if (isPlaying) {
        pauseMeditation();
    } else {
        startMeditation();
    }
}

function startMeditation() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    currentSound.play();
    startTimer();
}

function pauseMeditation() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    currentSound.pause();
    clearInterval(timer);
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        updateTimeDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            pauseMeditation();
            timeRemaining = totalTime;
            updateTimeDisplay();
            alert('Meditation session complete!');
        }
    }, 1000);
}

function updateTimeDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeDisplay.textContent = `${minutes}:${seconds}`;
}