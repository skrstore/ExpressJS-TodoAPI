const { connectDB } = require('./utils');
const { PORT } = require('./config');
const { app } = require('./server');

const main = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`[Server] Listening on ${PORT}`));
};

main();
