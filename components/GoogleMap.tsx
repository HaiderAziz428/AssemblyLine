import React from "react";

const GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13613.96489375406!2d71.478893!3d30.157447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b3500731bacab%3A0x22f56a195b297de7!2sAssembly%20line%205%20marla%20scheme%20MPS%20road%2C%20Multan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s";

export default function GoogleMap() {
  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border border-gold-500 shadow-lg mb-8">
      <iframe
        src={GOOGLE_MAP_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Assembly Line Workshop Location"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
