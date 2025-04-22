const { default: mongoose } = require('mongoose');
const RecipeModel = require('../models/Recipe');

const RecipeControllers = {
   getAllRecipes: async (req, res) => {
      const page = req.query.page * 1 || 1;
      const limit = 6;
      const skip = (page - 1) * limit; // 2 * 10
      let results = await RecipeModel.find().skip(skip).limit(limit);
      const count = await RecipeModel.countDocuments();
      // if (req.query.page) {
      //    if (skip >= count) throw new Error('This page does not exist');
      // }
      let totalPagesCount = Math.ceil(count / limit);

      let links = {
         nextPage: totalPagesCount <= page ? false : true,
         prevPage: page == 1 ? false : true,
         totalData: count,
         existedPages: totalPagesCount,
         currentPages: page,
         loopableLinks: [],
      }; 
      for(let i = 0; i < links.existedPages; i++ ){
         let number = i + 1;
         links.loopableLinks.push({number})
      }
      return res.json({
         status: 'SUCCESS',
         links: links,
         data: results,
      });
   },
   store: async (req, res) => {
      const { title, description, image, ingredients } = req.body;
      const recipe = await RecipeModel.create({
         title,
         description,
         image,
         ingredients,
      });
      res.status(201).json({
         status: 'success',
         data: recipe,
      });
   },
   getIndividualRecipe: async (req, res) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ msg: 'Not a valid id' });
      }
      try {
         const recipe = await RecipeModel.findById(id);
         if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
         }
         return res.json(recipe);
      } catch (e) {
         return res.status(500).json({ msg: 'Internet server error' });
      }
   },
   delete: async (req, res) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ msg: 'Not a valid id' });
      }
      try {
         let recipe = await RecipeModel.findByIdAndDelete(id);
         if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
         }
         return res.json(recipe);
      } catch (e) {
         return res.status(500).json({ msg: 'Internet server error' });
      }
   },
   update: async (req, res) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ msg: 'Not a valid id' });
      }
      try {
         let recipe = await RecipeModel.findByIdAndUpdate(id);
         if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
         }
         return res.json(recipe);
      } catch (e) {
         return res.status(500).json({ msg: 'Internet server error' });
      }
   },
};

module.exports = RecipeControllers;
