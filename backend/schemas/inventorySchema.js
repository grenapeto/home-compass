import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  expirationDate: {
    type: Date,
    required: true  // Set to true if every item must have an expiry date
  },
  amount: {
    Number,
    required: true
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
