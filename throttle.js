let counter = 0;
const fn = () => {
  console.log("h");
  counter++;
};

const throttle = (fn, throttleTime) => {
  let timeout = false;
  function wrap() {
    if (timeout === true) {
      return;
    }
    fn.apply(this, arguments);
    timeout = true;
    setTimeout(function () {
      timeout = false;
    }, throttleTime);
  }

  return wrap;
};

const throttledFn = throttle(fn, 500); // функция может быть вызвана не чаще, чем раз в 500 мс

const intervalId = setInterval(throttledFn, 100);
setTimeout(() => clearInterval(intervalId), 1000); // удаляем интервал через 10 вызовов
function sayHi() {
  console.log("Привет");
}
setTimeout(function () {
  console.log(3, counter); //3
}, 1500); // 3
function fka(cb) {
  let start = Date.now();
  cb();
  setTimeout(sayHi, 5000);
  console.log(2, Date.now() - start);
}
fka(sayHi);
