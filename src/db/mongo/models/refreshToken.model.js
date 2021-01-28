const {Schema, model} = require('mongoose');

const refreshTokenSchema = new Schema({
    refresh_token: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const RefreshTokenModel = model('refresh_token', refreshTokenSchema);

module.exports = RefreshTokenModel