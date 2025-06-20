const { Schema, model } = require('mongoose');

const publicationSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    file: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('Publication', publicationSchema, 'publications'); // 'publications' is the name of the collection in MongoDB