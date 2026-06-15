"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/worker-controller"),
    registerWorker = _require.registerWorker,
    heartbeatWorker = _require.heartbeatWorker;

router.post("/register", registerWorker);
router.post("/heartbeat", heartbeatWorker);
module.exports = router;