import SideProjectsConcepts from './side-projects-concepts';

export const metadata = {
  title: 'Side projects concepts',
  description: 'Six motion studies for a growing collection of personal projects.',
  alternates: { canonical: '/side-projects-concepts' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function SideProjectsConceptsPage() {
  return <SideProjectsConcepts />;
}
