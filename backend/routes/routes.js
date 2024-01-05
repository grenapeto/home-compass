import express from 'express';
import {morganMiddleware} from '../config/logger.js'; // Import Morgan
import authController from '../controllers/authController.js';
import recipesController from '../controllers/recipesController.js';
import inventoryController from '../controllers/inventoryController.js';
import ingredientsController from '../controllers/ingredientsController.js';
import mealPlansController from '../controllers/mealPlansController.js';
import groceryListsController from '../controllers/groceryListsController.js';

const router = express.Router();

// router.use(morganMiddleware);

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Password reset request
router.post('/password-reset', authController.requestPasswordReset);

// Password reset
router.post('/password-reset/:token', authController.resetPassword);

// Recipes routes
router.get('/recipes', recipesController.getAllRecipes);
router.get('/recipes/:id', recipesController.getRecipe);
router.post('/recipes', recipesController.createRecipe);
router.put('/recipes/:id', recipesController.updateRecipe);
router.delete('/recipes/:id', recipesController.deleteRecipe);

// Ingredients routes
router.get('/ingredients', ingredientsController.getAllIngredients);
router.get('/ingredients/:id', ingredientsController.getIngredient);
router.post('/ingredients', ingredientsController.createIngredient);
router.put('/ingredients/:id', ingredientsController.updateIngredient);
router.delete('/ingredients/:id', ingredientsController.deleteIngredient);

// Inventory routes
router.get('/inventory', inventoryController.getAllInventoryItems);
router.get('/inventory/:id', inventoryController.getInventoryItem);
delete('inventory/:id/items/:itemId', async (req, res) => {
    const { _id, itemId } = req.params;
  
    try {
      const result = await Inventory.findByIdAndUpdate(
        _id,
        { $pull: { items: { _id: itemId } } },
        { new: true }
      );
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.post('/inventory', inventoryController.createInventoryItem);
router.put('/inventory/:id', inventoryController.updateInventoryItem);
router.delete('/inventory/:id', inventoryController.deleteInventoryItem);

// Meal plans routes
router.get('/mealplans', mealPlansController.getAllMealPlans);
router.get('/mealplans/:id', mealPlansController.getMealPlan);
router.post('/mealplans', mealPlansController.createMealPlan);
router.put('/mealplans/:id', mealPlansController.updateMealPlan);
router.delete('/mealplans/:id', mealPlansController.deleteMealPlan);

// Grocery lists routes
router.get('/grocerylists', groceryListsController.getAllGroceryLists);
router.get('/grocerylists/:id', groceryListsController.getGroceryList);
router.post('/grocerylists', groceryListsController.createGroceryList);
router.put('/grocerylists/:id', groceryListsController.updateGroceryList);
router.delete('/grocerylists/:id', groceryListsController.deleteGroceryList);

export default router;
