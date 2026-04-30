import { Helmet } from 'react-helmet-async';

/**
 * SEO Component - Dynamically sets page title, meta description, and Open Graph tags.
 * @param {string} title - Page title.
 * @param {string} description - Meta description.
 * @param {string} keywords - SEO keywords (comma separated).
 */
const SEO = ({
  title = 'Parishram',
  description = 'Parishram – An affordable EdTech platform for NEET/JEE aspirants with smart mock tests, video lectures, analytics, and doubt-solving support.',
  keywords = 'Parishram, JEE, NEET, UPSC, EdTech, online learning, mock tests, video lectures, study material',
}) => {
  const fullTitle = title === 'Parishram' ? title : `${title} | Parishram`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Parishram" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
