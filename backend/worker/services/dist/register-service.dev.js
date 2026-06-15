"use strict";

var axios = require("axios");

var registerWorker = function registerWorker() {
  var response;
  return regeneratorRuntime.async(function registerWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.post("http://localhost:5000/api/workers/register", {
            workerName: "worker-".concat(process.pid),
            hostName: require("os").hostname(),
            processId: process.pid.toString()
          }));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = registerWorker;