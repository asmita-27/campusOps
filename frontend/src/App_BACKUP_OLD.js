// src/App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventReportGenerator from './components/EventReportGenerator';
import FeedbackAnalyzer from './components/FeedbackAnalyzer';
import ImageServices from './components/ImageServices';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <EventReportGenerator />
      <FeedbackAnalyzer />
      <ImageServices />
      <About />
      <Footer />
    </div>
  );
}

export default App;
