import express from 'express';
import authController from '../controllers/authController.js';
import recipesController from '../controllers/recipesController.js';
import ingredientsController from '../controllers/ingredientsController.js';
import inventoryController from '../controllers/inventoryController.js';
import mealPlansController from '../controllers/mealPlansController.js';
import groceryListsController from '../controllers/groceryListsController.js';

const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/password-reset', authController.requestPasswordReset);
router.post('/password-reset/:token', authController.resetPassword);

// Recipes routes
router.route('/recipes')
    .get(recipesController.getAllRecipes)
    .post(recipesController.createRecipe);

router.route('/recipes/:id')
    .get(recipesController.getRecipe)
    .put(recipesController.updateRecipe)
    .delete(recipesController.deleteRecipe);

// Ingredients routes
router.route('/ingredients')
    .get(ingredientsController.getAllIngredients)
    .post(ingredientsController.createIngredient);

router.route('/ingredients/:id')
    .get(ingredientsController.getIngredient)
    .put(ingredientsController.updateIngredient)
    .delete(ingredientsController.deleteIngredient);

// Inventory routes
router.route('/inventory')
    .get(inventoryController.getAllInventoryItems)
    .post(inventoryController.createInventoryItem);

router.route('/inventory/:id')
    .get(inventoryController.getInventoryItem)
    .put(inventoryController.updateInventoryItem)
    .delete(inventoryController.deleteInventoryItem);

router.put('/inventory/:id/items/:itemId', inventoryController.editInventoryItemById);    
router.delete('/inventory/:id/items/:itemId', inventoryController.deleteInventoryItemById);

// Meal plans routes
router.route('/mealplans')
    .get(mealPlansController.getAllMealPlans)
    .post(mealPlansController.createMealPlan);

router.route('/mealplans/:id')
    .get(mealPlansController.getMealPlan)
    .put(mealPlansController.updateMealPlan)
    .delete(mealPlansController.deleteMealPlan);

// Grocery lists routes
router.route('/grocerylists')
    .get(groceryListsController.getAllGroceryLists)
    .post(groceryListsController.createGroceryList);

router.route('/grocerylists/:id')
    .get(groceryListsController.getGroceryList)
    .put(groceryListsController.updateGroceryList)
    .delete(groceryListsController.deleteGroceryList);

export default router;
