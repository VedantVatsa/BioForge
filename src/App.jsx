import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransitionProvider } from "./context/TransitionContext";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import BioGenerator from "./components/BioGenerator";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import TemplatesPage from "./components/TemplatesPage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <TransitionProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generator" element={<BioGenerator />} />
              <Route path="/templates" element={<TemplatesPage />} />
            </Routes>
          </div>
        </Router>
      </TransitionProvider>
    </ThemeProvider>
  );
}
