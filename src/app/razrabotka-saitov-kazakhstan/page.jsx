import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Button from "@/components/button/button";
import FaqAccordion from "@/components/faq-accordion/faq-accordion";
import PortfolioCarousel from "@/components/portfolio-carousel/portfolio-carousel";
import { findWork } from "@/data/works";
import {
  OPEN_GRAPH_IMAGE,
  PERSON_ID,
  PROFILES,
  SITE_URL,
  TWITTER_HANDLE,
  TWITTER_IMAGE,
} from "@/lib/site";

const PATH = "/razrabotka-saitov-kazakhstan";
const PAGE_URL = `${SITE_URL}${PATH}`;
const TITLE = "Разработка сайтов в Казахстане — Алмаз Бисенбаев";
const DESCRIPTION =
  "Создание сайтов для бизнеса в Казахстане: лендинги, сайты компаний и интернет-магазины на WordPress и WooCommerce. Разработчик Алмаз Бисенбаев. Обсудим ваш проект.";
const TELEGRAM_URL = PROFILES.telegram;

// This root has its own metadata rather than inheriting the English one, so
// `metadataBase` has to be declared here too for the relative image paths.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  // This is a dedicated regional service page, not a translation of the home
  // page. Keep its own canonical rather than declaring unrelated hreflang pairs.
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
  authors: [{ name: "Алмаз Бисенбаев", url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Алмаз Бисенбаев — веб-разработчик",
    images: [{ ...OPEN_GRAPH_IMAGE, alt: "Алмаз Бисенбаев — веб-разработчик" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: TWITTER_HANDLE,
    images: [TWITTER_IMAGE],
  },
};

const services = [
  {
    number: "01",
    title: "Лендинги и сайты компаний",
    description:
      "Расскажите о продукте, покажите услуги и дайте клиентам простой способ связаться с вами. Сделаю адаптивный сайт, которым удобно пользоваться с телефона и компьютера.",
    detail: "Для услуг, новых продуктов и малого бизнеса",
  },
  {
    number: "02",
    title: "Интернет-магазины",
    description:
      "Разработаю магазин на WooCommerce: каталог, карточки товаров, корзину и оформление заказа. Способы оплаты, доставку и нужные интеграции обсудим до начала работы.",
    detail: "WordPress · WooCommerce",
  },
  {
    number: "03",
    title: "Доработка и ускорение сайта",
    description:
      "Помогу с существующим WordPress-сайтом: исправлю ошибки, обновлю интерфейс, оптимизирую загрузку или добавлю нужную функцию. Начнём с задачи и состояния текущего сайта.",
    detail: "Редизайн, поддержка и производительность",
  },
  {
    number: "04",
    title: "Нестандартная разработка",
    description:
      "Личные кабинеты, веб-приложения, собственные плагины и интеграции с API. Подберу подходящий стек под задачу — от WordPress до React и Next.js.",
    detail: "React · Next.js · API",
  },
];

const projectCopy = [
  {
    name: "Funky Ramen",
    description: "Сайт кафе для любителей аниме. Разработка на WordPress с выразительной графикой и анимацией.",
    alt: "Главная страница сайта кафе Funky Ramen",
    type: "Сайт кафе · WordPress",
  },
  {
    name: "Muafaktur",
    description: "Интернет-магазин косметики и обучающих курсов. Работа над интерфейсом и разработка на WooCommerce.",
    alt: "Интернет-магазин косметики и курсов Muafaktur",
    type: "Интернет-магазин · WooCommerce",
  },
  {
    name: "Monitask",
    description: "Многоязычный сайт на WordPress с сотнями страниц, которые создаются и обновляются автоматически.",
    alt: "Многоязычный сайт сервиса Monitask",
    type: "Сайт сервиса · Автоматизация",
  },
];

// Russian copy layered over the shared project record, so links, images and
// dates stay in one place while the descriptions are written per language.
const projects = projectCopy.map((copy) => ({ ...findWork(copy.name), ...copy }));

const process = [
  {
    title: "Обсуждаем задачу",
    description: "Вы рассказываете о бизнесе, аудитории и том, что должен делать сайт. Можно начать с сообщения в Telegram — готовое техническое задание не обязательно.",
  },
  {
    title: "Согласуем объём и стоимость",
    description: "Определяем страницы, функции и этапы. До начала разработки фиксируем стоимость и сроки, чтобы у нас было одинаковое понимание результата.",
  },
  {
    title: "Разрабатываем и запускаем",
    description: "Показываю промежуточные результаты, проверяю сайт на разных экранах и готовлю к запуску. Объясняю, как обновлять контент; дальнейшую поддержку можно обсудить отдельно.",
  },
];

const faqs = [
  {
    question: "Сколько стоит разработка сайта?",
    answer: "Стоимость зависит от количества страниц, дизайна, функций и интеграций. Пришлите описание задачи и примеры сайтов, которые вам нравятся. После обсуждения предложу объём работ и цену для вашего проекта.",
  },
  {
    question: "Работаете ли вы с клиентами из Алматы и Астаны?",
    answer: "Да. Работаю удалённо с бизнесом из Алматы, Астаны, Шымкента и других городов Казахстана. Обсуждать задачи, показывать результат и согласовывать правки можно онлайн, на русском языке.",
  },
  {
    question: "Можно сделать сайт на русском и казахском?",
    answer: "Да, можно заложить в сайт несколько языковых версий и удобное переключение между ними. Для каждой версии понадобится подготовленный и согласованный текст. Состав языков и работу с контентом обсудим заранее.",
  },
  {
    question: "Будет ли сайт готов к продвижению в поиске?",
    answer: "При разработке учитываю техническую основу: понятные адреса страниц, заголовки и метаописания, адаптивность, скорость загрузки и карту сайта. Позиции в Google и Яндексе зависят также от контента, конкуренции и дальнейшей работы над сайтом.",
  },
  {
    question: "Можно заказать доработку, а не новый сайт?",
    answer: "Да. Пришлите ссылку на существующий сайт и список задач: например, исправить ошибки, ускорить загрузку, обновить страницы или добавить функцию. Посмотрю, что можно улучшить в текущем проекте.",
  },
  {
    question: "Смогу ли я сам менять контент?",
    answer: "Для сайта на WordPress подготовлю удобное редактирование нужных разделов и инструкцию по работе с ними. Вы сможете обновлять тексты, изображения и товары без постоянного обращения к разработчику.",
  },
];

const carouselLabels = {
  instructions:
    "Перетаскивайте проекты влево или вправо. С клавиатуры используйте " +
    "стрелки влево и вправо, Home и End. Tab переходит к ссылкам проектов.",
  carousel: "карусель",
  slide: "слайд",
  slideLabel: "Проект {index} из {count}",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "ru-KZ",
      mainEntity: { "@id": `${PAGE_URL}#service` },
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Разработка сайтов для бизнеса в Казахстане",
      serviceType: "Разработка сайтов, интернет-магазинов и веб-приложений",
      description: DESCRIPTION,
      url: PAGE_URL,
      areaServed: { "@type": "Country", name: "Казахстан", identifier: "KZ" },
      provider: { "@id": PERSON_ID },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: TELEGRAM_URL,
        availableLanguage: "ru",
      },
    },
  ],
};

