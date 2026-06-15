require("dotenv").config();

const registerWorker = require("./services/register-service");
const startHeartbeat = require("./services/heartbeat-service");

(async () => {
  try {
    const workerInfo = await registerWorker();

    console.log("Worker Registered:");
    console.log(workerInfo);

    const workerId = workerInfo.id;

    startHeartbeat(workerId);

  } catch (error) {
    console.error(error);
  }
})();