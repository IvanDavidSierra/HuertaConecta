import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import HowItWorks from '../pages/HowItWorks';
import Contact from '../pages/Contact';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard';

const animationPresets = {
  zoom: {
    variants: {
      initial: { scale: 0.95, opacity: 0 },
      in: { scale: 1, opacity: 1 },
      out: { scale: 0.95, opacity: 0 },
    },
    transition: { duration: 0.32, ease: 'easeInOut' },
  },
};

const AnimatedContent = ({ children }) => {
  const { variants, transition } = animationPresets.zoom;
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      style={{ minHeight: '80vh' }}
    >
      {children}
    </motion.div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<AnimatedContent><Home /></AnimatedContent>} />
          <Route path="/nosotros" element={<AnimatedContent><About /></AnimatedContent>} />
          <Route path="/servicios" element={<AnimatedContent><Services /></AnimatedContent>} />
          <Route path="/como-funciona" element={<AnimatedContent><HowItWorks /></AnimatedContent>} />
          <Route path="/contacto" element={<AnimatedContent><Contact /></AnimatedContent>} />
          <Route path="/auth" element={<AnimatedContent><Auth /></AnimatedContent>} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes; 