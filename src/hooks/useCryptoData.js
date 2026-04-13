/**
 * src/hooks/useCryptoData.js
 *
 * Custom React hooks that encapsulate data-fetching logic.
 * Components stay clean — they just call a hook and get { data, loading, error }.
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchCoins, fetchCoinDetail, fetchGlobalStats } from '../services/cryptoApi';

// ── useCoins ────────────────────────────────────────────────────────────────

/**
 * Fetches and auto-refreshes the top coins list.
 * @param {number} perPage
 */
export const useCoins = (perPage = 50) => {
  const [coins, setCoins]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCoins(perPage);
      setCoins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [perPage]);

  useEffect(() => {
    load();
    // Auto-refresh every 60 seconds
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, [load]);

  return { coins, loading, error, refetch: load };
};

// ── useCoinDetail ───────────────────────────────────────────────────────────

/**
 * Fetches detailed data for a single coin by ID.
 * @param {string} coinId
 */
export const useCoinDetail = (coinId) => {
  const [coin, setCoin]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = useCallback(async () => {
    if (!coinId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCoinDetail(coinId);
      setCoin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [coinId]);

  useEffect(() => {
    load();
  }, [load]);

  return { coin, loading, error, refetch: load };
};

// ── useGlobalStats ──────────────────────────────────────────────────────────

/**
 * Fetches global crypto market statistics.
 */
export const useGlobalStats = () => {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchGlobalStats();
        if (!cancelled) setStats(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading, error };
};
