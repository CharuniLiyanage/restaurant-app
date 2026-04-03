const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL or Base64
    category: { 
        type: String, 
        required: true, 
        enum: ["Rice & Main Dishes", "Kottu & Noodles", "Western Foods", "Beverages", "Desserts", "Other"] 
    },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);