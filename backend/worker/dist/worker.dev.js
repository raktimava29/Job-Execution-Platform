"use strict";

require("dotenv").config();

var registerWorker = require("./services/register-service");

var startHeartbeat = require("./services/heartbeat-service");

(function _callee() {
  var workerInfo, workerId;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(registerWorker());

        case 3:
          workerInfo = _context.sent;
          console.log("Worker Registered:");
          console.log(workerInfo);
          workerId = workerInfo.id;
          startHeartbeat(workerId);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
})();