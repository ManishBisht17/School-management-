const app = require('./app');
const connectDB = require('./db/connect');
const PORT = process.env.PORT || 8000;

// Connect to MongoDB and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});