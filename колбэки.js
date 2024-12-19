let fileSizes = {
  testFile1: 65,
  testFile2: 48,
};

function getFileSize(filename, cb) {
  setTimeout(() => cb(fileSizes[filename]), Math.random() * 500);
}

function sumFileSizes(filename1, filename2, cb) {
  let summ = 0;
  getFileSize(filename1, function (num) {
    summ = num;
    console.log(1, summ);
    getFileSize(filename2, function (num) {
      console.log(2, num + summ);
      cb(num + summ);
    });
  });
}

sumFileSizes("testFile1", "testFile2", log);
function log(sum) {
  console.log(sum);
}
/*console.log(getFileSize("testFile1", log));*/
