const { Queue } = require("bullmq");
const redis = require("../config/redis");

const jobQueue = new Queue("job-execution", {
  connection: redis,
});

module.exports = jobQueue;