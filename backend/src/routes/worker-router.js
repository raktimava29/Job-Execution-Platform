const express = require("express");

const router = express.Router();

const {
  registerWorker,
} = require("../controllers/worker-controller");

router.post("/register", registerWorker);

module.exports = router;