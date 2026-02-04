const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://212cs032:tfsur2a0AN2UeMKt@cluster0.xem3i9f.mongodb.net/dashboard';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-env';

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    dashboardData: {
        totalUsers: { type: Number, default: 0 },
        revenue: { type: Number, default: 0 },
        activeCourses: { type: Number, default: 0 },
        pendingTasks: { type: Number, default: 0 }
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

// Middleware: Verify JWT Token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

// Routes

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            email,
            password,
            role: 'user'
        });

        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            user: { _id: newUser._id, email: newUser.email, role: newUser.role },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Sign up failed', error: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            user: { _id: user._id, email: user.email, role: user.role },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Get user dashboard data
app.get('/api/user/data', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.dashboardData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

// Update user dashboard data
app.put('/api/user/data', verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { dashboardData: req.body },
            { new: true }
        );

        res.json({ message: 'Data updated', data: user.dashboardData });
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error: error.message });
    }
});

// Admin: Get all users
app.get('/api/admin/users', verifyToken, async (req, res) => {
    try {
        if (req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const users = await User.find({}, 'email role createdAt');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Admin: Get all users data
app.get('/api/admin/users/data', verifyToken, async (req, res) => {
    try {
        if (req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

// Admin: Promote user to admin
app.put('/api/admin/promote/:userId', verifyToken, async (req, res) => {
    try {
        if (req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { role: 'admin' },
            { new: true }
        );

        res.json({ message: 'User promoted to admin', user });
    } catch (error) {
        res.status(500).json({ message: 'Error promoting user', error: error.message });
    }
});

// Admin: Delete user
app.delete('/api/admin/users/:userId', verifyToken, async (req, res) => {
    try {
        if (req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        await User.findByIdAndDelete(req.params.userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
