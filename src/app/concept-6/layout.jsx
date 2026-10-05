import { Barlow_Condensed, Manrope } from 'next/font/google';
import './spatial.css';
const display = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--spatial-display', display: 'swap' });
const sans = Manrope({ subsets: ['latin'], variable: '--spatial-sans', display: 'swap' });
export const metadata = { title: 'Almaz — Another dimension | Concept 06', description: 'An interactive spatial portfolio. Design and development from a different angle.', robots: { index: false, follow: true } };
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#2346ed' };
export default function Layout({ children }) { return <html lang="en" className={`${display.variable} ${sans.variable}`}><body className="spatial-body">{children}</body></html>; }
