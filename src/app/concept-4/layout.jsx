import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './signal.css';
const display = Syne({ subsets: ['latin'], variable: '--signal-display', display: 'swap' });
const sans = DM_Sans({ subsets: ['latin'], variable: '--signal-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--signal-mono', display: 'swap' });
export const metadata = { title: 'Almaz — A different frequency | Concept 04', description: 'Digital experiences with atmosphere, movement, and a point of view.', robots: { index: false, follow: true } };
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#080b14' };
export default function SignalLayout({ children }) { return <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}><body className="signal-body">{children}</body></html>; }
