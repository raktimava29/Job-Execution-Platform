const axios = require("axios");

const registerWorker = async () => {

  const response = await axios.post(
    `${process.env.API_URL}/api/workers/register`,
    {
      workerName:
        `worker-${process.pid}`,

      hostName:
        require("os").hostname(),

      processId:
        process.pid.toString(),
    }
  );

  return response.data;
};

module.exports = registerWorker;