"use strict";

var jobService = require("../services/job-service");

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

module.exports = {
  createJob: createJob
};