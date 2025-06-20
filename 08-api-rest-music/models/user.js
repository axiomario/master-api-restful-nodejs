const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'ROLE_USER' },
    image: { type: String, default: 'default.png' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('User', userSchema, 'users');
