/*
All business logic goes here.
 */
const dockerLogic = require('logic/docker.js');
let updateInProgress = false;

async function update() {
  if (updateInProgress === false) {
    updateInProgress = true;
    try {
      await dockerLogic.dockerComposeDown();
      await dockerLogic.dockerComposeUp();
    } catch (error) {
      throw error;
    } finally {
      updateInProgress = false;
    }
  }
}

module.exports = {
  update,
};
