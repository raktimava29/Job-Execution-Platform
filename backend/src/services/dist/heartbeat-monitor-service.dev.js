"use strict";

var pool = require("../config/db");

var _require = require("./recovery-service"),
    recoverWorkerJobs = _require.recoverWorkerJobs;

var startHeartbeatMonitor = function startHeartbeatMonitor() {
  setInterval(function _callee() {
    var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, worker;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log("Monitor running");
            _context.next = 4;
            return regeneratorRuntime.awrap(pool.query("\n          SELECT *\n          FROM workers\n          WHERE\n          last_heartbeat <\n          NOW() - INTERVAL '15 seconds'\n          AND status != 'OFFLINE'\n          "));

          case 4:
            result = _context.sent;
            console.log("Found ".concat(result.rows.length, " stale workers"));
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;
            _iterator = result.rows[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 21;
              break;
            }

            worker = _step.value;
            console.log("Worker ".concat(worker.id, " offline"));
            _context.next = 16;
            return regeneratorRuntime.awrap(pool.query("\n          UPDATE workers\n          SET \n            status='OFFLINE',\n            current_job_id=NULL\n          WHERE id=$1\n          ", [worker.id]));

          case 16:
            _context.next = 18;
            return regeneratorRuntime.awrap(recoverWorkerJobs(worker.id));

          case 18:
            _iteratorNormalCompletion = true;
            _context.next = 11;
            break;

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
            _context.next = 40;
            break;

          case 37:
            _context.prev = 37;
            _context.t1 = _context["catch"](0);
            console.error(_context.t1);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 37], [9, 23, 27, 35], [28,, 30, 34]]);
  }, 15000);
};

module.exports = startHeartbeatMonitor;