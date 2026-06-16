"use strict";

var jobService = require("../services/job-service");

var pool = require("../config/db");

var createJob = function createJob(req, res) {
  var job;
  return regeneratorRuntime.async(function createJob$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(jobService.createJob(req.body));

        case 3:
          job = _context.sent;
          res.status(201).json({
            success: true,
            data: job
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getAllJobs = function getAllJobs(req, res) {
  var result;
  return regeneratorRuntime.async(function getAllJobs$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT\n        id,\n        name,\n        status,\n        priority,\n        progress,\n        attempts,\n        max_attempts,\n        assigned_worker,\n        created_at\n      FROM jobs\n      ORDER BY created_at DESC\n      "));

        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            data: result.rows
          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: "Failed to fetch jobs"
          }));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getJobById = function getJobById(req, res) {
  var id, jobResult, historyResult;
  return regeneratorRuntime.async(function getJobById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(pool.query("\n        SELECT *\n        FROM jobs\n        WHERE id=$1\n        ", [id]));

        case 4:
          jobResult = _context3.sent;

          if (jobResult.rows.length) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Job not found"
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(pool.query("\n        SELECT *\n        FROM execution_history\n        WHERE job_id=$1\n        ORDER BY started_at DESC\n        ", [id]));

        case 9:
          historyResult = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: {
              job: jobResult.rows[0],
              executions: historyResult.rows
            }
          }));

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: "Failed to fetch job"
          }));

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

module.exports = {
  createJob: createJob,
  getAllJobs: getAllJobs,
  getJobById: getJobById
};