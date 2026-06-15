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

var heartbeatWorker = function heartbeatWorker(req, res) {
  return regeneratorRuntime.async(function heartbeatWorker$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(workerService.heartbeat(req.body.workerId));

        case 3:
          res.status(200).json({
            message: "Heartbeat received"
          });
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports = {
  registerWorker: registerWorker,
  heartbeatWorker: heartbeatWorker
};