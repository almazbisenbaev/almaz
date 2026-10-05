import { Space_Grotesk, IBM_Plex_Mono, Instrument_Serif } from 'next/font/google';
import './concept.css';

const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--c2-sans', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--c2-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--c2-serif', display: 'swap' });

export const metadata = {
  title: 'Almaz — A little out of the ordinary. | Concept 02',
  description: 'Independent development with a creative pulse. A new portfolio direction by Almaz Bisenbaev.',
  robots: { index: false, follow: true },
};

export const viewport = { themeColor: '#eeeee7', width: 'device-width', initialScale: 1 };

// Deliberately a separate root: no shared site UI, global CSS, or scroll engine.
export default function ConceptLayout({ children }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable} ${serif.variable}`}>
      <body className="c2-body">{children}</body>
    </html>
  );
}
