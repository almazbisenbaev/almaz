import { Separator } from "../ui/separator";
import ArrowUpRight from "@/components/icons/arrow-up-right";

export default function Footer() {
    return (
        <div className="pt-40 pb-10">
            <div className="container px-5 relative">

            <Separator className="mb-10 bg-blue-700/10" />

            <div className="font-medium text-lg flex flex-col sm:flex-row gap-3 mb-18">
                <div>I also talk about web dev here:</div>

                <div className="flex gap-3">
                    <a target="_blank" href="https://www.threads.com/@almazbisenbaev" className="extlink">
                    <ArrowUpRight />
                    Threads
                    </a>
                    <a target="_blank" href="https://www.youtube.com/@webdevandstuff" className="extlink">
                    <ArrowUpRight />
                    YouTube
                    </a>
                </div>

            </div>

            <div className="flex flex-col gap-3 sm:gap-6">
                <div className="text-3xl sm:text-6xl ff-display font-bold tracking-tight opacity-50">Telegram:</div>
                <div>
                    <a className="text-3xl sm:text-6xl ff-display font-bold tracking-tight hover:text-[#00f] transition-colors" href="//t.me/almazbisenbaev">@almazbisenbaev</a>
                </div>
            </div>

            </div>
        </div>
    )
}