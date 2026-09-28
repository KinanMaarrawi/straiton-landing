import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google';

/** Headlines only. Variable weight with the optical-size axis on. */
export const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
});

/** Everything readable: body, labels, buttons, nav, fields. */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
});

/** Money only: amount inputs, quote figures, route marker. */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});
