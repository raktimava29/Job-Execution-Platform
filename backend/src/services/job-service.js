const pool = require("../config/db");
const jobQueue = require("../queues/jobQueue");

const createJob = async (jobData) => {
  const {
    name,
    payload,
    priority = 1,
    maxAttempts = 3,
  } = jobData;

  if (!name) {
    throw new Error("Job name is required");
  }

  const result = await pool.query(
    `
    INSERT INTO jobs
    (
      name,
      payload,
      priority,
      max_attempts
    )
    VALUES
    ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      name,
      payload,
      priority,
      maxAttempts,
    ]
  );

  const job = result.rows[0];

  await jobQueue.add(
    "execute-job",
    {
      jobId: job.id,
    },
    {
      priority: priority,
      attempts: maxAttempts,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
    }
  );

  console.log("Job Added to BullMQ")

  return job;
};

module.exports = {
  createJob,
};