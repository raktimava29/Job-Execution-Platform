const express = require("express");
const router = express.Router();

const { createJob } = require("../controllers/job-controller");

router.post("/", createJob);

module.exports = router;