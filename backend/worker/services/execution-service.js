const pool =
  require("../../src/config/db");

const startExecution = async (
  workerId,
  jobId
) => {

  console.log(
    `Marking worker ${workerId} BUSY`
  );

  await pool.query(
    `
    UPDATE workers
    SET
      status='BUSY',
      current_job_id=$1
    WHERE id=$2
    `,
    [jobId, workerId]
  );

  await pool.query(
    `
    UPDATE jobs
    SET
      status='RUNNING',
      assigned_worker=$1,
      started_at=NOW()
    WHERE id=$2
    `,
    [
      workerId,
      jobId
    ]
  );

  const result =
    await pool.query(
      `
      INSERT INTO execution_history
      (
        job_id,
        worker_id,
        status,
        started_at
      )
      VALUES
      ($1,$2,'RUNNING',NOW())
      RETURNING id
      `,
      [
        jobId,
        workerId
      ]
    );

  console.log(
    `Execution record ${result.rows[0].id} created`
  );

  return result.rows[0].id;
};

const finishExecution = async (
  workerId,
  jobId,
  executionId
) => {

  console.log(
    `Completing Job ${jobId}`
  );

  await pool.query(
    `
    UPDATE workers
    SET
      status='ONLINE',
      current_job_id=NULL
    WHERE id=$1
    `,
    [workerId]
  );

  await pool.query(
    `
    UPDATE jobs
    SET
      status='COMPLETED',
      progress=100,
      completed_at=NOW()
    WHERE id=$1
    `,
    [jobId]
  );

  await pool.query(
    `
    UPDATE execution_history
    SET
      status='COMPLETED',
      ended_at=NOW()
    WHERE id=$1
    `,
    [executionId]
  );

};

const failExecution = async (
  workerId,
  jobId,
  executionId,
  errorMessage
) => {

  console.log(
    `Failing Job ${jobId}`
  );

  await pool.query(
    `
    UPDATE workers
    SET
      status='ONLINE',
      current_job_id=NULL
    WHERE id=$1
    `,
    [workerId]
  );

  if (executionId) {

    await pool.query(
      `
      UPDATE execution_history
      SET
        status='FAILED',
        error_message=$1,
        ended_at=NOW()
      WHERE id=$2
      `,
      [
        errorMessage,
        executionId
      ]
    );

  }

};

module.exports = {
  startExecution,
  finishExecution,
  failExecution
};