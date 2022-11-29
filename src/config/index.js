const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://admin:admin@localhost:27017';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = {
    PORT,
    MONGODB_URL,
    JWT_SECRET,
    name: process.env.NAME,
    version: process.env.VERSION || 'v0.1', // TODO: read from package.json
    dbName: process.env.DB_NAME || 'test',
};
