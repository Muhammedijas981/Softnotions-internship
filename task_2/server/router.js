// routes/individuals.js
const express = require('express');
const router = express.Router();
const Individual = require('../models/individual');
const mongoose = require('mongoose');

// GET individual by position
router.get('/:position', async (req, res) => {
    try {
        const position = req.params.position;
        const individual = await Individual.findOne({ position });
        res.json(individual);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
