import Lrc from "./formatLrc";
function parseLrc() {
  let arr = []; // 歌词数组
  let lines = Lrc.split("\n"); // 当前歌词
  let line; // 每一行的歌词
  for (let i = 1; i < lines.length; i++) {
    line = lines[i];
    let parts = line.split("]");
    let timeStr = parts[0].substring(1); // 这里利用toString()的方法是因为需要从'['之后截取到末尾
    let obj = {
      // 这里是拼接成一个新对象
      time: time2number(timeStr),
      name: parts[1],
    };
    arr.push(obj);
  }
  return arr;
}
function time2number(str) {
  let parts = str.split(":");
  let minutes = parts[0] * 60;
  let seconds = parts[1];
  return minutes + +seconds;
}
let doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector("ul"),
  container: document.querySelector(".container"),
};

function findIndex() {
  let currentTime = doms.audio.currentTime; // 当前播放时间
  for (let i = 0; i < lrcData.length; i++) {
    if (currentTime < lrcData[i].time) {
      // 如果当前播放器时间小于歌词的时间 证明现在应该高亮歌词下标的上一句
      return i - 1;
    }
  }
  return lrcData.length - 1; //这里是考虑到开头和结尾，不能计算有负数，所以给一个边界值
}
function createList() {
  for (let i = 0; i < lrcData.length; i++) {
    let li = document.createElement("li");
    li.textContent = lrcData[i].name;
    doms.ul.appendChild(li);
  }
}
let containerHeight = doms.container.clientHeight; // 容器高度
let liHeight = doms.ul.children[0].clientHeight; // li高度
let maxHeight = doms.ul.clientHeight - containerHeight; // 最大高度
function setOffset() {
  let index = findIndex();
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  if (offset < 0) {
    //如果当前还没有开始播放
    offset = 0;
  }
  if (offset > maxHeight) {
    // 当前歌词位置在最后一句
    offset = maxHeight;
  }
  doms.ul.style.transform = `translateY(-${offset}px)`;
  // doms.ul.children[index].classList = 'active'
  // 去掉之前的active
  let active = doms.ul.querySelector(".active");
  if (active) {
    active.classList.remove("active");
  }
  let li = doms.ul.children[index];
  if (li) {
    li.classList.add("active");
  }
}
doms.audio.addEventListener("timeupdate", setOffset);
