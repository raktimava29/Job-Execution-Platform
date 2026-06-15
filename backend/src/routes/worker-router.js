const express = require("express");

const router = express.Router();

const {
  registerWorker,
  heartbeatWorker,
} = require("../controllers/worker-controller");

router.post(
  "/register",
  registerWorker
);

router.post(
  "/heartbeat",
  heartbeatWorker
);

module.exports = router;