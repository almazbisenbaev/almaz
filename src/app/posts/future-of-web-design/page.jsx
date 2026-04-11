import Link from 'next/link';
import Image from 'next/image';
import BlogJsonLd from '@/components/seo/BlogJsonLd';
import { postsData } from '@/lib/data';

const post = postsData.find(p => p.link === '/posts/future-of-web-design');

export const metadata = {
  title: 'The Future of Web Design: Minimalist & Fast | Almaz Bissenbayev',
  description: 'Exploring the trends that are shaping the next decade of digital experiences.',
  alternates: {
    canonical: '/posts/future-of-web-design'
  }
}

export default function FutureOfWebDesign() {
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
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-neutral-400 text-sm font-medium uppercase tracking-widest">{post.date}</span>
              <span className="text-neutral-200">•</span>
              <span className="text-neutral-400 text-sm font-medium uppercase tracking-widest">Design</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-8 tracking-tight leading-tight">
              The Future of Web Design: Minimalist & Fast
            </h1>
          </header>

          <div className="text-neutral-900">
            <p className="text-3xl md:text-4xl text-neutral-500 mb-20 leading-tight italic font-light tracking-tight">
              In a world of constant noise, simplicity is the ultimate sophistication. We're moving towards an era of functional minimalism and hyper-performance.
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter">Functional Minimalism</h2>
            <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed mb-12">
              Minimalism isn't just about removing elements; it's about making every element work twice as hard. In 2026, we're seeing a shift from decoration to information-first design.
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter mt-24">Hyper-Performance</h2>
            <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed mb-12">
              Wait times are the death of conversions. The future is about instant gratification through server-side optimizations and edge delivery networks.
            </p>

            <blockquote className="my-20 border-l-4 border-neutral-900 pl-10 py-4 italic text-3xl md:text-4xl font-light text-neutral-800 leading-tight">
              "Good design is as little design as possible." — Dieter Rams
            </blockquote>

            <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed mb-12">
              The digital landscape is becoming increasingly saturated. To stand out, brands are moving away from complex animations and heavy assets in favor of clean typography, ample whitespace, and blazing fast load times.
            </p>

            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-24 mb-12 tracking-tight">What's Next?</h3>
            <div className="space-y-16 mt-12">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Adaptive UI</h4>
                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed">Interfaces that change based on user context, device, and even emotional state.</p>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Micro-Interactions</h4>
                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed">Small, subtle animations that provide feedback and delight without being distracting.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
