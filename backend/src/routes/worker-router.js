const express = require("express");
const router = express.Router();

const {registerWorker, heartbeatWorker, getWorkers} = require("../controllers/worker-controller");

router.post("/register", registerWorker);
router.post("/heartbeat", heartbeatWorker);
router.get("/", getWorkers);

module.exports = router;