const RecipeControllers = require('../controllers/RecipeController');
const express = require('express');
const { body } = require('express-validator');
const handleErrorMessage = require('../middlewares/handleErrorMessage');
const router = express.Router();

router.get('/', RecipeControllers.getAllRecipes);
router.post(
   '/add',
   [
      body('title').notEmpty(),
      body('description').notEmpty(),
      body('ingredients').notEmpty().isArray({ min: 2 }),
   ],
   handleErrorMessage,
   RecipeControllers.store
);
router.get('/:id', RecipeControllers.getIndividualRecipe);
router.delete('/:id', RecipeControllers.delete);
router.delete('/:id', RecipeControllers.update);

module.exports = router;
