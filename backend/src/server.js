require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const startHeartbeatMonitor = require("./services/heartbeat-monitor-service");

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  startHeartbeatMonitor();
  console.log("Heartbeat Monitor started");
});