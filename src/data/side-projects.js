import { PROFILES } from '@/lib/site';

// Add future personal projects here. The homepage carousel reads this collection.
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

