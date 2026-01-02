
import React from 'react';
import { Tool } from './types';

export const TOOLS: Tool[] = [
  { id: 'compress', name: 'Compress PDF', description: 'Reduce PDF file size while keeping quality.', path: '/compress-pdf', icon: '📉', category: 'pdf' },
  { id: 'merge', name: 'Merge PDF', description: 'Combine multiple PDF files into one.', path: '/merge-pdf', icon: '🔗', category: 'pdf' },
  { id: 'split', name: 'Split PDF', description: 'Extract pages from your PDF or save each page as a separate PDF.', path: '/split-pdf', icon: '✂️', category: 'pdf' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages into JPG images.', path: '/pdf-to-jpg', icon: '🖼️', category: 'convert' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert multiple JPG images to a professional PDF document.', path: '/jpg-to-pdf', icon: '📄', category: 'convert' },
  { id: 'merge-image', name: 'Merge Image', description: 'Combine multiple JPEG/PNG images into one single image.', path: '/merge-image', icon: '🖼️🔗', category: 'image' },
  { id: 'image-compress', name: 'Image Compressor', description: 'Compress JPG, PNG, and SVG files.', path: '/image-compressor', icon: '🖼️', category: 'image' },
  { id: 'image-resize', name: 'Image Resizer', description: 'Resize images by pixels or percentage.', path: '/image-resizer', icon: '📏', category: 'image' },
  { id: 'lock-pdf', name: 'Lock PDF', description: 'Password protect your PDF files.', path: '/lock-pdf', icon: '🔒', category: 'pdf' },
  { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password from protected PDFs.', path: '/unlock-pdf', icon: '🔓', category: 'pdf' },
];

export const CATEGORIES = [
  { id: 'pdf', name: 'PDF Tools' },
  { id: 'image', name: 'Image Tools' },
  { id: 'convert', name: 'Convert' },
];
