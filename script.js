const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'img-1',
        displayName: 'Electric Chill Machine',
        artist: 'Unknown',
    },
    {
        name: 'img-2',
        displayName: 'Seven Nation Army',
        artist: 'Unknown',
    },
    {
        name: 'img-3',
        displayName: 'Good Night Disco Queen',
        artist: 'Unknown',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row Metric',
        artist: 'Unknown',
    }
];

//Check if playing
let isPlaying = false;

//Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

//Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click',()=>(isPlaying ? pauseSong() : playSong()));


//Update the DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load  - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e){
    if(isPlaying){
       // console.log(e);
       const {duration, currentTime} = e.srcElement;
       console.log(duration, currentTime);
       // Update progress bar width
       const progressPercent = (currentTime/duration)*100;
      // console.log(progressPercent);
      progress.style.width = `${progressPercent}%`;
    }
}

// Add Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate',updateProgressBar);