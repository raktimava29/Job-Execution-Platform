"use strict";

var pool = require("../../src/config/db");

var executionService = require("../services/execution-service");

module.exports = function (workerId) {
  return function _callee(job) {
    var jobId, executionId, jobData, currentProgress, progress;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("PROCESSOR STARTED");
            console.log("Worker:", workerId);
            console.log("BullMQ Job ID:", job.id);
            console.log("Payload:", job.data);
            jobId = job.data.jobId;
            _context.prev = 5;
            console.log("Starting execution for ".concat(jobId));
            _context.next = 9;
            return regeneratorRuntime.awrap(pool.query("\n        SELECT last_checkpoint\n        FROM jobs\n        WHERE id=$1\n        ", [jobId]));

          case 9:
            jobData = _context.sent;
            currentProgress = jobData.rows[0].last_checkpoint || 0;

            if (!(currentProgress >= 100)) {
              _context.next = 14;
              break;
            }

            console.log("Job ".concat(jobId, " already completed"));
            return _context.abrupt("return");

          case 14:
            _context.next = 16;
            return regeneratorRuntime.awrap(executionService.startExecution(workerId, jobId));

          case 16:
            executionId = _context.sent;
            progress = currentProgress + 20;

          case 18:
            if (!(progress <= 100)) {
              _context.next = 28;
              break;
            }

            _context.next = 21;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              return setTimeout(resolve, 10000);
            }));

          case 21:
            _context.next = 23;
            return regeneratorRuntime.awrap(job.updateProgress(progress));

          case 23:
            _context.next = 25;
            return regeneratorRuntime.awrap(pool.query("\n          UPDATE jobs\n          SET\n            progress=$1,\n            last_checkpoint=$1\n          WHERE id=$2\n          ", [progress, jobId]));

          case 25:
            progress += 20;
            _context.next = 18;
            break;

          case 28:
            _context.next = 30;
            return regeneratorRuntime.awrap(executionService.finishExecution(workerId, jobId, executionId));

          case 30:
            console.log("Job ".concat(jobId, " COMPLETED"));
            _context.next = 43;
            break;

          case 33:
            _context.prev = 33;
            _context.t0 = _context["catch"](5);
            console.log("Job ".concat(jobId, " FAILED"));
            console.error(_context.t0);
            _context.next = 39;
            return regeneratorRuntime.awrap(pool.query("\n        UPDATE jobs\n        SET attempts = attempts + 1\n        WHERE id=$1\n        ", [jobId]));

          case 39:
            if (!executionId) {
              _context.next = 42;
              break;
            }

            _context.next = 42;
            return regeneratorRuntime.awrap(executionService.failExecution(workerId, jobId, executionId, _context.t0.message));

          case 42:
            throw _context.t0;

          case 43:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[5, 33]]);
  };
};