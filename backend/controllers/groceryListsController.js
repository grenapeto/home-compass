import GroceryList from '../schemas/groceryListSchema.js';

const getAllGroceryLists = async (req, res) => {
  try {
    const groceryLists = await GroceryList.find();
    res.json(groceryLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroceryList = async (req, res) => {
  try {
    const groceryList = await GroceryList.findById(req.params.id);
    if (!groceryList) {
      return res.status(404).json({ message: 'Grocery list not found' });
    }
    res.json(groceryList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGroceryList = async (req, res) => {
  const groceryList = new GroceryList({
    dateCreated: req.body.dateCreated,
    items: req.body.items
  });

  try {
    const newGroceryList = await groceryList.save();
    res.status(201).json(newGroceryList);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: 'Grocery list not found' });
    }
    res.json(updatedGroceryList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGroceryList = async (req, res) => {
  try {
    const groceryList = await GroceryList.findByIdAndDelete(req.params.id);
    if (!groceryList) {
      return res.status(404).json({ message: 'Grocery list not found' });
    }
    res.json({ message: 'Grocery list deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllGroceryLists,
  getGroceryList,
  createGroceryList,
  updateGroceryList,
  deleteGroceryList
};
