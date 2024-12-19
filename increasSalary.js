async function increaseSalary() {
  let workersAll = await api.getEmployees();

  let workersSalary = [];

  workersAll.forEach((element) => {
    workersSalary.push(element.salary);
  });

  let midelsalaryOfWorkers = workersSalary.reduce(function (acc, currentNum) {
    return Math.round(acc + currentNum / workersAll.length);
  }, 0);
  (async () => {
    for (let element of workersAll) {
      if (element.salary > midelsalaryOfWorkers) {
        element.salary = element.salary + element.salary * 0.1;
      }
      if (element.salary < midelsalaryOfWorkers) {
        element.salary = element.salary + element.salary * 0.2;
      }
    }
  })();

  let caunter = workersAll.length;
  let summ = 0;
  async function f() {
    for (let element of workersAll) {
      try {
        let x = await api.setEmployeeSalary(element.id, element.salary);

        summ = summ + x.salary;
        await api.sendBudgetToAccounting(summ);
        await api.notifyEmployee(
          element.id,
          `Hello, ${element.name}! Congratulations, your new salary is ${element.salary}!`
        );
      } catch (e) {
        caunter--;
        await api.notifyAdmin(e);
      }
    }

    return caunter;
  }
  return f().then((res) => res);
}

const api = {
  _employees: [
    { id: 1, name: "Alex", salary: 120000 },
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
      const updatedEmployees = this._employees.map((employee) =>
        employee.id !== employeeId
          ? employee
          : {
              ...employee,
              salary: newSalary,
            }
      );
      this._employees = updatedEmployees;
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
      resolve();
    });
  },

  setEmployees(newEmployees) {
    return new Promise((resolve) => {
      this._employees = newEmployees;
      resolve();
    });
  },

  sendBudgetToAccounting(newBudget) {
    return new Promise((resolve) => {
      resolve();
    });
  },
};
console.log(10, increaseSalary());
