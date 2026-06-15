"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/job-controller"),
    createJob = _require.createJob;

router.post("/", createJob);
module.exports = router;