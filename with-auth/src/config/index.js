const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || 'mongodb://admin:admin@localhost:27017';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = { PORT, DB_URL, JWT_SECRET };
