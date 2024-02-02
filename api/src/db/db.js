const config = require("./config");
const sql = require("mssql");

async function getConnection(){
    try{
        const pool = await sql.connect(config);
        return pool;
    }catch(e){
        console.error('SQL Connection Error: ', error);
    }
}
const db = new sql.ConnectionPool(config);

module.exports = {getConnection}