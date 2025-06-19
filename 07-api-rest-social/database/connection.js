const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb://admin:admin@localhost:27017/social?authSource=admin');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Database connection failed');
  }
}

module.exports = connection;