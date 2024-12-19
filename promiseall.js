/*
const firstPromise = new Promise((resolve) =>
  setTimeout(() => resolve(1000), 1000)
);

const secondPromise = new Promise((resolve) =>
  setTimeout(() => resolve(50), 50)
);

const thirdPromise = new Promise((resolve) =>
  setTimeout(() => resolve(100), 100)
);
const forPromise = new Promise((resolve) =>
  setTimeout(() => resolve(800), 800)
);
const fafePromise = new Promise((resolve) => setTimeout(() => resolve(40), 40));
*/
function promiseAll(promises) {
  let prom = new Promise(function (resolve, reject) {
    let arr = [];
    let caunt = promises.length;

    if (promises.length === 0) {
      resolve(promises);
    }
    promises.forEach((element, i) => {
      if (typeof element === "object") {
        element.then(function (value) {
          console.log(2, value);
          arr[i] = value;
          caunt--;
          console.log(3, arr, caunt);
          if (caunt === 0) {
            resolve(arr);
          }
        });
      } else {
        console.log(1, element);
        arr[i] = element;
        caunt--;
        if (caunt === 1) {
          resolve(arr);
        }
      }
    });
  });
  return prom;
}
/*
promiseAll([firstPromise, secondPromise, thirdPromise]).then(2, console.log); // [300, 200, 100]
console.log(
  3,
  promiseAll([
    firstPromise,
    secondPromise,
    thirdPromise,
    forPromise,
    fafePromise,
  ]).then(console.log("Helloshka"))
);
console.log(
  4,
  Promise.all([
    firstPromise,
    secondPromise,
    thirdPromise,
    forPromise,
    fafePromise,
  ]).then(console.log("Hello"))
);
*/
/*
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
var p4 = 13;

Promise.all([p3, p2, p1, p4]).then((values) => {
  console.log(8, values);
});
promiseAll([p3, p2, p1, p4]).then((values) => {
  console.log(9, values);
});
*/

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  13,
  new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  }), // 3
]).then((values) => {
  console.log(10, values);
});
promiseAll([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  13,
  new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  }), // 3
]).then((values) => {
  console.log(11, values);
});
