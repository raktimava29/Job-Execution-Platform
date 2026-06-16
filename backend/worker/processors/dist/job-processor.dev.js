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
            console.log("\n================================");
            console.log("PROCESSOR STARTED");
            console.log("Worker:", workerId);
            console.log("BullMQ Job ID:", job.id);
            console.log("Payload:", job.data);
            console.log("================================\n");
            jobId = job.data.jobId;
            _context.prev = 7;
            console.log("Starting execution for ".concat(jobId));
            _context.next = 11;
            return regeneratorRuntime.awrap(pool.query("\n        SELECT last_checkpoint\n        FROM jobs\n        WHERE id=$1\n        ", [jobId]));

          case 11:
            jobData = _context.sent;
            currentProgress = jobData.rows[0].last_checkpoint || 0;

            if (!(currentProgress >= 100)) {
              _context.next = 16;
              break;
            }

            console.log("Job ".concat(jobId, " already completed"));
            return _context.abrupt("return");

          case 16:
            _context.next = 18;
            return regeneratorRuntime.awrap(executionService.startExecution(workerId, jobId));

          case 18:
            executionId = _context.sent;
            console.log("Execution History ID: ".concat(executionId));
            console.log("Current checkpoint: ".concat(currentProgress, "%"));
            console.log("Resuming from: ".concat(currentProgress + 20, "%"));
            progress = currentProgress + 20;

          case 23:
            if (!(progress <= 100)) {
              _context.next = 35;
              break;
            }

            console.log("Starting checkpoint ".concat(progress, "%"));
            _context.next = 27;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              return setTimeout(resolve, 10000);
            }));

          case 27:
            _context.next = 29;
            return regeneratorRuntime.awrap(job.updateProgress(progress));

          case 29:
            _context.next = 31;
            return regeneratorRuntime.awrap(pool.query("\n          UPDATE jobs\n          SET\n            progress=$1,\n            last_checkpoint=$1\n          WHERE id=$2\n          ", [progress, jobId]));

          case 31:
            console.log("Checkpoint saved: ".concat(progress, "%"));

          case 32:
            progress += 20;
            _context.next = 23;
            break;

          case 35:
            console.log("Finishing Job ".concat(jobId));
            _context.next = 38;
            return regeneratorRuntime.awrap(executionService.finishExecution(workerId, jobId, executionId));

          case 38:
            console.log("Job ".concat(jobId, " COMPLETED"));
            _context.next = 51;
            break;

          case 41:
            _context.prev = 41;
            _context.t0 = _context["catch"](7);
            console.log("Job ".concat(jobId, " FAILED"));
            console.error(_context.t0);
            _context.next = 47;
            return regeneratorRuntime.awrap(pool.query("\n        UPDATE jobs\n        SET attempts = attempts + 1\n        WHERE id=$1\n        ", [jobId]));

          case 47:
            if (!executionId) {
              _context.next = 50;
              break;
            }

            _context.next = 50;
            return regeneratorRuntime.awrap(executionService.failExecution(workerId, jobId, executionId, _context.t0.message));

          case 50:
            throw _context.t0;

          case 51:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[7, 41]]);
  };
};