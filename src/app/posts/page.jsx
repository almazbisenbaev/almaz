import BlogThumbnail from '@/components/blog-thumb/blog-thumb';

export const metadata = {
  title: 'Blog | Almaz Bissenbayev',
  description: 'Thoughts on code, design, and tech.',
  alternates: {
    canonical: '/posts'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://helloalmaz.com/posts',
    title: 'Blog | Almaz Bissenbayev',
    description: 'Thoughts on code, design, and tech.',
    siteName: 'Almaz Bisenbaev',
    images: [
      {
        url: '/preview-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Almaz Bisenbaev - Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Almaz Bissenbayev',
    description: 'Thoughts on code, design, and tech.',
    creator: '@almazbisenbaev',
    images: ['/preview-twitter.jpg'],
  },
}

export default function Posts(){
    return (
        <div className="container px-5 py-16">

            <div className="mb-16">
                <h1 className="font-bold text-5xl mb-4 tracking-tight text-neutral-900">Blog</h1>
                <p className="text-lg text-neutral-500 max-w-xl">
                    Thoughts on code, design, and tech.
                </p>
            </div>

            <div className="flex flex-col">
                <BlogThumbnail 
                  title="How AI Takeover Backfired on Greedy Companies"
                  date="August 30, 2026"
                  link="https://medium.com/@almazbisenbaev/how-ai-takeover-backfired-on-greedy-companies-4d569c940e05"
                  isExternal={true}
                  thumbnail="/blog/how-ai-takeover-back.webp"
                />
                <BlogThumbnail 
                  title="I created the same button component in 3 major versions of VueJS"
                  date="June 11, 2026"
                  link="/posts/vuejs-evolution"
                  isExternal={false}
                  thumbnail="/blog/article-vuejs-cover.jpg"
                />
                <BlogThumbnail 
                  title="How to make your Elementor website win PageSpeed"
                  date="June 21, 2025"
                  link="https://www.threads.com/@almazbisenbaev/post/DLKwRKuRv0O"
                  isExternal={true}
                  thumbnail="/images/pagespeed-100.jpg"
                />
                <BlogThumbnail 
                  title="How to Write CSS in 2025 – Modern Features You Should Be Using"
                  date="June 5, 2025"
                  link="https://dev.to/almazbisenbaev/how-to-write-css-in-2025-modern-features-you-should-be-using-with-examples-3g47"
                  isExternal={true}
                  thumbnail="/images/how-to-write-modern-css.jpg"
                />
                <BlogThumbnail 
                  title="Mastering Productivity as a Freelancer"
                  date="April 17, 2025"
                  link="https://webdevandstuff.hashnode.dev/mastering-productivity-1"
                  isExternal={true}
                  thumbnail="/images/posts/productivity-course.webp"
                />
            </div>

        </div>
    )
}
