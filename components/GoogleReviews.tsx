"use client";
import Script from "next/script";

export default function GoogleReviews() {
  return (
    <section className="my-8 px-4">
      <h2 className="text-2xl font-bold text-gold-500 mb-4 text-center">
        What Our Customers Say
      </h2>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div className="elfsight-app-1fcf05d8-a517-4340-95e3-ce4143b7af62" data-elfsight-app-lazy></div>
    </section>
  );
}
