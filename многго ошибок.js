class AttemptsLimitExceeded extends Error {
  constructor() {
    super("Max attempts limit exceed");
    this.name = "AttemptsLimitExceeded";
  }
}

class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }
}

class TemporaryError extends Error {
  constructor() {
    super("TemporaryError");
    this.name = "TemporaryError";
  }
}

function getRepeatableData(getData, key, maxRequestsNumber) {
  //ваш код здесь
  let i = 0;
  try {
    getData(key);

    return key;
  } catch (e) {
    if (e.name == "NotFoundError") {
      throw e; // проброс (*)
    }
    if (e.name == "TemporaryError") {
      getRepeatableData(getData, key, maxRequestsNumber - 1);

      if (maxRequestsNumber < 0) {
        throw new AttemptsLimitExceeded();
      }
      return key;
    }
  }
}
/*const getData = (key) => "thro " + key + "()";*/
function getData(key) {
  return new TemporaryError();
}
/*console.log(9, getData());*/
console.log(getData("TemporaryError"));

const res = getRepeatableData(getData, "1", 3); // 'hello1'
console.log(2, res);
