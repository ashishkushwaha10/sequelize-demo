const mongoose = require('mongoose');
const { mongoURI } = require('../../config/db.config').mongo;

mongoose.connect(mongoURI)
    .then(console.log(`successfully connected to mongodb`))
    .catch(err => {
        console.log(`error connecting database. ${err}`)
    })

module.exports = mongoose;