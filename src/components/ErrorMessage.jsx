/**
 * src/components/ErrorMessage.jsx
 *
 * Reusable error display with optional retry callback.
 */

import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="error-message" role="alert">
    <div className="error-message__icon" aria-hidden="true">⚠</div>
    <p className="error-message__title">Something went wrong</p>
    {message && <code className="error-message__body">{message}</code>}
    {onRetry && (
      <button className="error-message__retry" onClick={onRetry}>
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;
