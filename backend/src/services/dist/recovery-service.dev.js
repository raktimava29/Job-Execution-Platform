"use strict";

var pool = require("../config/db");

var jobQueue = require("../queues/jobQueue");

var recoverWorkerJobs = function recoverWorkerJobs(workerId) {
  var jobs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, job;

  return regeneratorRuntime.async(function recoverWorkerJobs$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(pool.query("\n    SELECT *\n    FROM jobs\n    WHERE assigned_worker = $1\n    AND status = 'RUNNING'\n    ", [workerId]));

        case 2:
          jobs = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 6;
          _iterator = jobs.rows[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 18;
            break;
          }

          job = _step.value;
          console.log("Recovering Job ".concat(job.id));
          _context.next = 13;
          return regeneratorRuntime.awrap(pool.query("\n      UPDATE jobs\n      SET\n        status='QUEUED',\n        assigned_worker=NULL\n      WHERE id=$1\n      ", [job.id]));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(pool.query("\n      UPDATE execution_history\n      SET\n        status='FAILED',\n        error_message='Worker crashed',\n        ended_at=NOW()\n      WHERE\n        job_id=$1\n        AND status='RUNNING'\n      ", [job.id]));

        case 15:
          _iteratorNormalCompletion = true;
          _context.next = 8;
          break;

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 24:
          _context.prev = 24;
          _context.prev = 25;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 27:
          _context.prev = 27;

          if (!_didIteratorError) {
            _context.next = 30;
            break;
          }

          throw _iteratorError;

        case 30:
          return _context.finish(27);

        case 31:
          return _context.finish(24);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 20, 24, 32], [25,, 27, 31]]);
};

module.exports = {
  recoverWorkerJobs: recoverWorkerJobs
};