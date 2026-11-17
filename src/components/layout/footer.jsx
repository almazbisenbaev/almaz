import { Separator } from "@/components/ui/separator";
import ArrowUpRight from "@/components/icons/arrow-up-right";
import { PROFILES } from "@/lib/site";

const TELEGRAM_HANDLE = "@almazbisenbaev";

const SOCIALS = [
  { href: PROFILES.threads, label: "Threads" },
  { href: PROFILES.youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="site-footer pt-20 sm:pt-40 pb-10">
      <div className="site-footer-background" aria-hidden="true" />
      <div className="site-container relative">

        <Separator className="mb-10 bg-blue-700/10" />

        <div className="font-medium flex flex-col sm:flex-row gap-3 text-lg mb-18">
          <div>I also talk about web dev here:</div>

          <div className="flex gap-3">
            {SOCIALS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="extlink"
              >
                <ArrowUpRight />
                {label}
              </a>
            ))}
          </div>

        </div>

        <div className="flex flex-col gap-3 sm:gap-6">
          <div className="font-bold tracking-title opacity-50 text-3xl sm:text-6xl">Telegram:</div>
          <div>
            <a
              href={PROFILES.telegram}
              className="font-bold tracking-title hover:text-[crimson] transition-colors text-3xl sm:text-6xl"
            >
              {TELEGRAM_HANDLE}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
