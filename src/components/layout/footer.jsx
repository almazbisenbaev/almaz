import { Separator } from "@/components/ui/separator";
import ArrowUpRight from "@/components/icons/arrow-up-right";
import { PROFILES } from "@/lib/site";

const TELEGRAM_HANDLE = "@almazbisenbaev";

/**
 * The Russian landing page runs without a header and at the browser's default
 * text scale, so its footer is tighter and its tap targets are sized for
 * mobile (`min-h-11`). Both locales otherwise share this markup.
 */
const COPY = {
  en: { socialsLabel: "I also talk about web dev here:" },
  "ru-KZ": { socialsLabel: "Ещё о веб-разработке:" },
};

const SOCIALS = [
  { href: PROFILES.threads, label: "Threads" },
  { href: PROFILES.youtube, label: "YouTube" },
];

export default function Footer({ locale = "en" }) {
  const isRussian = locale === "ru-KZ";
  const { socialsLabel } = COPY[locale] ?? COPY.en;

  const handleSize = isRussian
    ? "text-[clamp(1.5rem,7vw,3.75rem)]"
    : "text-3xl sm:text-6xl";

  return (
    <div className={isRussian ? "pt-16 pb-8 sm:pt-24 sm:pb-10" : "pt-40 pb-10"}>
      <div className={`container relative ${isRussian ? "px-4 sm:px-5" : "px-5"}`}>

        <Separator className="mb-10 bg-blue-700/10" />

        <div
          className={`font-medium flex flex-col sm:flex-row gap-3 ${
            isRussian ? "text-base sm:text-lg mb-10 sm:mb-18" : "text-lg mb-18"
          }`}
        >
          <div>{socialsLabel}</div>

          <div className="flex gap-3">
            {SOCIALS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`extlink ${isRussian ? "min-h-11" : ""}`}
              >
                <ArrowUpRight />
                {label}
              </a>
            ))}
          </div>

        </div>

        <div className="flex flex-col gap-3 sm:gap-6">
          <div className={`font-bold tracking-tight opacity-50 ${handleSize}`}>Telegram:</div>
          <div>
            <a
              href={PROFILES.telegram}
              className={`font-bold tracking-tight hover:text-[#00f] transition-colors ${
                isRussian ? `inline-flex min-h-11 items-center ${handleSize}` : handleSize
              }`}
            >
              {TELEGRAM_HANDLE}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
