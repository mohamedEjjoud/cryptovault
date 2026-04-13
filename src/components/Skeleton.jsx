/**
 * src/components/Skeleton.jsx
 *
 * Animated skeleton loading rows — shown while coin data is fetching.
 * Mimics the coin table layout so the UI doesn't shift on load.
 */

import React from 'react';
import '../styles/Skeleton.css';

// A single placeholder row
const SkeletonRow = () => (
  <div className="skeleton-row" aria-hidden="true">
    <span className="skeleton" style={{ width: '1.5rem', height: '1rem' }} />
    <span className="skeleton" style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} />
    <span className="skeleton" style={{ width: '70%', height: '1rem' }} />
    <span className="skeleton" style={{ width: '80%', height: '1rem' }} />
    <span className="skeleton" style={{ width: '60%', height: '1rem' }} />
    <span className="skeleton" style={{ width: '55%', height: '1rem' }} />
    <span className="skeleton" style={{ width: '65%', height: '1rem' }} />
    <span className="skeleton" style={{ width: '100%', height: '2rem' }} />
  </div>
);

const Skeleton = ({ rows = 10 }) => (
  <div role="status" aria-label="Loading cryptocurrency data">
    {Array.from({ length: rows }, (_, i) => (
      <SkeletonRow key={i} />
    ))}
  </div>
);

export default Skeleton;
