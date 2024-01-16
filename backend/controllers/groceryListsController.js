import GroceryList from '../schemas/groceryListSchema.js';

const handleErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const getAllGroceryLists = async (req, res) => {
  try {
    const groceryLists = await GroceryList.find();
    res.json(groceryLists);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const getGroceryList = async (req, res) => {
  try {
    const groceryList = await GroceryList.findById(req.params.id);
    if (!groceryList) {
      return handleErrorResponse(res, 404, 'Grocery list not found');
    }
    res.json(groceryList);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const createGroceryList = async (req, res) => {
  const groceryList = new GroceryList({ ...req.body });

  try {
    const newGroceryList = await groceryList.save();
    res.status(201).json(newGroceryList);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const updateGroceryList = async (req, res) => {
  try {
    const updatedGroceryList = await GroceryList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGroceryList) {
      return handleErrorResponse(res, 404, 'Grocery list not found');
    }
    res.json(updatedGroceryList);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const deleteGroceryList = async (req, res) => {
  try {
    const groceryList = await GroceryList.findByIdAndDelete(req.params.id);
    if (!groceryList) {
      return handleErrorResponse(res, 404, 'Grocery list not found');
    }
    res.json({ message: 'Grocery list deleted successfully' });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

export default {
  getAllGroceryLists,
  getGroceryList,
  createGroceryList,
  updateGroceryList,
  deleteGroceryList
};
