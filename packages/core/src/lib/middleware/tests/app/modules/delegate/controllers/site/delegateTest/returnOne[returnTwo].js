const jest = require('jest-mock');
module.exports = jest.fn((request, response, stack) => {
  return 1;
})