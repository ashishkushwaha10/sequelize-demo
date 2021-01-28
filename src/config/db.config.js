module.exports = {
    mongo: {
        mongoURI: process.env.mongoURI,
        host: "localhost",
        port: 27017,
        user: "",
        pass: ""
    },
    mysql: {
        host: process.env.host,
        user: process.env.user,
        pass: process.env.pass,
        dialect: process.env.dialect,
        dbname: process.env.db
    }
}