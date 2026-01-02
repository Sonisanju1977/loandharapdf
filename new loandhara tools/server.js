
/**
 * CLOUDPDF BACKEND SERVICE (Production Grade)
 * This script is designed to run on a Linux VPS (Ubuntu/Debian).
 * Requires: Node.js, Express, Multer, Ghostscript
 * 
 * SETUP INSTRUCTIONS:
 * 1. sudo apt install ghostscript
 * 2. npm install express multer
 * 3. node server.js
 */

const express = require('express');
const multer = require('multer');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

/**
 * Perform Target-Based Compression using Multi-Pass Ghostscript logic
 */
const compressGhostscript = (inputPath, outputPath, qualityLevel) => {
    // Quality settings: screen (72dpi), ebook (150dpi), printer (300dpi), prepress (300dpi color preserve)
    const settings = {
        aggressive: '/screen',
        balanced: '/ebook',
        high: '/printer'
    };
    
    const preset = settings[qualityLevel] || '/ebook';
    
    // Core Ghostscript command for PDF optimization
    const gsCmd = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=${preset} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;
    
    try {
        execSync(gsCmd);
        return true;
    } catch (e) {
        console.error("GS Error:", e.message);
        return false;
    }
};

app.post('/api/compress-pdf', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const targetSizeKB = parseInt(req.body.targetSizeKB) || 100;
    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `compressed_${req.file.filename}.pdf`);

    // Multi-pass Logic Simulation
    // Pass 1: Try Ebook quality
    let success = compressGhostscript(inputPath, outputPath, 'balanced');
    let stats = fs.statSync(outputPath);
    
    // Pass 2: If still too large, go for Aggressive (Screen) quality
    if (stats.size / 1024 > targetSizeKB) {
        compressGhostscript(inputPath, outputPath, 'aggressive');
        stats = fs.statSync(outputPath);
    }

    // Response Headers
    res.setHeader('Original-Size', req.file.size);
    res.setHeader('Compressed-Size', stats.size);
    res.setHeader('Content-Type', 'application/pdf');
    
    const stream = fs.createReadStream(outputPath);
    stream.pipe(res);

    // Cleanup files after stream ends
    stream.on('end', () => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`CloudPDF Backend running on port ${PORT}`);
    console.log(`Ghostscript check: ${execSync('gs --version').toString().trim()}`);
});
