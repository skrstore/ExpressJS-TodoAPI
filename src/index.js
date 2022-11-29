const { connectDB } = require('./shared/utils');
const { PORT } = require('./config');
const { app } = require('./server');

// NOTE: Logger library to replace `console.log` - winston - https://www.npmjs.com/package/winston

const main = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`[Server] Listening on ${PORT}`));
    } catch (error) {
        console.log('[Error] ', error);
        process.exit(0);
    }
};

process.on('unhandledRejection', (error) => {
    console.log('[unhandledRejection] ', error);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.log('[uncaughtException] ', error);
    process.exit(1);
});

main();
