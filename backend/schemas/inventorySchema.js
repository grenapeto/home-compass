import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  expirationDate: {
    type: Date,
    required: true,
  },
  amount: Number,
  unit: String,
});

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [itemSchema],
  category: {
    type: String,
    required: true,
  },
  barcode: String, // Add the barcode field
});

export default mongoose.model('Inventory', inventorySchema);
