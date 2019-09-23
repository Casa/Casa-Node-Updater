/**
 * Generic disk functions.
 */
const fs = require('fs');

function readFile(filePath, encoding) {
  return new Promise((resolve, reject) => fs.readFile(filePath, encoding, (err, str) => {
    if (err) {
      reject(err);
    } else {
      resolve(str);
    }
  }));
}

function readUtf8File(filePath) {
  return readFile(filePath, 'utf8');
}

function readJsonFile(filePath) {
  return readUtf8File(filePath).then(JSON.parse);
}

module.exports = {
  readJsonFile,
};
