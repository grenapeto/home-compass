import MealPlan from '../schemas/mealPlanSchema.js';

const handleErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const getAllMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find();
    res.json(mealPlans);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const getMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    if (!mealPlan) {
      return handleErrorResponse(res, 404, 'Meal plan not found');
    }
    res.json(mealPlan);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const createMealPlan = async (req, res) => {
  const mealPlan = new MealPlan({ ...req.body });

  try {
    const newMealPlan = await mealPlan.save();
    res.status(201).json(newMealPlan);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
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
      return handleErrorResponse(res, 404, 'Meal plan not found');
    }
    res.json(updatedMealPlan);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);
    if (!mealPlan) {
      return handleErrorResponse(res, 404, 'Meal plan not found');
    }
    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

export default {
  getAllMealPlans,
  getMealPlan,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
};
