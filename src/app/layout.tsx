import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { newsreader, plexMono, plexSans } from './fonts';
import '@/styles/globals.css';

const TITLE = 'Straiton | Pay suppliers in India from the UAE';
const DESCRIPTION =
  'UAE-to-India business payments, prepared before you fund: a transaction-specific quote, a document checklist and a dedicated India payments manager.';

/**
 * Absolute base for link-preview image URLs. On Vercel, prefer the
 * production domain: preview URLs sit behind Vercel's login by default,
 * which preview bots can't pass.
 */
function siteUrl(): URL {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
  return new URL(host ? `https://${host}` : 'http://localhost:3000');
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Straiton',
  // A design prototype with placeholder content: keep it out of search
  // results (see app/robots.ts for why crawling is still allowed).
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: 'Straiton',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_GB',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // sticky CTA uses safe-area insets
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Progressive enhancement flag: collapsible and animated content
            only hides itself when JS is running (DESIGN.md §12).
            The page is a journey that starts in the UAE, so a reload opens at
            the top instead of restoring the old scroll position. A shared
            deep link (/#faq) is still honoured. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{history.scrollRestoration='manual'}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
