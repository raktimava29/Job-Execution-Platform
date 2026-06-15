"use strict";

require("dotenv").config();

var app = require("./app");

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running on ".concat(PORT));
});