export default function KazakhstanPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="container px-4 pt-8 pb-10 sm:px-5 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="flex items-center gap-3 mb-7 sm:gap-4 sm:mb-12">
          <Image src="/me.jpg" alt="Алмаз Бисенбаев" width={64} height={64} sizes="(max-width: 639px) 48px, 64px" className="size-12 shrink-0 rounded-full sm:size-16" />
          <p className="text-sm text-neutral-600 leading-relaxed">
            Привет, я Алмаз.<br />
            Разрабатываю сайты для бизнеса в Казахстане.
          </p>
        </div>

        <h1 className="max-w-6xl text-[clamp(2rem,8.6vw,3.5rem)] sm:text-6xl lg:text-[5rem] font-extrabold tracking-[-0.045em] leading-[1.08]">
          <span className="block">Создаю сайты,</span>{" "}
          <span className="block">которые работают</span>{" "}
          <span className="block text-blue-600">на ваш бизнес.</span>
        </h1>

        <div className="mt-6 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <p className="max-w-2xl text-base sm:text-xl text-neutral-600 leading-relaxed">
            Лендинг для новой услуги, сайт компании или интернет-магазин —
            помогу превратить вашу задачу в удобный сайт. Работаю напрямую
            с вами: от первого обсуждения до запуска.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <Button href={TELEGRAM_URL} variant="black" className="w-full min-h-13 !px-5 sm:w-auto sm:!px-8">
              Обсудить проект <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <Button href="#projects" className="w-full min-h-13 !px-5 sm:w-auto sm:!px-8">
              Мои работы <ArrowDown size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 border-y border-black/10 py-4 sm:py-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-neutral-600">
          <span>WordPress и WooCommerce</span>
          <span>React и Next.js</span>
          <span>Удалённо по Казахстану</span>
        </div>
      </section>

      <section className="container px-4 pb-12 sm:px-5 sm:pb-20 lg:pb-24" aria-labelledby="services-title">
        <div className="block-header">
          <h2 id="services-title" className="block-header-title">Чем могу помочь</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {services.map((service) => (
            <article key={service.number} className="min-w-0 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 flex flex-col">
              <span className="text-sm text-neutral-500 mb-5 sm:mb-8">{service.number}</span>
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">{service.title}</h3>
              <p className="text-base text-neutral-600 leading-relaxed mt-4 mb-6 sm:mt-5 sm:mb-8">{service.description}</p>
              <p className="text-xs font-medium text-neutral-500 mt-auto">{service.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="container px-4 py-8 sm:px-5 sm:py-16 scroll-mt-6" aria-labelledby="projects-title">
        <div className="block-header">
          <h2 id="projects-title" className="block-header-title">Несколько моих работ</h2>
          <p className="max-w-2xl mt-4 sm:mt-6 text-neutral-600 text-base sm:text-lg leading-relaxed">
            Примеры проектов для зарубежных клиентов. Такой же опыт разработки
            сайтов компаний, магазинов и сервисов предлагаю бизнесу в Казахстане.
          </p>
        </div>
        <PortfolioCarousel labelledBy="projects-title" labels={carouselLabels}>
          {projects.map((project) => {
            const [screenshot] = project.media;

            return (
            <article key={project.name} className="min-w-0 flex flex-col">
              <a href={project.url} target="_blank" rel="noopener noreferrer" draggable={false} aria-label={`Открыть сайт ${project.name}`} className="block rounded-2xl overflow-hidden bg-white">
                <Image
                  src={screenshot.src}
                  alt={project.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(max-width: 639px) calc(88vw - 28.16px), (max-width: 767px) 360px, (max-width: 1023px) 437px, (max-width: 1279px) 433px, (max-width: 1535px) 546px, 659px"
                  draggable={false}
                  className="w-full aspect-[16/10] object-cover object-top"
                />
              </a>
              <p className="mt-6 text-xs text-neutral-500">{project.type}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.name}</h3>
              <p className="text-base text-neutral-600 leading-relaxed mt-3 mb-5">{project.description}</p>
              <p className="text-xs text-neutral-500 mt-auto">
                {project.year} · Для <a href={project.clientUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">{project.client}</a>
              </p>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 self-start items-center gap-2 mt-2 sm:mt-4 text-sm font-semibold hover:text-blue-600 transition-colors">
                Посмотреть сайт <span className="sr-only">{project.name}</span> <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
            );
          })}
        </PortfolioCarousel>
      </section>

      <section className="container px-4 py-12 sm:px-5 sm:py-20 lg:py-24" aria-labelledby="process-title">
        <div className="block-header">
          <h2 id="process-title" className="block-header-title">Как строится работа</h2>
        </div>
        <ol className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {process.map((step, index) => (
            <li key={step.title} className="min-w-0 border-t border-black/15 pt-5 sm:pt-6">
              <span className="text-sm text-blue-600 font-semibold">0{index + 1}</span>
              <h3 className="text-2xl font-semibold tracking-tight mt-4 sm:mt-6 mb-3 sm:mb-4">{step.title}</h3>
              <p className="max-w-2xl text-base text-neutral-600 leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container px-4 py-8 sm:px-5 sm:py-12" aria-labelledby="faq-title">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6 sm:gap-8 lg:gap-16">
          <h2 id="faq-title" className="block-header-title self-start">Частые вопросы</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="container px-4 pt-12 sm:px-5 sm:pt-20 lg:pt-24" aria-labelledby="contact-title">
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-neutral-950 text-white p-6 sm:p-12 lg:p-20">
          <p className="text-sm text-white/60 mb-5 sm:mb-6">Есть задача для сайта?</p>
          <h2 id="contact-title" className="text-[clamp(1.875rem,8vw,2.75rem)] sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl">Давайте обсудим{" "}<br className="hidden sm:block" />ваш проект.</h2>
          <p className="max-w-xl mt-5 mb-6 sm:mt-6 sm:mb-8 text-base sm:text-lg text-white/70 leading-relaxed">
            Напишите, чем занимается ваш бизнес и какой сайт вам нужен.
            Если сайт уже есть — отправьте ссылку и расскажите, что хотите улучшить.
          </p>
          <Button href={TELEGRAM_URL} variant="white" className="w-full min-h-13 !px-4 sm:w-auto sm:!px-8">
            Написать в Telegram <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </section>
    </div>
  );
}
