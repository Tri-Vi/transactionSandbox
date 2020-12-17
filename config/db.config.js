module.exports = {
  "HOST": "localhost",
  "USER": "transaction",
  "PASSWORD": "passW0rd",
  "DB": "transaction",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}