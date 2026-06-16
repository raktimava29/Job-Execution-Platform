const pool = require("../config/db");

const getStats = async (req, res) => {

  try {

    const [
      totalJobs,
      completedJobs,
      failedJobs,
      runningJobs,
      queuedJobs,
      onlineWorkers,
      offlineWorkers
    ] = await Promise.all([

      pool.query(
        `
        SELECT COUNT(*)::int
        AS count
        FROM jobs
        `
      ),

      pool.query(
        `
        SELECT COUNT(*)::int
        AS count
        FROM jobs
        WHERE status='COMPLETED'
        `
      ),

      pool.query(
        `
        SELECT COUNT(*)::int
        AS count
        FROM jobs
        WHERE status='FAILED'
        `
      ),

      pool.query(
        `
        SELECT COUNT(*)::int
        AS count
        FROM jobs
        WHERE status='RUNNING'
        `
      ),

      pool.query(
        `
        SELECT COUNT(*)::int
        AS count
        FROM jobs
        WHERE status='QUEUED'
        `
      ),

      pool.query(
        `
        SELECT COUNT(*)::int
        AS count
        FROM workers
        WHERE status='ONLINE'
        `
      ),

      pool.query(
        `
        SELECT COUNT(*)::int
        AS count
        FROM workers
        WHERE status='OFFLINE'
        `
      )

    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalJobs:
          totalJobs.rows[0].count,

        completedJobs:
          completedJobs.rows[0].count,

        failedJobs:
          failedJobs.rows[0].count,

        runningJobs:
          runningJobs.rows[0].count,

        queuedJobs:
          queuedJobs.rows[0].count,

        onlineWorkers:
          onlineWorkers.rows[0].count,

        offlineWorkers:
          offlineWorkers.rows[0].count
      }
    });

  } catch(error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats"
    });

  }

};

module.exports = {
  getStats
};