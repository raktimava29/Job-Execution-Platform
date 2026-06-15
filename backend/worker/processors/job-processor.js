const executionService =
  require("../services/execution-service");

module.exports = async function(job){

  await executionService.execute(job);

};