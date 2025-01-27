const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Mock secret key for JWT (replace with a real secret key in production)
const JWT_SECRET = 'your-secret-key';

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // Check if the user exists and the password is correct
        if (!user || password !== 'password123') { // Replace with a proper password check in production
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { user_id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Return the token
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    });
};

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;