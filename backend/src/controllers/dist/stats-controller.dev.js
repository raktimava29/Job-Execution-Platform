"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var pool = require("../config/db");

var getStats = function getStats(req, res) {
  var _ref, _ref2, totalJobs, completedJobs, failedJobs, runningJobs, queuedJobs, onlineWorkers, offlineWorkers;

  return regeneratorRuntime.async(function getStats$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Promise.all([pool.query("\n        SELECT COUNT(*)::int\n        AS count\n        FROM jobs\n        "), pool.query("\n        SELECT COUNT(*)::int\n        AS count\n        FROM jobs\n        WHERE status='COMPLETED'\n        "), pool.query("\n        SELECT COUNT(*)::int\n        AS count\n        FROM jobs\n        WHERE status='FAILED'\n        "), pool.query("\n        SELECT COUNT(*)::int\n        AS count\n        FROM jobs\n        WHERE status='RUNNING'\n        "), pool.query("\n        SELECT COUNT(*)::int\n        AS count\n        FROM jobs\n        WHERE status='QUEUED'\n        "), pool.query("\n        SELECT COUNT(*)::int\n        AS count\n        FROM workers\n        WHERE status='ONLINE'\n        "), pool.query("\n        SELECT COUNT(*)::int\n        AS count\n        FROM workers\n        WHERE status='OFFLINE'\n        ")]));

        case 3:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 7);
          totalJobs = _ref2[0];
          completedJobs = _ref2[1];
          failedJobs = _ref2[2];
          runningJobs = _ref2[3];
          queuedJobs = _ref2[4];
          onlineWorkers = _ref2[5];
          offlineWorkers = _ref2[6];
          return _context.abrupt("return", res.status(200).json({
            success: true,
            data: {
              totalJobs: totalJobs.rows[0].count,
              completedJobs: completedJobs.rows[0].count,
              failedJobs: failedJobs.rows[0].count,
              runningJobs: runningJobs.rows[0].count,
              queuedJobs: queuedJobs.rows[0].count,
              onlineWorkers: onlineWorkers.rows[0].count,
              offlineWorkers: offlineWorkers.rows[0].count
            }
          }));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: "Failed to fetch stats"
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = {
  getStats: getStats
};