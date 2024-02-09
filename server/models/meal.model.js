const mongoose = require('mongoose');
const MealSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'name is required'], 
    minlength: [3, 'name must be atleast 3 characters'], 
    maxlength: [20, 'name cannot exceed 50 characters']},
    minutes: { type: Number, required: [true, 'Minutes is required'], 
    minlength: [2, 'minutes must be atleast 3 characters'], 
    maxlength: [240, 'minutes cannot exceed 50 characters']},
    directions: { type: String, required: [true, 'Directions is required'], 
    minlength: [10, 'directions must be atleast 3 characters']},
    gredient1: { type: String},
    gredient2: { type: String},
    gredient3: { type: String},
}, { timestamps: true });
module.exports = mongoose.model('Meal', MealSchema);