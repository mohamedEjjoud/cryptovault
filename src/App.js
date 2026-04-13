/**
 * src/App.js
 *
 * Root application component.
 * Sets up React Router with layout (Navbar + Footer) wrapping all pages.
 * Uses React.lazy + Suspense for code-split page loading.
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import GlobalStats from './components/GlobalStats';
import Footer from './components/Footer';
import Skeleton from './components/Skeleton';

// Code-split pages — each page chunk is only loaded when navigated to
const HomePage       = lazy(() => import('./pages/HomePage'));
const CoinDetailPage = lazy(() => import('./pages/CoinDetailPage'));
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage'));

// Fallback shown during lazy-load / route transitions
const PageFallback = () => (
  <div style={{ padding: '2rem' }}>
    <div className="container">
      <Skeleton rows={8} />
    </div>
  </div>
);

const App = () => (
  <Router>
    {/* Sticky top navigation */}
    <Navbar />

    {/* Global market stats ticker */}
    <GlobalStats />

    {/* Page content with lazy-load fallback */}
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/coin/:coinId" element={<CoinDetailPage />} />
        <Route path="*"          element={<NotFoundPage />} />
      </Routes>
    </Suspense>

    {/* Footer */}
    <Footer />
  </Router>
);

export default App;
