module.exports = (app) => {
    app.get('/try', (req, res) => {
        res.send({ message: 'This is try.' });
    });
};
