const config = require("./config");
const sql = require("mssql");

const db = new sql.ConnectionPool(config);

module.exports = db;