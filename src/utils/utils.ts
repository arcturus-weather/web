// 防抖函数
export function debounce(fn: (e: any) => void, dur = 500) {
  let timer: NodeJS.Timeout;

  return function (this: unknown, ...args: any) {
    clearTimeout(timer); // 计时器还在就清掉

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, dur);
  };
}
