const messagesModel = require('../db/models/messages')

const getMessages = async (req, res) => {
    try {
        const messages = await messagesModel.find();
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error
        })
    }
}

const postMessages = async (req, res) => {
    try {
        const { username, message } = req.body;
        
        if (!username || !message) return res.status(400).json({ message: 'username and message are required' });

        const newMessage = await messagesModel.create({ username, message });
        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error
        })
    }
}

module.exports = {
    getMessages,
    postMessages
}