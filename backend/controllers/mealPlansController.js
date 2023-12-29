import MealPlan from '../schemas/mealPlanSchema.js';

const getAllMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find();
    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMealPlan = async (req, res) => {
  const mealPlan = new MealPlan({
    weekStartDate: req.body.weekStartDate,
    meals: req.body.meals
  });

  try {
    const newMealPlan = await mealPlan.save();
    res.status(201).json(newMealPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMealPlan = async (req, res) => {
  try {
    const updatedMealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.json(updatedMealPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllMealPlans,
  getMealPlan,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
};
