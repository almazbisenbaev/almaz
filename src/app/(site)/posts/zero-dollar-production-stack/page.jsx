import Image from 'next/image';

import PostBreadcrumbs from '@/components/post-breadcrumbs/post-breadcrumbs';
import BlogJsonLd from '@/components/seo/blog-json-ld';
import { findPost, postDate, postPath } from '@/data/posts';
import { AUTHOR_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/site';

const post = findPost('zero-dollar-production-stack');

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
        width: 1200,
        height: 630,
        alt: post.title,
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

export default function PostZeroDollarProductionStack() {
  return (
    <article className="min-h-screen pt-12 sm:pt-24">
      <BlogJsonLd post={post} />

      <div className="site-container">
        <div className="max-w-3xl mx-auto">
          <PostBreadcrumbs title={post.title} />

          <header className="mb-10 sm:mb-16">
            <h1 className="text-3xl sm:text-7xl font-bold mb-8 tracking-title">{post.title}</h1>
            <div className="text-neutral-400 font-medium text-xs mt-4">
              <time dateTime={post.publishedAt}>{postDate(post)}</time>
            </div>
          </header>
        </div>
      </div>

      <div className="site-container mb-10 sm:mb-16">
        <Image
          src={post.thumbnail}
          width={1200}
          height={630}
          loading="eager"
          sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) 592px, (max-width: 1023px) 720px, (max-width: 1279px) 976px, (max-width: 1535px) 1232px, 1488px"
          alt="Three compact servers stacked together with a paper price tag marked $0"
          className="w-full h-auto sm:rounded-xl"
        />
      </div>

      <div className="site-container">
        <div className="max-w-3xl mx-auto article [&_a]:underline [&_a]:decoration-neutral-400 [&_a]:underline-offset-4 [&_a:hover]:decoration-neutral-900">
          <p>Let's say you're building a bookmark manager. People sign in, save links, and find them again on another device. Maybe they add a title and a few tags. "Read later" is a very optimistic way to say "collect forever," but let's build it anyway.</p>

          <p>That's a real app. It needs hosting, authentication, a database, and access rules. It doesn't automatically need Redis, a separate search service, or an object-storage bucket.</p>

          <p>For this kind of project, I'd start with a static frontend on Cloudflare, Firebase Auth, and Firestore on the Spark plan. I'll get to Supabase and Neon too, because the right choice depends on what we're saving and what we want to do with it.</p>

          <p>I'm trying to keep the app small enough to understand. If saving a URL means managing eight dashboards, I've accidentally given myself a second job. Fuck that little upgrade.</p>

          <h2>First, decide what $0 means</h2>

          <p>A free plan, a free allowance on a paid plan, and a trial are three different things. All of them can show a $0 bill today. I'd quite like to know what happens tomorrow.</p>

          <p>Here I'd use free plans without enabling pay-as-you-go billing. Firebase's <a href="https://firebase.google.com/docs/projects/billing/firebase-pricing-plans">Spark plan</a> doesn't require payment details. But a service can stop working when its quota runs out. The bill can stay at zero while the app does absolutely nothing. Very affordable nothing.</p>

          <h2>The stack I'd start with</h2>

          <p>I'd use React with Vite and build the frontend as static files. If you prefer Vue, use Vue. We're building a private dashboard, so I'm happy to render it in the browser. I'd reach for Next.js when I actually need its server features.</p>

          <p>I'd host those files on Cloudflare Workers Static Assets, which can <a href="https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/">serve them for free, with unlimited static asset requests</a>. There's a detail to pay attention to here: serve the assets directly. Requests that execute a Worker have separate limits, so I'd leave server routes out of this first version. I'd also use the included subdomain to keep the domain cost out of the picture.</p>

          <p>If you prefer one provider, <a href="https://firebase.google.com/docs/hosting/usage-quotas-pricing">Firebase Hosting</a> is also an option on Spark. It has a transfer allowance, and the site can be disabled after exceeding it. I'd choose Cloudflare for this example to avoid that particular frontend limit.</p>

          <h3>Login and saved data</h3>

          <p><a href="https://firebase.google.com/docs/auth/web/google-signin">Google sign-in through Firebase Auth</a> gives the app a user identity. That also lets me skip password-reset emails and an SMS provider for this version. Of course, users need a Google account. If that's a bad fit for your audience, change the login method.</p>

          <p>Cloud Firestore stores documents in collections. For this app, each user would have a bookmarks collection, with a document for each saved link. Each bookmark holds a URL, title, and tags. This fits the <a href="https://firebase.google.com/docs/firestore/data-model">document model</a> without needing relational joins.</p>

          <p>The browser talks directly to Firestore, so <a href="https://firebase.google.com/docs/rules/basics">Security Rules</a> need to restrict each user's access to their own records and validate writes. I'd test this with two accounts: signing in as Alice must never let you read Bob's bookmarks. Hiding Bob's links in the interface doesn't count. The database needs to refuse the request.</p>

          <h2>Where this setup stops being free</h2>

          <p>Firestore's <a href="https://firebase.google.com/docs/firestore/quotas">free quota</a> currently includes one free database per project, 1 GiB of stored data, 50,000 document reads a day, 20,000 writes a day, and 10 GiB of outbound transfer a month. Managed backups and point-in-time recovery require billing.</p>

          <p>Those numbers count operations. Reading a list of 100 documents isn't one document read. Reloads and live updates count too, so I'd paginate lists and keep an eye on usage. I can't turn "50,000 reads" into "thousands of users" without knowing what those users are doing.</p>

          <p>Custom server work changes the plan too. <a href="https://firebase.google.com/pricing">Cloud Functions and Firebase App Hosting require Blaze</a>. Firebase Hosting and Firebase App Hosting are different products. Helpfully unhelpful naming. This example uses a static frontend and no Cloud Functions.</p>

          <p>File uploads are another boundary. <a href="https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024">Cloud Storage for Firebase also requires Blaze</a>, even though some usage can still be free. Saving a text document in Firestore and uploading a photo to a storage bucket are different features.</p>

          <p>That's the scope: logins and saved text data. If the first feature on your list is "upload a video," I'd pick a different setup before writing any code.</p>

          <h2>When I'd choose something else</h2>

          <p>Firebase fits this example. Change the app and I'd happily change the backend, with Cloudflare still serving the static frontend.</p>

          <p>Supabase is a sensible choice when the data needs joins or the app needs a small upload feature. It brings Postgres, auth, and file storage together, and its <a href="https://supabase.com/pricing">Free plan</a> includes a 500 MB database and 1 GB of file storage. I'd use the storage that's already there before adding R2. Read the <a href="https://supabase.com/docs/guides/deployment/going-into-prod">production checklist</a> for inactivity pausing and recovery, check the transfer allowance, and remember that public email flows need <a href="https://supabase.com/docs/guides/auth/auth-smtp">custom SMTP</a>. Social login lets a limited first version skip that email setup.</p>

          <p>Neon is worth a look too, with Postgres that can scale to zero. Its <a href="https://neon.com/docs/introduction/plans">free plan</a> includes 1 GB of Postgres storage and 100 CU-hours per project each month. I'd keep an eye on both compute and transfer usage. It also offers <a href="https://neon.com/docs/auth/about">managed Better Auth</a>, currently in AWS regions. If you remember it as just a database, that picture needs updating. I'd compare it with Supabase for a SQL-based app.</p>

          <p>If I wanted to write a custom API, I'd consider Workers with <a href="https://developers.cloudflare.com/d1/">D1</a> for SQLite-compatible SQL inside Cloudflare. D1's <a href="https://developers.cloudflare.com/d1/platform/pricing/">free allowances</a> include 5 million rows read and 100,000 rows written daily, plus 5 GB of total storage. That's plenty to consider, but I still have to sort out user authentication and permissions. For this bookmark app, I'd take the managed auth-and-data setup above.</p>

          <p>I'd also consider <a href="https://www.convex.dev/pricing">Convex</a> for an app built around reactive data and backend functions. That means getting comfortable with its data and function model, checking the usage quotas, and remembering that Free and the pay-as-you-go Starter plan are different choices.</p>

          <h2>What I'd leave out</h2>

          <p>I'd leave out a separate storage bucket while the app only saves links and text. R2 becomes relevant when there are actual files to store; its <a href="https://developers.cloudflare.com/r2/pricing/">free allowance</a> still has storage and operation limits.</p>

          <p>I wouldn't self-host an analytics service either. If basic visits and page performance are enough, <a href="https://www.cloudflare.com/web-analytics/">Cloudflare Web Analytics</a> is a free hosted option. Product events and funnels need a separate decision. Honestly, I'd skip analytics until I know what I want to measure. A dashboard of numbers I don't use is just a screensaver with responsibilities.</p>

          <p>A cache and a search platform can wait too. I'd first build the bookmark list, tags, and filters. If the app eventually needs full-text search across a large collection, that requirement may change the backend choice.</p>

          <p>I also wouldn't assume Vercel Hobby covers a business. Vercel is convenient, especially for Next.js, but its <a href="https://vercel.com/legal/terms">Hobby terms</a> specify personal or non-commercial use. That's something to check before calling it the free hosting layer for a paid SaaS.</p>

          <h2>The part that matters more than the tools</h2>

          <p>For the app described here, Cloudflare plus Firebase is the starting point I'd choose. If the requirements include relational data or uploads, Supabase or Neon deserves a closer look. If you need a custom API and are happy to handle auth integration, Workers and D1 can make sense.</p>

          <p>What I want at the end is a small, complete app. Login works. Bookmarks are still there tomorrow. Alice can't read Bob's stuff. The quotas fit how people use it. That's enough to build toward.</p>

          <p>I'd pay when availability, recovery, or a needed feature makes the free plan a poor fit. Keeping the bill at zero isn't much of a victory if I spend every weekend working around it.</p>

          <p>I like a free stack. I'd also like to be free from maintaining things the app never needed.</p>
        </div>
      </div>
    </article>
  );
}
