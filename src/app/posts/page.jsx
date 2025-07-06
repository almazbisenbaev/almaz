// import Link from 'next/link'

export default function Posts(){

    return (
        <div className="container mx-auto px-6">

            <div className="page-header">
                <h1 className="font-semibold text-2xl mb-8 py-4 tracking-tighter">My publications</h1>
            </div>

            <div className="posts">

                <div>
                    <a
                        className="flex flex-col space-y-1 mb-4"
                        href="https://www.threads.com/@almazbisenbaev/post/DLKwRKuRv0O"
                        target='_blank'
                    >
                        <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                            <div className="text-neutral-600 w-[110px] tabular-nums">June 21, 2025</div>
                            <div className="text-neutral-900 tracking-tight">How to make your Elementor website win PageSpeed</div>
                        </div>
                    </a>
                </div>

                <div>
                    <a
                        className="flex flex-col space-y-1 mb-4"
                        href="https://dev.to/almazbisenbaev/how-to-write-css-in-2025-modern-features-you-should-be-using-with-examples-3g47"
                        target='_blank'
                    >
                        <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                            <div className="text-neutral-600 w-[110px] tabular-nums">June 5, 2025</div>
                            <div className="text-neutral-900 tracking-tight">How to Write CSS in 2025 – Modern Features You Should Be Using (with examples)</div>
                        </div>
                    </a>
                </div>

                <div>
                    <a
                        className="flex flex-col space-y-1 mb-4"
                        href="https://webdevandstuff.hashnode.dev/mastering-productivity-1"
                        target='_blank'
                    >
                        <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                            <div className="text-neutral-600 w-[110px] tabular-nums">April 17, 2025</div>
                            <div className="text-neutral-900 tracking-tight">Mastering Productivity as a Freelancer</div>
                        </div>
                    </a>
                </div>

            </div>

        </div>
    )

}