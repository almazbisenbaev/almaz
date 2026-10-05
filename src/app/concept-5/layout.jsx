import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import './play.css';
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--play-display', display: 'swap' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--play-sans', display: 'swap' });
export const metadata = { title: 'Almaz — Internet, with extra personality | Concept 05', description: 'Good ideas, joyful interactions, and a developer who cares about both.', robots: { index: false, follow: true } };
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#f7f0df' };
export default function PlayLayout({ children }) { return <html lang="en" className={`${display.variable} ${sans.variable}`}><body className="play-body">{children}</body></html>; }
