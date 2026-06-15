const pool = require("../config/db");
const jobQueue = require("../queues/jobQueue");

const recoverWorkerJobs = async (workerId) => {

  const jobs = await pool.query(
    `
    SELECT *
    FROM jobs
    WHERE assigned_worker = $1
    AND status = 'RUNNING'
    `,
    [workerId]
  );

  for (const job of jobs.rows) {

    console.log(
      `Recovering Job ${job.id}`
    );

    await pool.query(
      `
      UPDATE jobs
      SET
        status='QUEUED',
        assigned_worker=NULL
      WHERE id=$1
      `,
      [job.id]
    );

    await pool.query(
      `
      UPDATE execution_history
      SET
        status='FAILED',
        error_message='Worker crashed',
        ended_at=NOW()
      WHERE
        job_id=$1
        AND status='RUNNING'
      `,
      [job.id]
    );
  }

};

module.exports = {
  recoverWorkerJobs
};