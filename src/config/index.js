const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || 'mongodb://admin:admin@localhost:27017';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const config = {
    name: process.env.NAME,
    version: process.env.VERSION || 'v0.1', // TODO: read from package.json
    dbName: process.env.DB_NAME || 'test',
};

module.exports = { PORT, DB_URL, JWT_SECRET };
