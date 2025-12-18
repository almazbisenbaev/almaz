// import Link from 'next/link'

export default function Posts(){

    return (
        <div className="container mx-auto px-6">

            <div className="page-header">
                <h1 className="font-semibold text-4xl mb-8 py-6 tracking-tighter">My publications</h1>
            </div>

            <div className="posts text-lg">

                <div>
                    <a
                        className="font-medium flex flex-col sm:flex-row gap-1 sm:gap-3 mb-4"
                        href="https://www.threads.com/@almazbisenbaev/post/DLKwRKuRv0O"
                        target='_blank'
                    >
                        <div className="text-neutral-500 w-[140px]">June 21, 2025</div>
                        <div className="text-neutral-900 flex-1">How to make your Elementor website win PageSpeed</div>
                    </a>
                </div>

                <div>
                    <a
                        className="font-medium flex flex-col sm:flex-row gap-1 sm:gap-3 mb-4"
                        href="https://dev.to/almazbisenbaev/how-to-write-css-in-2025-modern-features-you-should-be-using-with-examples-3g47"
                        target='_blank'
                    >
                        <div className="text-neutral-500 w-[140px]">June 5, 2025</div>
                        <div className="text-neutral-900 flex-1">How to Write CSS in 2025 – Modern Features You Should Be Using (with examples)</div>
                    </a>
                </div>

                <div>
                    <a
                        className="font-medium flex flex-col sm:flex-row gap-1 sm:gap-3 mb-4"
                        href="https://webdevandstuff.hashnode.dev/mastering-productivity-1"
                        target='_blank'
                    >
                        <div className="text-neutral-500 w-[140px]">April 17, 2025</div>
                        <div className="text-neutral-900 flex-1">Mastering Productivity as a Freelancer</div>
                    </a>
                </div>

            </div>

        </div>
    )

}