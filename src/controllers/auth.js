const usersModel = require('../db/models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await usersModel.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const logout = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    logout
}