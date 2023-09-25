export function getStyle(elem, propety) {
  console.log(elem);

  if (getComputedStyle) {
    return window.getComputedStyle(elem)[propety];
  } else {
    return elem.currentStyle[propety];
  }
}
export function animate(elem, properties) {
  elem.timerId = setInterval(function () {
    for (var property in properties) {
      var current;
      var target = properties[property];
      if (property === "opacity") {
        current = Math.round(parseFloat(getStyle(elem, property)) * 100);
      } else {
        current = parseInt(getStyle(elem, property));
      }
      var speed = (target - current) / 30;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (property === "opacity") {
        elem.style.opacity = (current + speed) / 100;
      } else {
        elem.style[property] = current + speed + "px";
      }
    }
  }, 20);
}
