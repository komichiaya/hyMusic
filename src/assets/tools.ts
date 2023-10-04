export function debounce(func: Function, delay: number) {
  let timer: any = null;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    func.apply(func, arguments);
  }, delay);
}
export function random(Array: any) {
  const arr = Array;
  const len = arr.length;
  const list = [];
  for (let i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * len + 1);
    const obj = {
      No: num,
      Name: Math.floor(Math.random() * len + 1),
    };
    list.push(obj);
  }
  const l = new Set(list);
  return l;
}
