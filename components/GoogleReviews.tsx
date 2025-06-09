'use client';

import { useState } from 'react';

const GoogleReviews = () => {
  const [loaded, setLoaded] = useState(false);

  const loadWidget = () => {
    if (!document.getElementById('elfsight-script')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.id = 'elfsight-script';
      document.body.appendChild(script);
    }
    setLoaded(true);
  };

  return (
    <div className="my-6">
      {!loaded && (
        <button
          onClick={loadWidget}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Show Reviews
        </button>
      )}
      {loaded && (
        <div
          className="elfsight-app-1fcf05d8-a517-4340-95e3-ce4143b7af62"
          data-elfsight-app-lazy
        ></div>
      )}
    </div>
  );
};

export default GoogleReviews;
