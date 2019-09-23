/*
All docker business logic goes here.
 */
const bashService = require('services/bash.js');

const WORKING_DIR = '/usr/local/casa/applications';
const MANAGER_YML = 'manager.yml';
const DOCKER_COMPOSE_COMMAND = 'docker-compose';
const TAG = process.env.TAG || 'arm';

const options = {
  cwd: WORKING_DIR,
  log: true,
  env: {
    TAG: TAG, // eslint-disable-line object-shorthand
  }
};

// Runs docker-compose down on the manager-api
async function dockerComposeDown() {
  const file = WORKING_DIR + '/' + MANAGER_YML;
  await bashService.exec(DOCKER_COMPOSE_COMMAND, ['-f', file, 'down'], options);
}

// Runs docker-compose up for the manager-api.
async function dockerComposeUp() {
  const file = WORKING_DIR + '/' + MANAGER_YML;
  await bashService.exec(DOCKER_COMPOSE_COMMAND, ['-f', file, 'up', '-d'], options);
}

module.exports = {
  dockerComposeDown,
  dockerComposeUp,
};
