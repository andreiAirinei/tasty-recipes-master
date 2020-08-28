const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Bookmark = require('../models/Bookmark');

// @route   GET api/bookmarks
// @desc    Get user's bookmarks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id });
    res.json(bookmarks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route   POST api/bookmarks
// @desc    Add to bookmarks
// @access  Private
router.post('/', auth, async (req, res) => {
  const { recipeID, recipeName, recipeImageUrl } = req.body;

  try {
    // Check if recipe is already in Bookmarks list
    let bm = await Bookmark.findOne({ recipeID });

    if (bm) {
      return res.status(400).json({ msg: 'Recipe already in Bookmarks list!' })
    }

    // Else, continue with saving the new bookmark
    const newBookmark = new Bookmark({
      user: req.user.id,
      recipeID,
      recipeName,
      recipeImageUrl
    });

    const bookmark = await newBookmark.save();
    res.json(bookmark);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE  api/bookmarks/:id
// @desc    Delete bookmark
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let bookmark = await Bookmark.findById(req.params.id)

    if (!bookmark) return res.status(400).json({ msg: 'Bookmark not found' });

    // Make sure user owns the favorite recipe
    if (bookmark.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Bookmark.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Bookmark removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;