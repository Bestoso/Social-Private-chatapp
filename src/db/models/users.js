const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const usersModel = model('users', usersSchema);

module.exports = usersModel;