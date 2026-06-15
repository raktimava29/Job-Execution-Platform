"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/worker-controller"),
    registerWorker = _require.registerWorker;

router.post("/register", registerWorker);
module.exports = router;