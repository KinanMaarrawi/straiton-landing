import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { newsreader, plexMono, plexSans } from './fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Straiton — Pay suppliers in India from the UAE',
  description:
    'UAE-to-India business payments, prepared before you fund: a transaction-specific quote, a document checklist and a dedicated India payments manager.',
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
            The page is a journey that starts in Dubai, so a reload opens at
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
