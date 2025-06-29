import Head from "next/head";
import { usePathname } from "next/navigation";

const siteName = "Assembly Line Auto Repair";
const siteUrl = "https://www.assemblylineworkshop.com"; // Change to your real domain
const description =
  "Assembly Line Auto Repair offers expert mechanical, electrical, AC, and oil change services in Multan. Book your car service online with certified technicians and state-of-the-art diagnostics.";
const keywords = [
  "auto repair",
  "car service",

  "car maintenance",
  "car workshop",

  "auto repair",
  "workshop",
  "workshop in Multan",
  "mechanic",
  "Multan",
  "vehicle maintenance",
  "oil change",
  "AC service",
  "electrical repair",
  "mechanical repair",
  "Assembly Line",
  "car workshop",
  "brake service",
  "suspension",
  "diagnostics",
  "auto workshop",
  "car booking",
  "certified technicians",
  "automotive",
  "car repair",
  "car maintenance",
  "auto diagnostics",
  "warranty service",
  "genuine parts",
  "customer reviews",
  "booking form",
  "professional service",
  "affordable auto repair",
  "best auto repair Multan",
  "state-of-the-art equipment",
  "auto repair Pakistan",
].join(", ");
const ogImage = "/AssemblyLine.jpg";
const socialLinks = {
  facebook: "https://www.facebook.com/assemblylineworkshop/",
  instagram: "https://www.instagram.com/assemblyline.workshop/",
  tiktok: "https://www.tiktok.com/@assemblyline_",
  // Add more as needed
};

export default function SEO({
  title = siteName,
  desc = description,
  ogImg = ogImage,
  noIndex = false,
}: {
  title?: string;
  desc?: string;
  ogImg?: string;
  noIndex?: boolean;
}) {
  const pathname = usePathname();
  const canonicalUrl = `${siteUrl}${pathname}`;
  const absoluteOgImg = ogImg.startsWith("http") ? ogImg : `${siteUrl}${ogImg}`;

  // Structured data for LocalBusiness
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: siteName,
    url: siteUrl,
    image: absoluteOgImg,
    description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Assembly line 5 marla scheme MPS road",
      addressLocality: "Multan",
      addressCountry: "PK",
    },
    telephone: "+92 3224188020",
    sameAs: Object.values(socialLinks),
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Assembly Line Auto Repair" />
      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
      />
      <link rel="canonical" href={canonicalUrl} />
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={absoluteOgImg} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      {/* Social Links as meta tags */}
      <meta property="og:see_also" content={socialLinks.facebook} />
      <meta property="og:see_also" content={socialLinks.instagram} />
      <meta property="og:see_also" content={socialLinks.tiktok} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={absoluteOgImg} />
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
    </Head>
  );
}
