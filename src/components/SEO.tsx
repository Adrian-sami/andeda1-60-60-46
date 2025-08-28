import { Helmet } from "react-helmet-async";
import { useMemo } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string; // website | article
  structuredData?: Record<string, any> | Record<string, any>[];
}

export const SEO = ({ title, description, image, type = "website", structuredData }: SEOProps) => {
  const { canonicalUrl, ogImage } = useMemo(() => {
    const href = (typeof window !== "undefined" ? window.location.href : "") || "";
    const url = (() => {
      try {
        const u = new URL(href);
        return u.toString();
      } catch {
        return href;
      }
    })();

    const defaultOg = image || 
      "https://lovable.dev/opengraph-image-p98pqg.png";

    return { canonicalUrl: url, ogImage: defaultOg };
  }, [image]);

  const jsonLd = Array.isArray(structuredData) ? structuredData : (structuredData ? [structuredData] : []);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd.map((data, idx) => (
        <script key={idx} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
