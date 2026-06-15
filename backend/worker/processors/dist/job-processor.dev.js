"use strict";

var executionService = require("../services/execution-service");

module.exports = function _callee(job) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(executionService.execute(job));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};