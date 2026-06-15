"use strict";

var pool = require("../config/db");

var jobQueue = require("../queues/jobQueue");

var createJob = function createJob(jobData) {
  var name, payload, _jobData$priority, priority, _jobData$maxAttempts, maxAttempts, result, job;

  return regeneratorRuntime.async(function createJob$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = jobData.name, payload = jobData.payload, _jobData$priority = jobData.priority, priority = _jobData$priority === void 0 ? 1 : _jobData$priority, _jobData$maxAttempts = jobData.maxAttempts, maxAttempts = _jobData$maxAttempts === void 0 ? 3 : _jobData$maxAttempts;

          if (name) {
            _context.next = 3;
            break;
          }

          throw new Error("Job name is required");

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(pool.query("\n    INSERT INTO jobs\n    (\n      name,\n      payload,\n      priority,\n      max_attempts\n    )\n    VALUES\n    ($1,$2,$3,$4)\n    RETURNING *\n    ", [name, payload, priority, maxAttempts]));

        case 5:
          result = _context.sent;
          job = result.rows[0];
          _context.next = 9;
          return regeneratorRuntime.awrap(jobQueue.add("execute-job", {
            jobId: job.id
          }, {
            priority: priority,
            attempts: maxAttempts,
            backoff: {
              type: "exponential",
              delay: 5000
            }
          }));

        case 9:
          console.log("Job Added to BullMQ");
          return _context.abrupt("return", job);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  createJob: createJob
};