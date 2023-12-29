import Ingredient from '../schemas/ingredientSchema.js'; // Ensure the correct path to your model

const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json(ingredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createIngredient = async (req, res) => {
    const ingredient = new Ingredient({
        name: req.body.name,
        category: req.body.category,
        // Include other fields as needed
    });

    try {
        const newIngredient = await ingredient.save();
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateIngredient = async (req, res) => {
    try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json(updatedIngredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json({ message: 'Ingredient deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAllIngredients,
    getIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient
};
