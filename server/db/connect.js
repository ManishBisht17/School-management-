const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://manisbst123:b2l6qq4nx8zwYj8z@cluster0.a9y0o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;