const { Schema, model } = require('mongoose');
const user = require('./user');

const followSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    followed: { type: Schema.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('Follow', followSchema, 'follows');