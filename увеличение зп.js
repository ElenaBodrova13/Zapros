function increaseSalary() {
  return new Promise(function (resolve, reject) {
    api.getEmployees().then(function (result) {
      console.log(2, result);
      let arr = [];

      result.filter(function (item) {
        arr.push(item.salary);
      });
      console.log(3, arr);
      let minNum = arr.reduce((acc, curentNum) =>
        acc > curentNum ? (acc = curentNum) : acc
      );
      console.log(4, minNum);
      let puerEmploi = result.find((emploi) => emploi.salary === minNum);
      console.log(5, puerEmploi);
      api
        .setEmployeeSalary(
          puerEmploi.id,
          puerEmploi.salary + puerEmploi.salary * 0.2
        )
        .then(
          function (data) {
            console.log(6, data);
            api
              .notifyEmployee(
                data.id,
                `Hello, ${data.name}! Congratulations, your new salary is ${data.salary}!`
              )
              .then((chto) => resolve(true));
          },
          (err) =>
            api.notifyAdmin(err).then(function (err) {
              resolve(false);
            })
        );
    });
  });
}
const api = {
  _employees: [
    { id: 4, name: "Fred", salary: 150000 },
    { id: 1, name: "Alex", salary: 6000 },
    { id: 2, name: "Fred", salary: 110000 },
    { id: 3, name: "Bob", salary: 80000 },
  ],

  getEmployees() {
    return new Promise((resolve) => {
      resolve(this._employees.slice());
    });
  },

  setEmployeeSalary(employeeId, newSalary) {
    return new Promise((resolve) => {
      throw new Error("Net nelza");
      this._employees = this._employees.map((employee) =>
        employee.id !== employeeId
          ? employee
          : {
              ...employee,
              salary: newSalary,
            }
      );
      resolve(this._employees.find(({ id }) => id === employeeId));
    });
  },

  notifyEmployee(employeeId, text) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },

  notifyAdmin(error) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },

  setEmployees(newEmployees) {
    return new Promise((resolve) => {
      this._employees = newEmployees;
      resolve();
    });
  },
};
console.log(7, increaseSalary());

/*
const goods = [
  {
    name: "AirPods",
    description: "Классные беспроводные наушники",
    num: 110,
  },
  {
    name: "MacBook Pro",
    description: "Ноутбук на все случаи жизни",
    num: 101,
  },
  {
    name: "iPhone",
    description: "",
    num: 102,
  },
  {
    name: "Дошик",
    num: 103,
  },
];

// Просто возвращаем значения описания

const withDescription = goods.filter(function (item, i) {
  if (i === 0) {
    acc = item.num;
  }
  if (acc > item.num) {
    acc = item.num;
    return item;
  }
});
console.log(10, withDescription);*/
