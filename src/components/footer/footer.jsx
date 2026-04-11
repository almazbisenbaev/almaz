import "./footer.css";

export default function Footer() {
    return (
        <div className="pt-40 pb-10">
            <div className="container mx-auto px-6 relative">

            <div className="font-medium text-lg flex flex-col sm:flex-row gap-3 mb-18">
                <div>I also talk about web dev here:</div>

                <div className="flex gap-3">
                    <a target="_blank" href="https://www.threads.com/@almazbisenbaev" className="extlink">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor"></path></svg>
                    Threads
                    </a>
                    <a target="_blank" href="https://www.youtube.com/@webdevandstuff" className="extlink">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor"></path></svg>
                    YouTube
                    </a>
                </div>

            </div>

            <div className="flex flex-col gap-3 sm:gap-6">
                <div className="text-3xl sm:text-6xl ff-display font-bold tracking-tight opacity-50">Telegram:</div>
                <div>
                    <a className="text-3xl sm:text-6xl ff-display font-bold tracking-tight hover:text-(--accent) transition-colors" href="//t.me/almazbisenbaev">@almazbisenbaev</a>
                </div>
            </div>

            </div>
        </div>
    )
}