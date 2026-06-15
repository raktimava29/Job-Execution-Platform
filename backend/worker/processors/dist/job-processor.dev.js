"use strict";

var pool = require("../../src/config/db");

var executionService = require("../services/execution-service");

module.exports = function (workerId) {
  return function _callee(job) {
    var jobId, executionId, progress;
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
            return regeneratorRuntime.awrap(executionService.startExecution(workerId, jobId));

          case 11:
            executionId = _context.sent;
            console.log("Execution History ID: ".concat(executionId));
            progress = 0;

          case 14:
            if (!(progress <= 100)) {
              _context.next = 25;
              break;
            }

            console.log("Job ".concat(jobId, ": ").concat(progress, "%"));
            _context.next = 18;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              return setTimeout(resolve, 5000);
            }));

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(job.updateProgress(progress));

          case 20:
            _context.next = 22;
            return regeneratorRuntime.awrap(pool.query("\n          UPDATE jobs\n          SET progress=$1\n          WHERE id=$2\n          ", [progress, jobId]));

          case 22:
            progress += 20;
            _context.next = 14;
            break;

          case 25:
            console.log("Finishing Job ".concat(jobId));
            _context.next = 28;
            return regeneratorRuntime.awrap(executionService.finishExecution(workerId, jobId, executionId));

          case 28:
            console.log("Job ".concat(jobId, " COMPLETED"));
            _context.next = 41;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](7);
            console.log("Job ".concat(jobId, " FAILED"));
            console.error(_context.t0);
            _context.next = 37;
            return regeneratorRuntime.awrap(pool.query("\n        UPDATE jobs\n        SET attempts = attempts + 1\n        WHERE id=$1\n        ", [jobId]));

          case 37:
            if (!executionId) {
              _context.next = 40;
              break;
            }

            _context.next = 40;
            return regeneratorRuntime.awrap(executionService.failExecution(workerId, jobId, executionId, _context.t0.message));

          case 40:
            throw _context.t0;

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[7, 31]]);
  };
};