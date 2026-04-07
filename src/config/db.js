const { Pool } = require("pg")

const pool = new Pool({
  user: "heitor",
  host: "localhost",
  database: "encurtaApi",
  password: "",
  port: 5432
})

module.exports = pool