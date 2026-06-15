"use strict";

require("dotenv").config();

var _require = require("bullmq"),
    Worker = _require.Worker;

var redis = require("../src/config/redis");

var registerWorker = require("./services/register-service");

var startHeartbeat = require("./services/heartbeat-service");

var createProcessor = require("./processors/job-processor");

(function _callee2() {
  var workerInfo, workerId, processor, worker;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log("Starting worker...");
          _context2.next = 4;
          return regeneratorRuntime.awrap(registerWorker());

        case 4:
          workerInfo = _context2.sent;
          console.log("Worker registered:", workerInfo);
          workerId = workerInfo.id;
          startHeartbeat(workerId);
          console.log("Heartbeat service started");
          processor = createProcessor(workerId);
          worker = new Worker("job-execution", processor, {
            connection: redis
          });
          console.log("Worker ".concat(workerId, " listening for jobs"));
          worker.on("completed", function (job) {
            console.log("Job ".concat(job.data.jobId, " completed"));
          });
          worker.on("failed", function _callee(job, err) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log("Job ".concat(job.data.jobId, " failed"));
                    console.error(err.message);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error("Worker startup failed:", _context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
})();