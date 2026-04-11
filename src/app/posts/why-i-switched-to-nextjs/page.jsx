import Link from 'next/link';
import Image from 'next/image';
import BlogJsonLd from '@/components/seo/BlogJsonLd';
import { postsData } from '@/lib/data';

const post = postsData.find(p => p.link === '/posts/why-i-switched-to-nextjs');

export const metadata = {
  title: 'Why I switched to Next.js for my personal portfolio | Almaz Bissenbayev',
  description: 'A deep dive into why Next.js is the perfect choice for modern web developers in 2026.',
  alternates: {
    canonical: '/posts/why-i-switched-to-nextjs'
  }
}

export default function WhyISwitchedToNextjs() {
  return (
    <article className="min-h-screen py-24">
      <BlogJsonLd post={post} />
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/posts" className="inline-flex items-center text-neutral-400 hover:text-neutral-900 mb-12 transition-colors text-sm font-medium uppercase tracking-widest">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>

          <header className="mb-16">
            <div className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-4">
              {post.date} • 8 min read
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-8 tracking-tight leading-tight">
              Why I switched to Next.js for my personal portfolio
            </h1>
          </header>

          <div className="text-neutral-900">
            <p className="text-3xl md:text-4xl text-neutral-500 mb-20 leading-tight font-light tracking-tight">
              The web has evolved, and so has the way we build it. Next.js isn't just a framework; it's a complete paradigm shift in how we deliver performance and developer experience.
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter">The Performance Factor</h2>
            <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed mb-12">
              In 2026, performance is no longer a luxury—it's a fundamental requirement. Users expect instantaneous interactions and zero-latency page transitions. Next.js's App Router and Server Components have fundamentally changed how I think about data fetching and rendering.
            </p>
            
            <ul className="my-16 space-y-8">
              <li className="flex items-start">
                <span className="text-neutral-900 mr-5 mt-4 w-2 h-2 rounded-full bg-neutral-900 shrink-0" />
                <span className="text-2xl md:text-3xl text-neutral-600 leading-snug">Server-side rendering by default, reducing client-side JS.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-900 mr-5 mt-4 w-2 h-2 rounded-full bg-neutral-900 shrink-0" />
                <span className="text-2xl md:text-3xl text-neutral-600 leading-snug">Built-in image optimization that actually works.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-900 mr-5 mt-4 w-2 h-2 rounded-full bg-neutral-900 shrink-0" />
                <span className="text-2xl md:text-3xl text-neutral-600 leading-snug">Simplified routing that feels intuitive and scalable.</span>
              </li>
            </ul>

            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter mt-24">Developer Experience</h2>
            <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed mb-12">
              Beyond the performance metrics, the developer experience (DX) is where Next.js truly shines. The integration with Tailwind CSS and the powerful CLI tools make building complex interfaces a breeze.
            </p>

            <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed mb-12">
              I used to spend hours configuring Webpack and Babel. Now, I focus entirely on the logic and the UI. This productivity boost is why I've migrated all my personal and client projects to this ecosystem.
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter mt-24">Looking Ahead</h2>
            <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed mb-12">
              The future of the web is collaborative, fast, and edge-native. Next.js is positioning itself perfectly for this transition, and I'm excited to be part of this journey.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
