import BlogThumbnail from '@/components/blog/BlogThumbnail';

export const metadata = {
  title: 'Blog | Almaz Bissenbayev',
  description: 'Thoughts on code, design, and productivity.',
  alternates: {
    canonical: '/posts'
  }
}

export default function Posts(){
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="mb-16">
                <h1 className="font-bold text-5xl mb-4 tracking-tight text-neutral-900">Blog</h1>
                <p className="text-lg text-neutral-500 max-w-xl">
                    Thoughts on code, design, and productivity.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <BlogThumbnail 
                  title="How to make your Elementor website win PageSpeed"
                  date="June 21, 2025"
                  link="https://www.threads.com/@almazbisenbaev/post/DLKwRKuRv0O"
                  isExternal={true}
                  thumbnail="/images/project-glowy.jpg"
                />
                <BlogThumbnail 
                  title="How to Write CSS in 2025 – Modern Features You Should Be Using"
                  date="June 5, 2025"
                  link="https://dev.to/almazbisenbaev/how-to-write-css-in-2025-modern-features-you-should-be-using-with-examples-3g47"
                  isExternal={true}
                  thumbnail="/images/project-glowy.jpg"
                />
                <BlogThumbnail 
                  title="Mastering Productivity as a Freelancer"
                  date="April 17, 2025"
                  link="https://webdevandstuff.hashnode.dev/mastering-productivity-1"
                  isExternal={true}
                  thumbnail="/images/project-glowy.jpg"
                />
                {/* <BlogThumbnail 
                  title="Why I switched to Next.js for my personal portfolio"
                  date="April 10, 2026"
                  link="/posts/why-i-switched-to-nextjs"
                  isExternal={false}
                  thumbnail="/images/project-glowy.jpg"
                />
                <BlogThumbnail 
                  title="The Future of Web Design: Minimalist & Fast"
                  date="April 11, 2026"
                  link="/posts/future-of-web-design"
                  isExternal={false}
                  thumbnail="/images/project-glowy.jpg"
                /> */}
            </div>
        </div>
    )
}
