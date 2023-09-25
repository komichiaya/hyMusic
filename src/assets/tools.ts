export function debounce(func: Function, delay: number) {
  let timer: any = null;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    func.apply(func, arguments);
  }, delay);
}
