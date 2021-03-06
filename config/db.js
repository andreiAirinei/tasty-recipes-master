const mongoose = require('mongoose');
const config = require('config');

// Grabs the value from 'default.json'
const db = config.get('mongoURI');

// Mongoose returns promises
const connectDB = async () => {

  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;