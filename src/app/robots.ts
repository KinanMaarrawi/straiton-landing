import type { MetadataRoute } from 'next';

/**
 * Crawling is allowed on purpose: link-preview bots (Slack, LinkedIn,
 * WhatsApp) obey robots.txt, so blocking them would break shared links.
 * Search engines are kept out by the noindex robots meta tag set in the
 * root layout instead. No sitemap: nothing here should be indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
  };
}
