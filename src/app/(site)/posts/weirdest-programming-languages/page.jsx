import Image from 'next/image';

import PostBreadcrumbs from '@/components/post-breadcrumbs/post-breadcrumbs';
import BlogJsonLd from '@/components/seo/blog-json-ld';
import { findPost, postDate, postPath } from '@/data/posts';
import { AUTHOR_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/site';

const post = findPost('weirdest-programming-languages');

export const metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: postPath(post) },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: `${SITE_URL}${postPath(post)}`,
    title: post.title,
    description: post.description,
    siteName: AUTHOR_NAME,
    publishedTime: `${post.publishedAt}T00:00:00Z`,
    images: [
      {
        url: post.thumbnail,
        width: 1734,
        height: 907,
        alt: 'An overwhelmed kitten surrounded by Brainfuck, Malbolge, and INTERCAL code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    creator: TWITTER_HANDLE,
    images: [post.thumbnail],
  },
};

function CodeScreenshot({ src, width, height, alt, children }) {
  return (
    <figure className="my-8">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size image: ${alt}`}
        className="block max-w-xl rounded-xl border border-neutral-200 bg-white p-4 sm:p-6"
      >
        <Image
          src={src}
          width={width}
          height={height}
          sizes="(max-width: 639px) calc(100vw - 74px), 526px"
          alt={alt}
          className="h-auto w-full"
          style={{ maxWidth: width }}
        />
      </a>
      <figcaption className="mt-3 text-sm leading-relaxed text-neutral-500">
        {children}
      </figcaption>
    </figure>
  );
}

export default function PostWeirdestProgrammingLanguages() {
  return (
    <article className="min-h-screen pt-12 sm:pt-24">
      <BlogJsonLd post={post} />

      <div className="site-container">
        <div className="max-w-3xl mx-auto">
          <PostBreadcrumbs title={post.title} />

          <header className="mb-10 sm:mb-16">
            <h1 className="text-4xl/none sm:text-7xl/none font-bold mb-8 tracking-title">{post.title}</h1>
            <div className="text-neutral-400 font-medium text-xs mt-4">
              <time dateTime={post.publishedAt}>{postDate(post)}</time>
            </div>
          </header>
        </div>
      </div>

      <div className="site-container post-cover mb-10 sm:mb-16">
        <Image
          src={post.thumbnail}
          width={1734}
          height={907}
          loading="eager"
          sizes="(max-width: 639px) 100vw, (max-width: 767px) 592px, (max-width: 1023px) 720px, (max-width: 1279px) 976px, (max-width: 1535px) 1232px, 1488px"
          alt="An overwhelmed kitten with outstretched paws surrounded by Brainfuck, Malbolge, and INTERCAL code on a yellow background"
          className="w-full h-auto sm:rounded-xl"
        />
      </div>

      <div className="site-container">
        <div className="max-w-3xl mx-auto">
          <div className="article [&_a]:underline [&_a]:decoration-neutral-400 [&_a]:underline-offset-4 [&_a:hover]:decoration-neutral-900">
            <p>Sometimes I complain about JavaScript. Then I look at other programming languages and realize I've been enjoying a fairly comfortable relationship with my suffering.</p>

            <p>There's a whole category called <b>esoteric programming languages</b>, or esolangs. People make them to explore strange ideas, test the limits of language design, or commit a joke so thoroughly that somebody has to write a compiler for it.</p>

            <p>Here are three of the weirdest. A small tasting menu of "why the fuck would you do this?"</p>

            <h2>1. Brainfuck (BF)</h2>

            <p>Finally, some honest branding.</p>

            <p>Urban Müller's Brainfuck has just <a href="https://gist.github.com/gopalindians/82076ab10a5359ed266a08eb37a32788#file-readme">eight commands</a>: <code>{'><+-.,[]'}</code>. You move a pointer left or right along a row of memory cells, increase or decrease the current value, read or output a character, and loop. That's the language. The rest is your problem.</p>

            <p>To print text, you build up the numbers representing its characters and output them one at a time. A perfectly reasonable task, provided your idea of reasonable is assembling a sandwich with tweezers.</p>

            <CodeScreenshot
              src="/blog/weird-languages-BrainfuckHelloWorld.png"
              width={1000}
              height={1000}
              alt="Brainfuck Hello World source code made entirely of arrows, plus and minus signs, brackets, and dots"
            >
              "Hello World!" in Brainfuck. A lot of punctuation just to start a conversation.
            </CodeScreenshot>

            <p>I do like the tiny instruction set. You can learn every command in a few minutes, then spend the rest of the evening wondering which cell you were in. Small language. Spacious confusion. BF, as in "briefly functional," which is also how I'd describe myself after debugging it.</p>

            <h2>2. Malbolge</h2>

            <p>Ben Olmstead created Malbolge in 1998 specifically to be difficult to program in. It's <a href="https://malbolge.org/">named after the eighth circle of Dante's hell</a>. Lovely. The onboarding documentation is already a threat.</p>

            <p>Malbolge uses base-three numbers, an instruction's meaning depends on its position in memory, and its execution rules transform code in memory as the program runs. The <a href="http://www.lscheffer.com/malbolge_spec.html">original specification</a> explains the machinery, if you'd like to put a technical name to your headache.</p>

            <p>So you can stare at a piece of code, finally understand it, and then have to account for what it turns into. I already have enough trouble reading code that stays the same.</p>

            <CodeScreenshot
              src="/blog/weird-languages-Malbolge_cat_program.png"
              width={445}
              height={154}
              alt="Malbolge cat program source code, a dense mixture of letters, numbers, and punctuation"
            >
              A Malbolge "cat" program: it copies input to output. No actual cats were compiled.
            </CodeScreenshot>

            <p>This program reads the text you enter and outputs the same text. It's a simple task, but Malbolge's unusual rules make the code difficult to write and understand.</p>

            <h2>3. INTERCAL</h2>

            <p>Don Woods and James Lyon created INTERCAL in 1972 as a parody of programming languages. Its full name is <a href="https://www.catb.org/~esr/intercal/ick.htm">"Compiler Language With No Pronounceable Acronym"</a>. The name INTERCAL doesn't follow the initials of that phrase.</p>

            <p>INTERCAL makes even simple arithmetic awkward, with unusual operations that interleave or select bits. But my favorite part is <code>PLEASE</code>. In C-INTERCAL, use it too little and the compiler rejects your program for being insufficiently polite. Use it too much and you're overly polite. Your code now needs both logic and social skills.</p>

            <CodeScreenshot
              src="/blog/weird-languages-Hello_World_INTERCAL.png"
              width={946}
              height={1054}
              alt="INTERCAL Hello World source code with DO, PLEASE, READ OUT, and GIVE UP statements"
            >
              "Hello, world!" in INTERCAL. Even the computer needs to be asked nicely.
            </CodeScreenshot>

            <p>There's also <code>GIVE UP</code>, which ends the program. Finally, a command I can use without checking the documentation. I've been mentally executing it during meetings for years.</p>

            <p>I like that these languages exist. Somebody followed a ridiculous idea all the way to working software, and other people showed up to write programs in it. That's a wonderful use of a computer and a questionable use of a weekend.</p>

            <p>I'll go back to JavaScript now. It occasionally turns my numbers into strings, but at least I don't have to say please.</p>
          </div>
        </div>
      </div>
    </article>
  );
}
