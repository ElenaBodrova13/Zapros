const newObj = { bannerClose: 5 };
const invalidJson = `{
    "counter1": 10,
    "counter2": 5,
    "counter3": 7,
    }`;
localStorage.setItem("counters", invalidJson);

function incrementCounter(counterName) {
  let newObj = {};
  let x = localStorage.getItem("counters");

  try {
    let objFromJson = JSON.parse(x);

    if (objFromJson[counterName]) {
      objFromJson[counterName]++;
      localStorage.setItem("counters", JSON.stringify(objFromJson));

      return objFromJson[counterName];
    }
    if (!objFromJson[counterName]) {
      objFromJson[counterName] = 1;
      localStorage.setItem("counters", JSON.stringify(objFromJson));
      return objFromJson[counterName];
    }
  } catch (e) {
    newObj[counterName] = 1;

    localStorage.setItem("counters", JSON.stringify(newObj));
    return newObj[counterName];
  }
}

// в localStorage 1 счетчик: bannerClick = 5

// 6
incrementCounter("bannerClose"); // 1
incrementCounter("bannerClose");
incrementCounter("bannerClose");
incrementCounter("bannerClose");
incrementCounter("bannerClick");
// в localStorage 2 счетчика: bannerClick = 6, bannerClose = 1

/*localStorage.user = JSON.stringify({ name: "John" });
console.log(typeof localStorage.user);
// немного позже
let user = JSON.parse(localStorage.user);
console.log(user);
console.log(user.name); // John*/
