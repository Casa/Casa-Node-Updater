const bashService = require('services/bash.js');

function fetchBootUUID() {
  bashService.exec('cat', ['/proc/sys/kernel/random/boot_id'], {})
    .then(uuid => Promise.resolve(uuid))
    .catch(() => Promise.resolve());
}

module.exports = {
  fetchBootUUID,
};
