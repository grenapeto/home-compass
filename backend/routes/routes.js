import express from 'express';
import authController from '../controllers/authController.js';
import recipesController from '../controllers/recipesController.js';
import ingredientsController from '../controllers/ingredientsController.js';
import inventoryController from '../controllers/inventoryController.js';
import mealPlansController from '../controllers/mealPlansController.js';
import groceryListsController from '../controllers/groceryListsController.js';

const router = express.Router();

// Auth routes

/**
 * @swagger
 * /v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/v1/register', authController.register);

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Login to the system
 *     description: User login with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/v1/login', authController.login);
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
/**
 * @swagger
 * /v1/ingredients:
 *   get:
 *     summary: Get all ingredients
 *     description: Retrieve a list of all ingredients.
 *     responses:
 *       200:
 *         description: A list of ingredients.
 *   post:
 *     summary: Create a new ingredient
 *     description: Add a new ingredient to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ingredient created successfully.
 *       400:
 *         description: Bad request.
 */
router.route('/v1/ingredients')
    .get(ingredientsController.getAllIngredients)
    .post(ingredientsController.createIngredient);

/**
 * @swagger
 * /v1/ingredients/{id}:
 *   get:
 *     summary: Get a single ingredient
 *     description: Retrieve details of a specific ingredient.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredient details.
 *       404:
 *         description: Ingredient not found.
 *   put:
 *     summary: Update an ingredient
 *     description: Update the details of a specific ingredient.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ingredient updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Ingredient not found.
 *   delete:
 *     summary: Delete an ingredient
 *     description: Remove a specific ingredient from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully.
 *       404:
 *         description: Ingredient not found.
 */
router.route('/v1/ingredients/:id')
    .get(ingredientsController.getIngredient)
    .put(ingredientsController.updateIngredient)
    .delete(ingredientsController.deleteIngredient);

// Inventory routes
/**
 * @swagger
 * /v1/inventory:
 *   get:
 *     summary: Get all inventory items
 *     description: Retrieve a list of all items in the inventory.
 *     responses:
 *       200:
 *         description: A list of inventory items.
 *   post:
 *     summary: Create a new inventory item
 *     description: Add a new item to the inventory.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inventory item created successfully.
 *       400:
 *         description: Bad request.
 */
router.route('/v1/inventory')
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
