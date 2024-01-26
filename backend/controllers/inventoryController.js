import Inventory from '../schemas/inventorySchema.js';

const handleErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const getAllInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const getInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return handleErrorResponse(res, 404, 'Inventory item not found');
    }
    res.json(item);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const createInventoryItem = async (req, res) => {
  const { name, items, category, barcode } = req.body; // Extract the barcode

  try {
    const newItem = new Inventory({ name, items, category, barcode }); // Include the barcode
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};


const editInventoryItemById = async (req, res) => {
  const { inventoryId, itemId } = req.params;
  const updateData = req.body;

  try {
    // Find the inventory by id and update the specific item within it
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return handleErrorResponse(res, 404, 'Inventory not found');
    }

    // Find the specific item in the inventory
    const itemIndex = inventory.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return handleErrorResponse(res, 404, 'Inventory item not found');
    }

    // Update the specific item
    inventory.items[itemIndex] = { ...inventory.items[itemIndex].toObject(), ...updateData };
    await inventory.save();

    res.json({ message: 'Inventory item updated successfully', item: inventory.items[itemIndex] });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const deleteInventoryItemById = async (req, res) => {
  const { inventoryId, itemId } = req.params;

  try {
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return handleErrorResponse(res, 404, 'Inventory not found');
    }

    const itemToDelete = inventory.items.find(item => item._id.toString() === itemId);
    if (!itemToDelete) {
      return handleErrorResponse(res, 404, 'Inventory item not found');
    }

    inventory.items = inventory.items.filter(item => item._id.toString() !== itemId);
    await inventory.save();

    res.json({ message: 'Inventory item deleted successfully', deletedItem: itemToDelete });
  } catch (error) {
    handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return handleErrorResponse(res, 404, 'Inventory item not found');
    }
    res.json(updatedItem);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) {
      return handleErrorResponse(res, 404, 'Inventory item not found');
    }
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

export default {
  getAllInventoryItems,
  getInventoryItem,
  createInventoryItem,
  editInventoryItemById,
  deleteInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem
};
