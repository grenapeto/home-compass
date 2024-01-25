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
 *     tags:
 *       - Auth
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
 *     tags:
 *       - Auth
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
router.post('/v1//password-reset', authController.requestPasswordReset);
router.post('/v1//password-reset/:token', authController.resetPassword);

// Recipes routes
/**
 * @swagger
 * /recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get all recipes
 *     description: Retrieve a list of all recipes.
 *     responses:
 *       200:
 *         description: A list of recipes.
 *   post:
 *     tags:
 *       - Recipes
 *     summary: Create a new recipe
 *     description: Add a new recipe to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully.
 *       400:
 *         description: Bad request.
 */
router.route('/recipes')
    .get(recipesController.getAllRecipes)
    .post(recipesController.createRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get a single recipe
 *     description: Retrieve details of a specific recipe.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe details.
 *       404:
 *         description: Recipe not found.
 *   put:
 *     tags:
 *       - Recipes
 *     summary: Update a recipe
 *     description: Update the details of a specific recipe.
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
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Recipe not found.
 *   delete:
 *     tags:
 *       - Recipes
 *     summary: Delete a recipe
 *     description: Remove a specific recipe from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully.
 *       404:
 *         description: Recipe not found.
 */
router.route('/recipes/:id')
    .get(recipesController.getRecipe)
    .put(recipesController.updateRecipe)
    .delete(recipesController.deleteRecipe);


// Ingredients routes
/**
 * @swagger
 * /v1/ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Get all ingredients
 *     description: Retrieve a list of all ingredients.
 *     responses:
 *       200:
 *         description: A list of ingredients.
 *   post:
 *     tags:
 *       - Ingredients
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
 *     tags:
 *       - Ingredients
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
 *     tags:
 *       - Ingredients
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
 *     tags:
 *       - Ingredients
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
 *     tags:
 *       - Inventory
 *     summary: Get all inventory items
 *     description: Retrieve a list of all items in the inventory.
 *     responses:
 *       200:
 *         description: A list of inventory items.
 *   post:
 *     tags:
 *       - Inventory
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

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     tags:
 *       - Inventory
 *     summary: Get a single inventory item
 *     description: Retrieve details of a specific inventory item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item details.
 *       404:
 *         description: Inventory item not found.
 *   put:
 *     tags:
 *       - Inventory
 *     summary: Update an inventory item
 *     description: Update the details of a specific inventory item.
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
 *               itemName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inventory item updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Inventory item not found.
 *   delete:
 *     tags:
 *       - Inventory
 *     summary: Delete an inventory item
 *     description: Remove a specific inventory item from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully.
 *       404:
 *         description: Inventory item not found.
 */    
router.route('/inventory/:id')
    .get(inventoryController.getInventoryItem)
    .put(inventoryController.updateInventoryItem)
    .delete(inventoryController.deleteInventoryItem);

/**
 * @swagger
 * /inventory/{id}/items/{itemId}:
 *   put:
 *     tags:
 *       - Inventory
 *     summary: Edit a specific item in the inventory
 *     description: Update the details of a specific item in an inventory.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
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
 *               itemName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inventory item updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Inventory item not found.
 *   delete:
 *     tags:
 *       - Inventory
 *     summary: Delete a specific item from the inventory
 *     description: Remove a specific item from an inventory.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully.
 *       404:
 *         description: Inventory item not found.
 */
router.put('/inventory/:id/items/:itemId', inventoryController.editInventoryItemById);
router.delete('/inventory/:id/items/:itemId', inventoryController.deleteInventoryItemById);

// Meal plans routes
/**
 * @swagger
 * /mealplans:
 *   get:
 *     tags:
 *       - Meal Plans
 *     summary: Get all meal plans
 *     description: Retrieve a list of all meal plans.
 *     responses:
 *       200:
 *         description: A list of meal plans.
 *   post:
 *     tags:
 *       - Meal Plans
 *     summary: Create a new meal plan
 *     description: Add a new meal plan to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               meals:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Meal plan created successfully.
 *       400:
 *         description: Bad request.
 */

router.route('/mealplans')
    .get(mealPlansController.getAllMealPlans)
    .post(mealPlansController.createMealPlan);

/**
 * @swagger
 * /mealplans/{id}:
 *   get:
 *     tags:
 *       - Meal Plans
 *     summary: Get a single meal plan
 *     description: Retrieve details of a specific meal plan.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal plan details.
 *       404:
 *         description: Meal plan not found.
 *   put:
 *     tags:
 *       - Meal Plans
 *     summary: Update a meal plan
 *     description: Update the details of a specific meal plan.
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
 *               meals:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Meal plan updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Meal plan not found.
 *   delete:
 *     tags:
 *       - Meal Plans
 *     summary: Delete a meal plan
 *     description: Remove a specific meal plan from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal plan deleted successfully.
 *       404:
 *         description: Meal plan not found.
 */
router.route('/mealplans/:id')
    .get(mealPlansController.getMealPlan)
    .put(mealPlansController.updateMealPlan)
    .delete(mealPlansController.deleteMealPlan);

// Grocery lists routes
/**
 * @swagger
 * /grocerylists:
 *   get:
 *     tags:
 *       - Grocery Lists
 *     summary: Get all grocery lists
 *     description: Retrieve a list of all grocery lists.
 *     responses:
 *       200:
 *         description: A list of grocery lists.
 *   post:
 *     tags:
 *       - Grocery Lists
 *     summary: Create a new grocery list
 *     description: Add a new grocery list to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Grocery list created successfully.
 *       400:
 *         description: Bad request.
 */
router.route('/grocerylists')
    .get(groceryListsController.getAllGroceryLists)
    .post(groceryListsController.createGroceryList);

/**
 * @swagger
 * /grocerylists/{id}:
 *   get:
 *     tags:
 *       - Grocery Lists
 *     summary: Get a single grocery list
 *     description: Retrieve details of a specific grocery list.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grocery list details.
 *       404:
 *         description: Grocery list not found.
 *   put:
 *     tags:
 *       - Grocery Lists
 *     summary: Update a grocery list
 *     description: Update the details of a specific grocery list.
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
 *               title:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Grocery list updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Grocery list not found.
 *   delete:
 *     tags:
 *       - Grocery Lists
 *     summary: Delete a grocery list
 *     description: Remove a specific grocery list from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grocery list deleted successfully.
 *       404:
 *         description: Grocery list not found.
 */
router.route('/grocerylists/:id')
    .get(groceryListsController.getGroceryList)
    .put(groceryListsController.updateGroceryList)
    .delete(groceryListsController.deleteGroceryList);

export default router;
