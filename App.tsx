
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CompressPDF from './pages/CompressPDF';
import MergePDF from './pages/MergePDF';
import SplitPDF from './pages/SplitPDF';
import ImageTools from './pages/ImageTools';
import PDFToImage from './pages/PDFToImage';
import LockPDF from './pages/LockPDF';
import GenericToolPlaceholder from './pages/GenericToolPlaceholder';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import Contact from './pages/Contact';
import JPGToPDF from './pages/JPGToPDF';
import MergeImage from './pages/MergeImage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compress-pdf" element={<CompressPDF />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/split-pdf" element={<SplitPDF />} />
          <Route path="/image-compressor" element={<ImageTools tool="compress" />} />
          <Route path="/image-resizer" element={<ImageTools tool="resize" />} />
          <Route path="/jpg-to-pdf" element={<JPGToPDF />} />
          <Route path="/pdf-to-jpg" element={<PDFToImage />} />
          <Route path="/merge-image" element={<MergeImage />} />
          <Route path="/lock-pdf" element={<LockPDF />} />
          <Route path="/unlock-pdf" element={<GenericToolPlaceholder name="Unlock PDF" />} />
          
          {/* Compliance & Info Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
