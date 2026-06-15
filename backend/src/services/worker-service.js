const pool = require("../config/db");

const register = async ({
  workerName,
  hostName,
  processId,
}) => {

  const result = await pool.query(
    `
    INSERT INTO workers
    (
      worker_name,
      host_name,
      process_id,
      status,
      last_heartbeat
    )
    VALUES
    ($1,$2,$3,'ONLINE',NOW())
    RETURNING *
    `,
    [
      workerName,
      hostName,
      processId,
    ]
  );

  return result.rows[0];
};

module.exports = {
  register,
};