"use strict";

var workerService = require("../services/worker-service");

var registerWorker = function registerWorker(req, res) {
  var worker;
  return regeneratorRuntime.async(function registerWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(workerService.register(req.body));

        case 3:
          worker = _context.sent;
          res.status(201).json(worker);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  registerWorker: registerWorker
};