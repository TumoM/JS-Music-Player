const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const music = document.getElementById('music');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play();
}
// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

// Play or Pause
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
})

// Update Player DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    cover.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0

// Previous Song
function prevSong() {
    songIndex = songIndex > 0 ? songIndex-1 : songs.length-1;
    loadSong(songs[songIndex]);
    playSong();

}

// Next Song
function nextSong() {
    songIndex = songIndex+1 < songs.length ? songIndex+1 : 0;
    loadSong(songs[songIndex]);
    playSong();

}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying){
        const {duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const click = e.offsetX;
    const {duration} = music;
    const newTime = (click / width) * duration;
    music.currentTime = newTime;
}

// Event Listiners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
