"use strict";

var _require = require("bullmq"),
    Queue = _require.Queue;

var redis = require("../config/redis");

var jobQueue = new Queue("job-execution", {
  connection: redis
});
module.exports = jobQueue;