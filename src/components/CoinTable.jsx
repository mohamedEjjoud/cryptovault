/**
 * src/components/CoinTable.jsx
 *
 * The main table listing all cryptocurrencies.
 * Includes: rank, logo, name, price, market cap, volume,
 *           24h change, 7d sparkline.
 * Supports client-side search filtering passed in as a prop.
 */

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkline from './Sparkline';
import {
  formatCurrency,
  formatLargeNumber,
  formatPercent,
  formatSupply,
  getPriceChangeClass,
} from '../utils/formatters';
import '../styles/CoinTable.css';

// ── Sub-component: single table row ──────────────────────────────────────────

const CoinRow = React.memo(({ coin, index, onClick }) => {
  const change24h = coin.price_change_percentage_24h;
  const change7d  = coin.price_change_percentage_7d_in_currency;
  const isPositive24 = change24h >= 0;

  return (
    <tr
      onClick={() => onClick(coin.id)}
      style={{ animationDelay: `${index * 0.03}s` }}
      role="button"
      tabIndex={0}
      aria-label={`View ${coin.name} details`}
      onKeyDown={(e) => e.key === 'Enter' && onClick(coin.id)}
    >
      {/* Rank */}
      <td className="td-rank">{coin.market_cap_rank}</td>

      {/* Coin identity */}
      <td className="td-coin">
        <div className="coin-identity">
          <img
            className="coin-identity__img"
            src={coin.image}
            alt={coin.name}
            loading="lazy"
            width={36}
            height={36}
          />
          <div>
            <div className="coin-identity__name">{coin.name}</div>
            <div className="coin-identity__symbol">{coin.symbol}</div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="td-price">{formatCurrency(coin.current_price)}</td>

      {/* 24h Change */}
      <td className="td-change">
        <span className={`change-badge ${getPriceChangeClass(change24h)}`}>
          {isPositive24 ? '▲' : '▼'} {formatPercent(change24h)}
        </span>
      </td>

      {/* 7d Change */}
      <td className="td-change hide-md">
        <span className={`change-badge ${getPriceChangeClass(change7d)}`}>
          {change7d >= 0 ? '▲' : '▼'} {formatPercent(change7d)}
        </span>
      </td>

      {/* Market Cap */}
      <td className="td-mcap hide-sm">{formatLargeNumber(coin.market_cap)}</td>

      {/* Volume */}
      <td className="td-vol hide-md">{formatLargeNumber(coin.total_volume)}</td>

      {/* Circulating Supply */}
      <td className="td-supply hide-lg">
        {formatSupply(coin.circulating_supply)}{' '}
        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
          {coin.symbol?.toUpperCase()}
        </span>
      </td>

      {/* 7-day Sparkline */}
      <td className="td-sparkline hide-sm">
        <Sparkline
          data={coin.sparkline_in_7d?.price}
          isPositive={change7d >= 0}
          width={90}
          height={36}
        />
      </td>
    </tr>
  );
});

// ── Main CoinTable Component ──────────────────────────────────────────────────

const CoinTable = ({ coins, searchQuery, onSearchChange }) => {
  const navigate = useNavigate();

  // Navigate to detail page on row click
  const handleRowClick = useCallback(
    (coinId) => navigate(`/coin/${coinId}`),
    [navigate]
  );

  // Apply client-side search filter
  const filtered = coins.filter((coin) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      coin.name.toLowerCase().includes(q) ||
      coin.symbol.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Search & count bar */}
      <div className="controls">
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Search coins by name or symbol…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search cryptocurrencies"
          />
          <span className="search-wrapper__icon" aria-hidden="true">⌕</span>
        </div>

        <span className="controls__count">
          {filtered.length} / {coins.length} coins
        </span>
      </div>

      {/* Table */}
      <div className="coin-table-wrapper">
        <table className="coin-table" role="table" aria-label="Cryptocurrency market data">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Coin</th>
              <th scope="col">Price</th>
              <th scope="col">24h %</th>
              <th scope="col" className="hide-md">7d %</th>
              <th scope="col" className="hide-sm">Market Cap</th>
              <th scope="col" className="hide-md">Volume 24h</th>
              <th scope="col" className="hide-lg">Supply</th>
              <th scope="col" className="hide-sm">7d Chart</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((coin, i) => (
                <CoinRow
                  key={coin.id}
                  coin={coin}
                  index={i}
                  onClick={handleRowClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan="9">
                  <div className="coin-table-empty">
                    No coins match "<strong>{searchQuery}</strong>"
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CoinTable;
