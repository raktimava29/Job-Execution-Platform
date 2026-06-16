const jobService = require("../services/job-service");
const pool = require("../config/db");

const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body);

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        status,
        priority,
        progress,
        attempts,
        max_attempts,
        assigned_worker,
        created_at
      FROM jobs
      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({
      success: true,
      data: result.rows
    });

  } catch(error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });

  }

};

const getJobById = async (req, res) => {

  try {

    const { id } = req.params;

    const jobResult =
      await pool.query(
        `
        SELECT *
        FROM jobs
        WHERE id=$1
        `,
        [id]
      );

    if (!jobResult.rows.length) {

      return res.status(404).json({
        success: false,
        message: "Job not found"
      });

    }

    const historyResult =
      await pool.query(
        `
        SELECT *
        FROM execution_history
        WHERE job_id=$1
        ORDER BY started_at DESC
        `,
        [id]
      );

    return res.status(200).json({
      success: true,
      data: {
        job: jobResult.rows[0],
        executions: historyResult.rows
      }
    });

  } catch(error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job"
    });

  }

};

module.exports = {
  createJob,
  getAllJobs,
  getJobById
};