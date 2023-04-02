const usersModel = require('../db/models/users');

const getUsers = async (req, res) => {
    try {
        const { limit } = req.query;
        if (limit) {
            const users = await usersModel.find().limit(parseInt(limit));
            return res.status(200).json(users);
        }
        const users = await usersModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersModel.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: error.message 
        })
    }
}

const createUsers = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await usersModel.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const updatedUser = { username, email, password }

        const user = await usersModel.findByIdAndUpdate(id, updatedUser);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        await usersModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
}