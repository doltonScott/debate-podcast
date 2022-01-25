/*const play_btn = document.querySelector("#play-btn");
const pause_btn = document.querySelector("#pause-btn");

//audio file
let sound = new Audio("audio/bensound-anewbeginning.mp3");

//play event
play_btn.addEventListener("click", play);

function play() {
  sound.play();
}

pause_btn.addEventListener("click", pause);

function pause() {
  sound.pause();
}
*/

let currentMusic = 0;

const Music = document.querySelector("#audio");

const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-Duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");

playBtn.addEventListener("click", () => {
  playBtn.classList.toggle("pause");
});

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  Music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;

  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    seekBar.max = music.duration;
    console.log(music.duration);
  }, 300);
};

setMusic(0);
