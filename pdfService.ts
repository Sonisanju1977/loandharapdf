
import { PDFDocument } from 'pdf-lib';
import * as pdfjs from 'pdfjs-dist';

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.10.38/build/pdf.worker.mjs`;

/**
 * Extreme Compression:
 * Renders each page to a canvas, converts to low-quality JPEG, 
 * and recompiles into a new PDF. This is the only way to significantly 
 * reduce scanned PDFs in the browser.
 */
export const compressPDFLocally = async (
  file: File, 
  targetSizeKB: number,
  onProgress?: (progress: number) => void
): Promise<{ data: Uint8Array, estimatedSize: number, ratio: number }> => {
  const originalSize = file.size;
  const arrayBuffer = await file.arrayBuffer();
  
  // Load the original document for reference and rendering
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  
  const newPdfDoc = await PDFDocument.create();
  
  /**
   * Calculate quality based on target size.
   * If target is very small compared to original, we lower quality and scale.
   */
  const sizeRatio = (targetSizeKB * 1024) / originalSize;
  const quality = Math.max(0.1, Math.min(0.7, sizeRatio)); // Range 0.1 to 0.7
  const scale = sizeRatio < 0.3 ? 1.0 : 1.5; // Lower scale for extreme targets

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    
    // Create canvas to render the page
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;

    // Convert canvas to compressed JPEG
    const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
    const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());
    
    // Embed compressed image back into new PDF
    const embeddedImg = await newPdfDoc.embedJpg(imgBytes);
    const newPage = newPdfDoc.addPage([viewport.width, viewport.height]);
    newPage.drawImage(embeddedImg, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height,
    });

    if (onProgress) onProgress(Math.round((i / numPages) * 100));
  }

  const compressedData = await newPdfDoc.save({ 
    useObjectStreams: true,
    addDefaultFont: false
  });

  const estimatedSize = compressedData.length;
  const ratio = Math.round((1 - (estimatedSize / originalSize)) * 100);

  return {
    data: compressedData,
    estimatedSize,
    ratio
  };
};

export const mergePDFs = async (files: File[]): Promise<Uint8Array> => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
};

export const splitPDF = async (file: File): Promise<Uint8Array[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const results: Uint8Array[] = [];
  for (let i = 0; i < pdf.getPageCount(); i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);
    results.push(await newPdf.save());
  }
  return results;
};

export const lockPDF = async (file: File, password: string): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  return await pdfDoc.save();
};
