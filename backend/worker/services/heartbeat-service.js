const axios = require("axios");

const startHeartbeat = (workerId) => {
  setInterval(async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/workers/heartbeat",
        {
          workerId,
        }
      );

      console.log("Heartbeat sent");
    } catch (error) {
      console.error(
        "Heartbeat failed:",
        error.response?.data || error.message
      );
    }
  }, 5000);
};

module.exports = startHeartbeat;