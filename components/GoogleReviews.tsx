"use client";
import { useEffect, useState } from "react";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
};

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

      const res = await fetch(`/api/google-reviews?placeId=${placeId}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  return (
    <section className="my-8 px-4">
      <h2 className="text-2xl font-bold text-gold-500 mb-4 text-center">
        What Our Customers Say
      </h2>
      {loading ? (
        <div className="text-center text-zinc-400">Loading reviews...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-navy-900 rounded-lg p-6 shadow-lg flex flex-col h-full"
            >
              <div className="flex items-center mb-2">
                {review.profile_photo_url && (
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <div>
                  <div className="font-semibold text-white">
                    {review.author_name}
                  </div>
                  <div className="text-gold-400">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-zinc-300 flex-1 mb-2">"{review.text}"</p>
              <div className="text-xs text-zinc-500">
                {review.relative_time_description}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
