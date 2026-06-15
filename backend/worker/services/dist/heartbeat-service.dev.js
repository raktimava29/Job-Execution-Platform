"use strict";

var axios = require("axios");

var startHeartbeat = function startHeartbeat(workerId) {
  setInterval(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(axios.post("http://localhost:5000/api/workers/heartbeat", {
              workerId: workerId
            }));

          case 3:
            console.log("Heartbeat sent");
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error("Heartbeat failed");

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 6]]);
  }, 5000);
};

module.exports = startHeartbeat;