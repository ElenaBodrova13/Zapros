function promiseRace(promises) {
  let counter = -1;
  let p = new Promise(function (resolve, reject) {
    promises.forEach((element) => {
      element
        .then(function (value) {
          counter++;

          if (counter === 0) {
            resolve(element);
          }
        })
        .catch(function (err) {
          reject(new Error(err.message));
        });
    });
  });

  return p;
}

const firstPromise = new Promise((resolve) =>
  setTimeout(() => resolve(300), 300)
);

const secondPromise = new Promise((resolve) => {
  throw new Error("error");
  setTimeout(() => resolve(100), 100);
});

const thirdPromise = new Promise(function (resolve) {
  setTimeout(() => resolve(200), 200);
});

console.log(9, promiseRace([firstPromise, secondPromise, thirdPromise])); // 100
const y = [firstPromise, secondPromise, thirdPromise];
console.log(Promise.race(y));
// Создаём несколько промисов

// Используем Promise.all для обработки всех промисов
