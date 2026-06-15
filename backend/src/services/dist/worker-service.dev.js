"use strict";

var pool = require("../config/db");

var register = function register(_ref) {
  var workerName, hostName, processId, result;
  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          workerName = _ref.workerName, hostName = _ref.hostName, processId = _ref.processId;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n    INSERT INTO workers\n    (\n      worker_name,\n      host_name,\n      process_id,\n      status,\n      last_heartbeat\n    )\n    VALUES\n    ($1,$2,$3,'ONLINE',NOW())\n    RETURNING *\n    ", [workerName, hostName, processId]));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", result.rows[0]);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var heartbeat = function heartbeat(workerId) {
  return regeneratorRuntime.async(function heartbeat$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(pool.query("\n    UPDATE workers\n    SET last_heartbeat = NOW()\n    WHERE id = $1\n    ", [workerId]));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  register: register,
  heartbeat: heartbeat
};