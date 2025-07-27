import { musicList } from "./data.js";
const content = document.querySelector(".music-content");
const audio = document.querySelector("#audio");
const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#pause");
const forwardBtn = document.querySelector("#forward");
const backwardBtn = document.querySelector("#backward");
const range = document.querySelector(".range");
const time = document.querySelector(".time");
let index = 0;

window.addEventListener("DOMContentLoaded", () => {
  addUi(index);
});
function addUi(i) {
  content.innerHTML = `
                <img src="./assets/images/${musicList[i].imagePath}" alt="music" class="image">
                <marquee direction="right"  class="music-name">${musicList[i].musicName}</marquee>
                <p class="artist"> ${musicList[i].artistName}</p>
                
                
    `;
  audio.src = `./assets/audios/${musicList[i].musicPath}`;
  range.max = musicList[i].duration;
}

playBtn.addEventListener("click", () => {
  audio.play();
  playBtn.classList.add("none");
  stopBtn.classList.remove("none");
});
stopBtn.addEventListener("click", () => {
  audio.pause();
  playBtn.classList.remove("none");
  stopBtn.classList.add("none");
});
forwardBtn.addEventListener("click", () => {
  if (index == 3) {
    index = 0;
    addUi(index);
    audio.play();
  } else {
    index += 1;
    addUi(index);
    audio.play();
  }
  playBtn.classList.add("none");
  stopBtn.classList.remove("none");
});

backwardBtn.addEventListener("click", () => {
  if (index == 0) {
    index = 3;
    addUi(index);
    audio.play();
  } else {
    index -= 1;
    addUi(index);
    audio.play();
  }
  playBtn.classList.add("none");
  stopBtn.classList.remove("none");
});

range.addEventListener("input", (e) => {
  audio.currentTime = range.value;

  if (audio.paused) {
    audio.play();
    playBtn.classList.add("none");
    stopBtn.classList.remove("none");
  }
});

audio.addEventListener("ended", () => {
  if (index == 3) {
    index = 0;
    addUi(index);
    audio.play();
  } else {
    index += 1;
    addUi(index);
    audio.play();
  }
  playBtn.classList.add("none");
  stopBtn.classList.remove("none");
});
audio.addEventListener("timeupdate", () => {
  range.value = audio.currentTime;
  console.log(audio.currentTime);

  let mn = Math.trunc(audio.currentTime / 60);
  let sn = Math.trunc(audio.currentTime % 60);
  time.innerHTML = `${mn >= 10 ? mn : "0" + mn}:${sn >= 10 ? sn : "0" + sn} `;
});
