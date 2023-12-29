import mongoose from 'mongoose';

const groceryItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory'
  },
  requiredQuantity: Number,
  unit: String,
  purchased: { type: Boolean, default: false }
});

const groceryListSchema = new mongoose.Schema({
  dateCreated: Date,
  items: [groceryItemSchema]
});

export default mongoose.model('GroceryList', groceryListSchema);
