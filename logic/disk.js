const constants = require('utils/const.js');
const diskService = require('services/disk.js');

function readUserFile() {
  return diskService.readJsonFile(constants.USER_PASSWORD_FILE);
}

module.exports = {
  readUserFile,
};
