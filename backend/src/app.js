const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const jobRoutes = require("./routes/job-router");
const workerRoutes = require("./routes/worker-router");
const statsRoutes = require("./routes/stats-router");

app.use("/api/stats", statsRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/workers", workerRoutes);

module.exports = app;