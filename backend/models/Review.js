const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    itemId: { type: String, required: true }, // Links to MenuItem
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);