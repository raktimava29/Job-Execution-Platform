const pool =
  require("../../src/config/db");

const executionService = require("../services/execution-service");

module.exports = (workerId) => {

  return async (job) => {

    console.log(
      "\n================================"
    );

    console.log(
      "PROCESSOR STARTED"
    );

    console.log(
      "Worker:",
      workerId
    );

    console.log(
      "BullMQ Job ID:",
      job.id
    );

    console.log(
      "Payload:",
      job.data
    );

    console.log(
      "================================\n"
    );

    const jobId =
      job.data.jobId;

    let executionId;

    try {

      console.log(
        `Starting execution for ${jobId}`
      );

      const jobData = await pool.query(
        `
        SELECT last_checkpoint
        FROM jobs
        WHERE id=$1
        `,
        [jobId]
      );

      const currentProgress = jobData.rows[0].last_checkpoint || 0;

      if (currentProgress >= 100) {
        console.log(
          `Job ${jobId} already completed`
        );
        return;
      }

      executionId =
        await executionService.startExecution(
          workerId,
          jobId
        );

      console.log(
        `Execution History ID: ${executionId}`
      );

      console.log(
        `Current checkpoint: ${currentProgress}%`
      );

      console.log(
        `Resuming from: ${currentProgress + 20}%`
      );

      for (
        let progress = currentProgress + 20;
        progress <= 100;
        progress += 20
      ) {

        console.log(
          `Starting checkpoint ${progress}%`
        );

        await new Promise(
          resolve =>
            setTimeout(resolve, 10000)
        );

        await job.updateProgress(
          progress
        );

        await pool.query(
          `
          UPDATE jobs
          SET
            progress=$1,
            last_checkpoint=$1
          WHERE id=$2
          `,
          [
            progress,
            jobId
          ]
        );

        console.log(
          `Checkpoint saved: ${progress}%`
        );

      }

      console.log(
        `Finishing Job ${jobId}`
      );

      await executionService.finishExecution(
        workerId,
        jobId,
        executionId
      );

      console.log(
        `Job ${jobId} COMPLETED`
      );

    } catch(error) {

      console.log(
        `Job ${jobId} FAILED`
      );

      console.error(error);

      await pool.query(
        `
        UPDATE jobs
        SET attempts = attempts + 1
        WHERE id=$1
        `,
        [jobId]
      );

      if (executionId) {

        await executionService.failExecution(
          workerId,
          jobId,
          executionId,
          error.message
        );

      }

      throw error;
    }

  };

};