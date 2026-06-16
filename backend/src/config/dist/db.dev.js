"use strict";

var _require = require("pg"),
    Pool = _require.Pool;

var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
module.exports = pool;