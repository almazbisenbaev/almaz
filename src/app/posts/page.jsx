import BlogThumbnail from '@/components/blog/BlogThumbnail';
import { postsData } from '@/lib/data';

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
                {postsData.map((post) => (
                    <BlogThumbnail key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
