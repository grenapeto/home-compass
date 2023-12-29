import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  unit: String,
  expirationDate: Date, // Optional
  category: String // Like 'Dairy', 'Vegetables', etc.
});

export default mongoose.model('Inventory', inventorySchema);
