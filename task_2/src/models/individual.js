// models/individual.js
const mongoose = require('mongoose');

const individualSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    position: { type: String, required: true },
});

module.exports = mongoose.model('Individual', individualSchema);
