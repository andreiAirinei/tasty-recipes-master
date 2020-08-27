const mongoose = require('mongoose');

const BookmarkSchema = mongoose.Schema({
  // Create connection between bookmarks and specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // Refer to 'users' collection
    ref: 'users'
  },
  recipeID: {
    type: String,
    required: true
  },
  recipeName: {
    type: String,
    required: true
  },
  recipeImageUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('bookmark', BookmarkSchema);