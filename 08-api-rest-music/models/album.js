const { Schema, model } = require('mongoose');

const albumSchema = Schema({
    artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
    title: { type: String, required: true },
    description: { type: String },
    year: { type: Number, required: true },
    image: { type: String, default: 'default.png' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('Album', albumSchema, 'albums');
