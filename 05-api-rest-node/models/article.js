const { Schema, model } = require('mongoose');

const articleSchema = Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    imagen: { type: String, default: 'default.png' },
});

module.exports = model('Article', articleSchema, 'articles');
