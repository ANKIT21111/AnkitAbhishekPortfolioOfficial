import React from 'react';

/**
 * SkipLink component – allows keyboard‑only users to jump straight to the main content.
 * Added `sr-only` class to hide visually, but become visible when focused.
 */
const SkipLink: React.FC = () => (
    <a href="#main" className="sr-only focus:visible focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Skip to main content
    </a>
);

export default SkipLink;
