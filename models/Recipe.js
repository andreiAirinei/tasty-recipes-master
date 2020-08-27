const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  // Create a connection between recipes and specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // Refer to 'users' collection
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // area: {
  //   type: String,
  //   required: true
  // },
  // youtube: {
  //   type: String,
  //   required: true
  // },
  // ingredients
  // image / thumb
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('recipe', RecipeSchema);