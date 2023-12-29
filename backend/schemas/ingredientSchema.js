import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: false
    },
    // You can add other fields as needed
});

export default model('Ingredient', ingredientSchema);
