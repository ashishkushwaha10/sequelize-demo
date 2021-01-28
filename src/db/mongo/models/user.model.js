const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { salt } = require('../../../config/crypto.config');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    try {
        let { password } = this;
        if (!this.password)
            return next();

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

const UserModel = model('user', userSchema);

module.exports = UserModel;