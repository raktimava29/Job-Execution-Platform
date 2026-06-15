const pool = require("../config/db");

const { recoverWorkerJobs } = require("./recovery-service");

const startHeartbeatMonitor = () => {

  setInterval(async () => {

    try {
      console.log("Monitor running")  
      const result =
        await pool.query(
          `
          SELECT *
          FROM workers
          WHERE
          last_heartbeat <
          NOW() - INTERVAL '15 seconds'
          AND status != 'OFFLINE'
          `
        );

    console.log(
      `Found ${result.rows.length} stale workers`
    );

      for (
        const worker of result.rows
      ) {

        console.log(
          `Worker ${worker.id} offline`
        );

        await pool.query(
          `
          UPDATE workers
          SET 
            status='OFFLINE',
            current_job_id=NULL
          WHERE id=$1
          `,
          [worker.id]
        );

        await recoverWorkerJobs(
          worker.id
        );

      }

    } catch(error) {

      console.error(error);

    }

  }, 15000);

};

module.exports =
  startHeartbeatMonitor;