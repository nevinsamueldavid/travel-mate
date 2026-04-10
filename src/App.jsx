import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Services from './pages/Services';
import Process from './pages/Process';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Book from './pages/Book';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <AuthProvider>
      <Router>
        <Header toggleTheme={toggleTheme} isLightMode={isLightMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          
          <Route path="/book" element={<Book />} />
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;