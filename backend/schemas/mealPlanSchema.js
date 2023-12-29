import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  weekStartDate: Date,
  meals: [{
    date: Date,
    mealType: String, // e.g., 'Breakfast', 'Lunch', 'Dinner'
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  }]
});

export default mongoose.model('MealPlan', mealPlanSchema);
