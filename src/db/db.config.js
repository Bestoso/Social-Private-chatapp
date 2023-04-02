const mongoose = require('mongoose');
const { DB_URI } = process.env;

const connectToDB = async () => {
    try {
        mongoose.connect(DB_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to DB');
    }
}

module.exports = connectToDB;