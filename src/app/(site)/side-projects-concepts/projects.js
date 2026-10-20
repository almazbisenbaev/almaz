import { PROFILES } from '@/lib/site';

// The current homepage projects. Every concept reads the same collection.
export const projects = [
  {
    id: 'glowy',
    title: 'Glowy Icons',
    shortTitle: 'Glowy',
    category: 'Design resource',
    description: 'A little color goes a long way. Bright vector icons with soft shadows and a playful side.',
    image: '/images/project-glowy.jpg',
    alt: 'Colorful Glowy vector icons, including a heart, star, and chat bubble',
    color: '#fff0e8',
    accent: '#ec674b',
    link: 'https://www.figma.com/community/file/1452663046127877131/glowy-icons-v1-0',
    cta: 'Explore the icons',
  },
  {
    id: 'polyglossa',
    title: 'Polyglossa',
    shortTitle: 'Polyglossa',
    category: 'Language learning · Beta',
    description: 'New friends. New words. A messaging app to practice a language through conversations with AI friends.',
    image: '/images/project-polyglossa.jpg',
    alt: 'Polyglossa app showing a list of AI friends and a language practice conversation',
    color: '#eceaff',
    accent: '#6d5bf0',
    link: 'https://polyglossa-beta.vercel.app',
    cta: 'Meet Polyglossa',
  },
  {
    id: 'youtube',
    title: 'Webdev & stuff',
    shortTitle: 'YouTube',
    category: 'YouTube channel',
    description: 'The things I learn, build, and figure out along the way. Talking about web development and everything around it.',
    color: '#f8e5eb',
    accent: '#d9456a',
    link: PROFILES.youtube,
    cta: 'Watch on YouTube',
  },
];

// Deliberately fictional slots to preview a larger collection, not real projects.
export const sampleProjects = [
  { id: 'next-04', title: 'The next idea', shortTitle: 'Next idea', category: 'Sample project · 04', description: 'A little room for whatever comes next. This is a placeholder to try a larger collection.', color: '#e8eee3', accent: '#56754b', sample: true, shape: 'flower' },
  { id: 'next-05', title: 'A small experiment', shortTitle: 'Experiment', category: 'Sample project · 05', description: 'Something made out of curiosity. This is a placeholder to try a larger collection.', color: '#e9edf8', accent: '#5574bf', sample: true, shape: 'steps' },
  { id: 'next-06', title: 'Just for the fun of it', shortTitle: 'Just for fun', category: 'Sample project · 06', description: 'An open space for a future project. This is a placeholder to try a larger collection.', color: '#f8edce', accent: '#a47b2a', sample: true, shape: 'rings' },
];
