const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    status: { type: String, default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);