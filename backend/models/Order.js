const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        id: { type: String }
    }],
    details: {
        name: String,
        phone1: String,
        phone2: String,
        address: String,
        location: String,
        paymentMethod: String,
    },
    totalPrice: { type: Number, required: true },
    confirmed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);