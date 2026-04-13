/**
 * src/pages/HomePage.jsx
 *
 * Main market listing page.
 * Manages search state locally; passes coins + search down to CoinTable.
 */

import React, { useState } from 'react';
import CoinTable from '../components/CoinTable';
import Skeleton from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';
import { useCoins } from '../hooks/useCryptoData';
import '../styles/HomePage.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { coins, loading, error, refetch } = useCoins(100);

  return (
    <main className="home-page">
      <div className="container">

        {/* Hero header */}
        <header className="home-hero">
          <div className="home-hero__eyebrow">
            <span>⬡</span> Real-time market data
          </div>
          <h1 className="home-hero__title">
            Crypto <span>Markets</span>
          </h1>
          <p className="home-hero__sub">
            Live prices, market caps and 7-day performance for the top 100
            cryptocurrencies — updated every 60 seconds.
          </p>
        </header>

        {/* Refresh indicator */}
        {!loading && !error && (
          <div className="refresh-bar">
            <span>Auto-refreshes every 60s</span>
            <button
              className="refresh-bar__btn"
              onClick={refetch}
              aria-label="Manually refresh data"
            >
              ↻ Refresh
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && <Skeleton rows={12} />}

        {/* Error state */}
        {error && !loading && (
          <ErrorMessage
            message={error}
            onRetry={refetch}
          />
        )}

        {/* Data table */}
        {!loading && !error && coins.length > 0 && (
          <CoinTable
            coins={coins}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

      </div>
    </main>
  );
};

export default HomePage;
