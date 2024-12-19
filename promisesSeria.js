const firstPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(300), 300));

const secondPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(200), 200));

const thirdPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(100), 100));

function promisesInSeries(asyncFns) {
  let x;
  async function processArray(asyncFns) {
    console.log(1, x);
    for (let i = 0; i < asyncFns.length; i++) {
      x = await asyncFns[i](x).then((res) => res);
      console.log(2, x);
    }

    return x;
  }
  let y = processArray(asyncFns).then((e) => e);
  console.log(4, y);
  return y;
}

console.log(3, promisesInSeries([firstPromise, secondPromise, thirdPromise]));
// Выполнит resolve(300) через 300 мс, потом resolve(200) через 200 мс, потом resolve(100) через 100 мс
