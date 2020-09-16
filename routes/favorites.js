const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Favorites = require('../models/Favorites');

// @route   GET api/favorites
// @desc    Get user's favorites
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorites.find({ user: req.user.id });
    res.json(favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route   POST api/favorites
// @desc    Add to favorites
// @access  Private
router.post('/', auth, async (req, res) => {
  const { recipeID, recipeName, recipeImageUrl } = req.body;

  try {
    // Check if recipe is already in Favorites list
    let fav = await Favorites.findOne({ recipeID });

    if (fav) {
      return res.status(400).json({ msg: 'Recipe already in Favorites list!' });
    }

    // Create the fav object and save it to DB
    const newFavorite = new Favorites({
      user: req.user.id,
      recipeID,
      recipeName,
      recipeImageUrl
    });

    const favorite = await newFavorite.save();
    res.json(favorite);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE  api/favorites/:id
// @desc    Delete favorite
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // let favorite = await Favorites.findById(req.params.id);

    let favorite = await Favorites.findOne({ recipeID: req.params.id });

    if (!favorite) return res.status(400).json({ msg: 'Favorite recipe not found' });

    // Make sure user owns the favorite recipe
    if (favorite.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Favorites.findByIdAndRemove(favorite._id);

    res.json({ msg: 'Favorite successfully removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;