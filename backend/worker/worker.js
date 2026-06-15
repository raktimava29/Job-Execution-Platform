require("dotenv").config();

const { Worker } = require("bullmq");

const redis = require("../src/config/redis");

const registerWorker = require("./services/register-service");

const startHeartbeat = require("./services/heartbeat-service");

const createProcessor = require("./processors/job-processor");

(async () => {
  try {

    console.log("Starting worker...");

    const workerInfo =
      await registerWorker();

    console.log(
      "Worker registered:",
      workerInfo
    );

    const workerId =
      workerInfo.id;

    startHeartbeat(workerId);

    console.log(
      "Heartbeat service started"
    );

    const processor =
      createProcessor(workerId);

    const worker =
      new Worker(
        "job-execution",
        processor,
        {
          connection: redis
        }
      );

    console.log(
      `Worker ${workerId} listening for jobs`
    );

    worker.on(
      "completed",
      (job) => {

        console.log(
          `Job ${job.data.jobId} completed`
        );

      }
    );

    worker.on(
      "failed",
      async (job, err) => {

        console.log(
          `Job ${job.data.jobId} failed`
        );

        console.error(err.message);

      }
    );

  } catch(error) {

    console.error(
      "Worker startup failed:",
      error
    );

  }
})();