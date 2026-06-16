const workerService = require("../services/worker-service");
const pool = require("../config/db");

const getWorkers = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        worker_name,
        status,
        current_job_id,
        last_heartbeat,
        created_at
      FROM workers
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
      message: "Failed to fetch workers"
    });

  }

};

const registerWorker = async (req, res) => {
  try {
    const worker =
      await workerService.register(req.body);

    res.status(201).json(worker);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const heartbeatWorker = async (req, res) => {
  try {

    await workerService.heartbeat(
      req.body.workerId
    );

    res.status(200).json({
      message: "Heartbeat received",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  registerWorker,
  heartbeatWorker,
  getWorkers
};