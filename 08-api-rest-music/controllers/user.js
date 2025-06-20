const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const validator = require('validator');

const validateUserData = (data) => {
    const { name, lastname, email, password } = data;
    let errors = [];

    if (validator.isEmpty(name)) {
        errors.push('Name is required');
    }
    if (validator.isEmpty(lastname)) {
        errors.push('Lastname is required');
    }
    if (!validator.isEmail(email)) {
        errors.push('Invalid email format');
    }
    if (!validator.isLength(password, { min: 6 })) {
        errors.push('Password must be at least 6 characters long');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};

const register = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);
        const validation = validateUserData(req.body);

        if (!validation.isValid) {
            return res.status(400).json({ errors: validation.errors });
        }

        const newUser = new User({ name, lastname, email, password: passwordHash });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.createToken(user);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const profile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const update = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, lastname } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { name, lastname }, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ error });
    }
};

module.exports = {
    register,
    login,
    profile,
    update
};