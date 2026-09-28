import type { Metadata } from 'next';
import { ComponentSheet } from './ComponentSheet';

export const metadata: Metadata = {
  title: 'Straiton — Component sheet',
  robots: { index: false, follow: false },
};

/** Living component sheet: the Component Sheet frame rebuilt with the real components. */
export default function ComponentsPage() {
  return <ComponentSheet />;
}
