/**
 * src/components/GlobalStats.jsx
 *
 * Horizontal ticker bar showing global crypto market statistics:
 * total market cap, 24h volume, BTC dominance, active coins count.
 */

import React from 'react';
import { useGlobalStats } from '../hooks/useCryptoData';
import { formatLargeNumber, formatPercent, getPriceChangeClass } from '../utils/formatters';
import '../styles/GlobalStats.css';

const Divider = () => <div className="global-stats__divider" aria-hidden="true" />;

const StatItem = ({ label, value, valueClass }) => (
  <div className="global-stats__item">
    <span className="global-stats__label">{label}</span>
    <span className={`global-stats__value ${valueClass || ''}`}>{value}</span>
  </div>
);

const GlobalStats = () => {
  const { stats, loading } = useGlobalStats();

  if (loading || !stats) {
    return (
      <div className="global-stats global-stats--loading" aria-hidden="true">
        <div className="container">
          <span className="skeleton" style={{ width: '60%', height: '12px' }} />
        </div>
      </div>
    );
  }

  const mcapChange = stats.market_cap_change_percentage_24h_usd;

  return (
    <div className="global-stats" role="complementary" aria-label="Global market stats">
      <div className="container global-stats__inner">

        <StatItem
          label="Market Cap"
          value={formatLargeNumber(stats.total_market_cap?.usd)}
        />
        <Divider />

        <StatItem
          label="24h Vol"
          value={formatLargeNumber(stats.total_volume?.usd)}
        />
        <Divider />

        <StatItem
          label="24h Change"
          value={formatPercent(mcapChange)}
          valueClass={getPriceChangeClass(mcapChange)}
        />
        <Divider />

        <StatItem
          label="BTC Dominance"
          value={`${stats.market_cap_percentage?.btc?.toFixed(1)}%`}
        />
        <Divider />

        <StatItem
          label="ETH Dominance"
          value={`${stats.market_cap_percentage?.eth?.toFixed(1)}%`}
        />
        <Divider />

        <StatItem
          label="Active Coins"
          value={stats.active_cryptocurrencies?.toLocaleString()}
        />
        <Divider />

        <StatItem
          label="Markets"
          value={stats.markets?.toLocaleString()}
        />

      </div>
    </div>
  );
};

export default GlobalStats;
