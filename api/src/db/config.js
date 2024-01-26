require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME, // Replace with your database name
  options: {
    trustServerCertificate: true,
    trustedconnection:  false,
    enableArithAbort:  true,
    instancename:  'SQLEXPRESS'  // SQL Server instance name
  },
    port: +process.env.DB_PORT
  }
  
  module.exports = config;