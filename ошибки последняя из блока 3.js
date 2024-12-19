class ExecutionError extends Error {
  constructor(element, name, stack, message) {
    super(message);

    this.element = element;

    this.name = name;

    this.stack = stack;
  }
  getArgData() {
    return this.element;
  }
}

function applyFn(dataArr, callback) {
  let obj = {};
  obj.errors = [];
  obj.succeeded = [];

  dataArr.map((element) => {
    try {
      obj.succeeded.push(callback(element));
    } catch (e) {
      console.log(9, e.name);
      obj.errors.push(new ExecutionError(element, e.name, e.stack));
    }
  });
  return obj;
}

//   succeeded: [2, 3, 4],
//   errors: [],
/*
console.log(applyFn([1, 2, 3], (arg) => arg + 1));*/
const dataArr = [
  '{"login":"login","password":"password"}',
  "{{}",
  '{"login":"login","password":"pass"}',
];

const callback = JSON.parse;
let x = applyFn(dataArr, callback);
console.log(1, x.errors[0].getArgData());

console.log(2, x);
