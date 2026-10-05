import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './elsewhere.css';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--elsewhere-display', display: 'swap' });
const sans = DM_Sans({ subsets: ['latin'], variable: '--elsewhere-sans', display: 'swap' });

export const metadata = { title: 'Elsewhere — A different kind of digital | Almaz, Concept 07', description: 'Thoughtful websites. Unexpected details. A place worth spending time.', robots: { index: false, follow: true } };
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#372b29' };

export default function ElsewhereLayout({ children }) {
  return <html lang="en" className={`${display.variable} ${sans.variable}`}><body className="elsewhere-body">{children}</body></html>;
}
