module.exports = app => {

    require('./swagger.route')(app);
    require('./auth.route')(app);
    // require('./profile.route')(app);
    require('./user.route')(app);

    app.get('/', (req, res) => {
        res.send('hello world.');
    })
}