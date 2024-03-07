// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const exceljs = require('exceljs');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/generateExcel', (req, res) => {
    const { name, age, level, gender } = req.body;

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('User Data');

    worksheet.addRow(['Name', 'Age', 'Level', 'Gender']);
    worksheet.addRow([name, age, level, gender.join(', ')]);

    const fileName = 'UserData.xlsx';
    workbook.xlsx.writeFile(fileName)
        .then(() => {
            console.log('Excel file generated successfully');
            res.sendFile(fileName, { root: __dirname });
        })
        .catch((error) => {
            console.error('Error generating Excel file:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
