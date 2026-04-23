"use client";

import Script from "next/script";

export default function GoogleReviews() {
  return (
    <div className="w-full">
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div
        className="elfsight-app-1fcf05d8-a517-4340-95e3-ce4143b7af62"
        data-elfsight-app-lazy
      />
    </div>
  );
}
