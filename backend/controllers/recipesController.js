import Recipe from '../schemas/recipeSchema.js';

const handleErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return handleErrorResponse(res, 404, 'Recipe not found');
    }
    res.json(recipe);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const createRecipe = async (req, res) => {
  const transformedData = {
    ...req.body,
    ingredients: req.body.ingredientsAdded // renaming ingredientsAdded to ingredients
  };
  delete transformedData.ingredientsAdded; // remove the original ingredientsAdded field

  const recipe = new Recipe(transformedData);

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) {
      return handleErrorResponse(res, 404, 'Recipe not found');
    }
    res.json(updatedRecipe);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return handleErrorResponse(res, 404, 'Recipe not found');
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

export default {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
