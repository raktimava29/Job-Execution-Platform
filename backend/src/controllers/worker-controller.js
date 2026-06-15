const workerService =
  require("../services/worker-service");

const registerWorker = async (req, res) => {
  try {

    const worker =
      await workerService.register(req.body);

    res.status(201).json(worker);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  registerWorker,
};