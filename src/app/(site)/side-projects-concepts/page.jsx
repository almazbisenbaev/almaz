import Concepts from './concepts';

export const metadata = {
  title: 'Side projects — bento preview',
  description: 'Temporary bento preview for a growing collection of personal projects.',
  alternates: { canonical: '/side-projects-concepts' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function Page() { return <Concepts />; }
