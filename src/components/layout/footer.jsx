import { Separator } from "../ui/separator";
import ArrowUpRight from "@/components/icons/arrow-up-right";
import Link from "next/link";

export default function Footer({ locale = 'en' }) {
    const isRussian = locale === 'ru-KZ';
    return (
        <div className={isRussian ? "pt-16 pb-8 sm:pt-24 sm:pb-10" : "pt-40 pb-10"}>
            <div className={`container relative ${isRussian ? "px-4 sm:px-5" : "px-5"}`}>

            <Separator className="mb-10 bg-blue-700/10" />

            <div className={`font-medium flex flex-col sm:flex-row gap-3 ${isRussian ? "text-base sm:text-lg mb-10 sm:mb-18" : "text-lg mb-18"}`}>
                <div>{isRussian ? 'Ещё о веб-разработке:' : 'I also talk about web dev here:'}</div>

                <div className="flex gap-3">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.threads.com/@almazbisenbaev" className={`extlink ${isRussian ? "min-h-11" : ""}`}>
                    <ArrowUpRight />
                    Threads
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@webdevandstuff" className={`extlink ${isRussian ? "min-h-11" : ""}`}>
                    <ArrowUpRight />
                    YouTube
                    </a>
                </div>

            </div>

            <div className="flex flex-col gap-3 sm:gap-6">
                <div className={`ff-display font-bold tracking-tight opacity-50 ${isRussian ? "text-[clamp(1.5rem,7vw,3.75rem)]" : "text-3xl sm:text-6xl"}`}>Telegram:</div>
                <div>
                    <a className={`ff-display font-bold tracking-tight hover:text-[#00f] transition-colors ${isRussian ? "inline-flex min-h-11 items-center text-[clamp(1.5rem,7vw,3.75rem)]" : "text-3xl sm:text-6xl"}`} href="//t.me/almazbisenbaev">@almazbisenbaev</a>
                </div>
            </div>

            {!isRussian && (
                <Link
                    href="/razrabotka-saitov-kazakhstan"
                    hrefLang="ru-KZ"
                    lang="ru"
                    prefetch={false}
                    className="mt-8 inline-flex min-h-11 items-center text-sm text-neutral-600 underline underline-offset-4 hover:text-black transition-colors"
                >
                    Разработка сайтов в Казахстане
                </Link>
            )}

            </div>
        </div>
    )
}
