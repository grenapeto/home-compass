import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  ingredientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory'
  },
  quantity: Number,
  unit: String
});

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [ingredientSchema],
  instructions: [String],
  prepTime: Number,
  cookTime: Number,
  servings: Number,
  imageUrl: String
});

export default mongoose.model('Recipe', recipeSchema);
