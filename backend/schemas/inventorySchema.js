import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  expirationDate: {
    type: Date,
    required: true  // Set to true if every item must have an expiry date
  },
  unit: String  // Optional, if you want to track different units per item
});

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [itemSchema],
  category: {
    type: String,
    required: true
  }
});

export default mongoose.model('Inventory', inventorySchema);
