const { Schema, model } = require('mongoose');

const artistSchema = Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: 'default.png' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('Artist', artistSchema, 'artists');
