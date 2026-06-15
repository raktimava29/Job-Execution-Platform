"use strict";

var pool = require("../../src/config/db");

var startExecution = function startExecution(workerId, jobId) {
  var result;
  return regeneratorRuntime.async(function startExecution$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Marking worker ".concat(workerId, " BUSY"));
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n    UPDATE workers\n    SET\n      status='BUSY',\n      current_job_id=$1\n    WHERE id=$2\n    ", [jobId, workerId]));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(pool.query("\n    UPDATE jobs\n    SET\n      status='RUNNING',\n      assigned_worker=$1,\n      started_at=NOW()\n    WHERE id=$2\n    ", [workerId, jobId]));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(pool.query("\n      INSERT INTO execution_history\n      (\n        job_id,\n        worker_id,\n        status,\n        started_at\n      )\n      VALUES\n      ($1,$2,'RUNNING',NOW())\n      RETURNING id\n      ", [jobId, workerId]));

        case 7:
          result = _context.sent;
          console.log("Execution record ".concat(result.rows[0].id, " created"));
          return _context.abrupt("return", result.rows[0].id);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var finishExecution = function finishExecution(workerId, jobId, executionId) {
  return regeneratorRuntime.async(function finishExecution$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("Completing Job ".concat(jobId));
          _context2.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n    UPDATE workers\n    SET\n      status='ONLINE',\n      current_job_id=NULL\n    WHERE id=$1\n    ", [workerId]));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(pool.query("\n    UPDATE jobs\n    SET\n      status='COMPLETED',\n      progress=100,\n      completed_at=NOW()\n    WHERE id=$1\n    ", [jobId]));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(pool.query("\n    UPDATE execution_history\n    SET\n      status='COMPLETED',\n      ended_at=NOW()\n    WHERE id=$1\n    ", [executionId]));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var failExecution = function failExecution(workerId, jobId, executionId, errorMessage) {
  return regeneratorRuntime.async(function failExecution$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("Failing Job ".concat(jobId));
          _context3.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n    UPDATE workers\n    SET\n      status='ONLINE',\n      current_job_id=NULL\n    WHERE id=$1\n    ", [workerId]));

        case 3:
          if (!executionId) {
            _context3.next = 6;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.query("\n      UPDATE execution_history\n      SET\n        status='FAILED',\n        error_message=$1,\n        ended_at=NOW()\n      WHERE id=$2\n      ", [errorMessage, executionId]));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  startExecution: startExecution,
  finishExecution: finishExecution,
  failExecution: failExecution
};