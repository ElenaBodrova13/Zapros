function arrayToCsv(data) {
  data.forEach((item) => {
    for (let i = 0; i < item.length; i++) {
      if (typeof item[i] === "string" && item[i].length > 1) {
        item[i] = item[i].replace(/"/g, '""');
        item[i] = `"${item[i]}"`;
      }
      if (typeof item[i] !== "string") {
        item[i];
      }
      if (typeof item[i] !== "string" && typeof item[i] !== "number") {
        throw new Error("Unexpected value");
      }
    }
  });
  return data.join("\n");
}

const x = [
  [1, 2],
  ["b", "c"],
];
console.log(arrayToCsv(x)); // '"""text""","other ""long"" text"'
//a,b'
/*arraysToCsv([
  [1, 2],
  ["a,b", "c,d"],
]); // '1,2
//"a,b","c,d"'
*/
/*
let v = "Hello";

v = '""' + v;*/
