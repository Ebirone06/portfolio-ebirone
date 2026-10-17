import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/NotFound';
import './styles.css';

function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);
  return null;
}

function App() {
  return <BrowserRouter><RouteEffects /><Navigation /><Routes><Route path="/" element={<Home />} /><Route path="/projects/:slug" element={<ProjectDetail />} /><Route path="*" element={<NotFound />} /></Routes></BrowserRouter>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
