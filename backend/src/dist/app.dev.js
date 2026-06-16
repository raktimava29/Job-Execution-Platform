"use strict";

var express = require("express");

var cors = require("cors");

var app = express();
app.use(cors());
app.use(express.json());

var jobRoutes = require("./routes/job-router");

var workerRoutes = require("./routes/worker-router");

var statsRoutes = require("./routes/stats-router");

app.use("/api/stats", statsRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/workers", workerRoutes);
module.exports = app;