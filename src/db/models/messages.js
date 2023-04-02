const { Schema, model } = require('mongoose');

const messagesSchema = new Schema({
    username: {
        type: String,
        index: true,
        required: true
    },
    message: {
        type: String,
        index: true,
        required: true
    }
})

const messagesModel = model('messages', messagesSchema);

module.exports = messagesModel;