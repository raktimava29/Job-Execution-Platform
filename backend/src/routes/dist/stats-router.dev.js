"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/stats-controller"),
    getStats = _require.getStats;

router.get("/", getStats);
module.exports = router;