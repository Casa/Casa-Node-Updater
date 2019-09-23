/* eslint-disable no-magic-numbers */
function NodeError(message, statusCode) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.statusCode = statusCode;
}
require('util').inherits(NodeError, Error);

module.exports = {
  NodeError,
};

