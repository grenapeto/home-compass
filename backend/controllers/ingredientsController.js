import Ingredient from '../schemas/ingredientSchema.js'; // Ensure the correct path to your model

const handleErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const getIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return handleErrorResponse(res, 404, 'Ingredient not found');
    }
    res.json(ingredient);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const createIngredient = async (req, res) => {
  const ingredient = new Ingredient({ ...req.body });

  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const updateIngredient = async (req, res) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedIngredient) {
      return handleErrorResponse(res, 404, 'Ingredient not found');
    }
    res.json(updatedIngredient);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) {
      return handleErrorResponse(res, 404, 'Ingredient not found');
    }
    res.json({ message: 'Ingredient deleted' });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

export default {
  getAllIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient
};
