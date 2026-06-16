"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/job-controller"),
    createJob = _require.createJob,
    getAllJobs = _require.getAllJobs,
    getJobById = _require.getJobById;

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
module.exports = router;