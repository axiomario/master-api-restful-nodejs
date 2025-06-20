const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');
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

const isAuthenticated = (req, res) => {
    if (req.user) {
        return res.status(200).json({ message: 'User is authenticated', user: req.user });
    } else {
        return res.status(401).json({ message: 'User is not authenticated' });
    }
};

const getProfile = (req, res) => {
    const id = req.params.id;

    User.findById(id).select({password: 0}).then(user => {
        if (!user) {
            throw new Error('User not found');
        }
        res.status(200).json({ user });
    }).catch(error => {
        return res.status(404).json({ error });
    });
};

const getUsers = (req, res) => {
    const page = parseInt(req.params.page || 1);
    const limit = 5;

    User.find()
        .select({password: 0})
        .sort('_id')
        .paginate({}, { page, limit }, )
        .then(data => {
            if (!data || !data.docs || data.docs.length === 0) {
                throw new Error('No users found');
            }
            res.status(200).json(data);
        })
        .catch(error => {
            return res.status(404).json({ error });
        });
}

const update = (req, res) => {
    const updateData = req.body;
    const userId = req.user.id;
    
    User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            const { password, ...userWithoutPassword } = updatedUser.toObject();
            res.status(200).json({ message: 'User updated successfully', user: userWithoutPassword });
        })
        .catch(error => {
            return res.status(500).json({ error });
        });
}

const updateImage = (req, res) => {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = file.path.replace(/\\/g, '/'); // Normalize path for cross-platform compatibility

    User.findByIdAndUpdate(userId, { image: imagePath }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Image uploaded successfully', user: updatedUser });
        })
        .catch(error => {
            return res.status(500).json({ error });
        });
}

const getUserImageFile = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const imageFile = user.image;

    fs.stat(imageFile, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.sendFile(path.resolve(imageFile));
    });
}


module.exports = {
    register,
    login,
    isAuthenticated,
    getProfile,
    getUsers,
    update,
    updateImage,
    getUserImageFile
};