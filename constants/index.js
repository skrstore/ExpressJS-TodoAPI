const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || "mongodb://admin:admin@localhost:27017";

module.exports = { PORT, DB_URL };
