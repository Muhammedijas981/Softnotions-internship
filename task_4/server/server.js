// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const exceljs = require('exceljs');

// Initialize express app
const app = express();
const port = 3001;

// Use cors and bodyParser middleware
app.use(cors());
app.use(bodyParser.json());

// Route to generate Excel file
app.post('/generateExcel', (req, res) => {
    // Destructure data from request body
    const { name, age, level, gender } = req.body;

    // Create a new workbook and worksheet
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('User Data');

    // Add rows to the worksheet
    worksheet.addRow(['Name', 'Age', 'Level', 'Gender']);
    worksheet.addRow([name, age, level, gender.join(', ')]);

    // Define the filename
    const fileName = 'UserData.xlsx';

    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    // Expose the Content-Disposition header
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    // Write the workbook to the response
    workbook.xlsx.write(res)
        .then(() => {
            console.log('Excel file generated successfully');
        })
        .catch((error) => {
            console.error('Error generating Excel file:', error);
            res.status(500).send('Internal Server Error');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
