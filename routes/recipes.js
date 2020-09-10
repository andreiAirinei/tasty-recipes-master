const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Recipe = require('../models/Recipe');

// @route   GET api/recipes
// @desc    Get all recipes of a specific user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).sort({ date: -1 });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route   POST api/recipes
// @desc    Add new recipe
// @access  Private
router.post('/', [auth, [
  check('name', 'Recipe name is required!').not().isEmpty(),
  check('category', 'Recipe category is required!').not().isEmpty(),
  check('area', 'Recipe area is required!').not().isEmpty(),
  check('ingredients', 'Atleast 1 ingredient is required!').not().isEmpty(),
  check('steps', 'Atleast 1 step is required!').not().isEmpty()
]], async (req, res) => {
  // Get errors if any
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return bad request
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, category, area, youtubeURL, imageFromIMGBB, ingredients, steps } = req.body;

  try {
    const newRecipe = new Recipe({
      user: req.user.id,
      name,
      category,
      area,
      youtubeURL,
      imageFromIMGBB,
      ingredients,
      steps
    });

    const recipe = await newRecipe.save();

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route   PUT api/recipes
// @desc    Update/Edit recipe
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, category, area, youtubeURL, imageFromIMGBB, ingredients, steps } = req.body;

  // Build recipe object
  const recipeFields = {
    name,
    category,
    area,
    youtubeURL,
    imageFromIMGBB,
    ingredients,
    steps
  };

  // if (name) recipeFields.name = name;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: 'Recipe not found! ' });

    // Making sure that the user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Recipe update not authorized!' });
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id,
      { $set: recipeFields },
      // If the recipe does not exist, just create it
      { new: true });

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route   DELETE api/recipes
// @desc    Remove recipe
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: 'Recipe not found! ' });

    // Making sure that the user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Recipe remove not authorized!' });
    }

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Recipe removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;