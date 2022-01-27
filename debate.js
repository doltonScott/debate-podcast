let currentAudio = 0;

const music = document.querySelector("#audio");

const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-Duration");
const playBtn = document.querySelector(".play-btn");
const playBtn2 = document.querySelector(".play2-btn");
const playBtn3 = document.querySelector(".play3-btn");
const playBtn4 = document.querySelector(".play4-btn");
const playBtn5 = document.querySelector(".play5-btn");
const playBtn6 = document.querySelector(".play6-btn");
const playBtn7 = document.querySelector(".play7-btn");
const playBtn8 = document.querySelector(".play8-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn2.classList.toggle("pause");
});

playBtn2.addEventListener("click", () => {
  if (playBtn2.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn2.classList.toggle("pause");
});
playBtn3.addEventListener("click", () => {
  if (playBtn3.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn3.classList.toggle("pause");
});

playBtn4.addEventListener("click", () => {
  if (playBtn4.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn4.classList.toggle("pause");
});

playBtn5.addEventListener("click", () => {
  if (playBtn5.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn5.classList.toggle("pause");
});

playBtn6.addEventListener("click", () => {
  if (playBtn6.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn6.classList.toggle("pause");
});

playBtn7.addEventListener("click", () => {
  if (playBtn7.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn7.classList.toggle("pause");
});

playBtn8.addEventListener("click", () => {
  if (playBtn8.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn8.classList.toggle("pause");
});

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;

  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    seekBar.max = music.duration;
    console.log(music.duration);
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
};

setMusic(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : 0${sec}`;
};

setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(seekBar.max))
    forwardBtn.click();
}, 500);

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

const playMusic = () => {
  music.play();
  playBtn.classList.remove("pause");
};

forwardBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});

backwardBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});
