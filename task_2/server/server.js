// app.js or index.js
const express = require('express');
const mongoose = require('mongoose');
const individualsRouter = require('./routes/individuals');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/individuals', individualsRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
