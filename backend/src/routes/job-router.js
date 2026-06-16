const express = require("express");
const router = express.Router();

const { createJob, getAllJobs, getJobById } = require("../controllers/job-controller");

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById)

module.exports = router;