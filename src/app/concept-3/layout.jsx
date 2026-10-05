import { Geist } from 'next/font/google';
import './quiet.css';
const geist = Geist({ subsets: ['latin'], variable: '--quiet-font', display: 'swap' });
export const metadata = { title: 'Almaz — Quiet by design | Concept 03', description: 'A small independent practice for thoughtful digital things.', robots: { index: false, follow: true } };
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };
export default function QuietLayout({ children }) {
  return <html lang="en" className={geist.variable}><body className="quiet-body">{children}</body></html>;
}
