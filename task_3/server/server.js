// Import necessary modules
const express = require('express');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Create an Express application
const app = express();

// Enable CORS
app.use(cors());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Check if 'pdfs' directory exists, if not, create it
const pdfDir = path.join(__dirname, 'pdfs');
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
}

// Define a POST endpoint for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Define the path for the new PDF
    const pdfPath = path.join(__dirname, 'pdfs', `${req.body.name}.pdf`);

    // Create a write stream for the new PDF
    const stream = fs.createWriteStream(pdfPath);

    // Pipe the PDF document to the write stream
    doc.pipe(stream);

    // Add the uploaded image to the PDF document
    doc.image(req.file.path, {
        fit: [500, 500], // Adjust as needed
        align: 'center',
        valign: 'center'
    });

    // Finalize the PDF document
    doc.end();

    // When the PDF has been written, respond with the URL of the new PDF
    stream.on('finish', () => {
        res.json({ url: `http://localhost:5000/pdfs/${req.body.name}.pdf` });
    });
});

// Serve static files from the 'pdfs' directory
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// Start the server
app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});
