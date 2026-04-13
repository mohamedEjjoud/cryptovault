/**
 * src/utils/formatters.js
 *
 * Pure utility functions for formatting numbers, currencies, and dates.
 * Keeping these pure (no side effects) makes them trivial to unit-test.
 */

/**
 * Format a number as USD currency.
 * Handles ranges from micro-caps to trillion-dollar assets.
 */
export const formatCurrency = (value, decimals = 2) => {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format a large number with abbreviations (T, B, M, K).
 */
export const formatLargeNumber = (value) => {
  if (value === null || value === undefined) return '—';
  const abs = Math.abs(value);
  if (abs >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (abs >= 1e9)  return `$${(value / 1e9).toFixed(2)}B`;
  if (abs >= 1e6)  return `$${(value / 1e6).toFixed(2)}M`;
  if (abs >= 1e3)  return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
};

/**
 * Format a percentage change with a + sign for positives.
 */
export const formatPercent = (value) => {
  if (value === null || value === undefined) return '—';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

/**
 * Format a supply number (no dollar sign).
 */
export const formatSupply = (value) => {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
};

/**
 * Returns CSS class name based on positive/negative value.
 */
export const getPriceChangeClass = (value) => {
  if (value === null || value === undefined) return '';
  return value >= 0 ? 'positive' : 'negative';
};

/**
 * Truncate a string to maxLength characters.
 */
export const truncate = (str, maxLength = 120) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
};
