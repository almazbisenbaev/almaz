import Link from 'next/link';
import Image from 'next/image';
import BlogJsonLd from '@/components/seo/blog-json-ld';
import CodeBlock from '@/components/code-block/code-block';

const post = {
  title: "The same button component in 3 major versions of VueJS",
  date: "June 11, 2026",
  link: "/posts/vuejs-evolution",
  description: "I created the same button component in 3 major versions of VueJS to see how it changed"
};

export const metadata = {
  title: 'The same button component in 3 major versions of VueJS',
  description: 'I created the same button component in 3 major versions of VueJS to see how it changed',
  alternates: {
    canonical: '/posts/vuejs-evolution'
  }
}

const vue1Code = `<html>
  <head>
    <script src="https://unpkg.com/vue@1.0.28/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <alert-button></alert-button>
    </div>

    <script>
      var AlertButton = Vue.extend({
        template: '<button v-on:click="showAlert">Click me</button>',
        methods: {
          showAlert: function() {
            alert('Hello!');
          }
        }
      });

      Vue.component('alert-button', AlertButton);

      new Vue({
        el: '#app'
      });
    </script>
  </body>
</html>`;

const vue2Code = `<template>
  <button @click="showAlert">
    Click me
  </button>
</template>

<script>
export default {
  name: 'AlertButton',
  methods: {
    showAlert() {
      alert('Hello from Vue 2.x Options API!');
    }
  }
}
</script>`;


const vue2Code2 = `<template>
  <div>
    <AlertButton />
  </div>
</template>

<script>
import AlertButton from './AlertButton.vue'

export default {
  components: { AlertButton }
}
</script>`;

const vue3Code = `<script setup>
const showAlert = () => {
  alert('Hello from Vue 3.x Composition API!');
}
</script>

<template>
  <button @click="showAlert">
    Click me
  </button>
</template>`;


export default async function PostVuejsEvolution() {
  return (
    <article className="min-h-screen py-12 sm:py-24">
      <BlogJsonLd post={post} />

      <div className="container px-5">
        <div className="max-w-3xl mx-auto">

          <Link href="/posts" className="inline-flex items-center text-neutral-400 hover:text-neutral-900 mb-12 transition-colors text-xs font-medium uppercase tracking-widest">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back
          </Link>

          <header className="mb-10 sm:mb-16">
            <div className="text-neutral-400 font-medium uppercase text-xs sm:text-sm flex items-center space-x-2 mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>Frontend</span>
            </div>
            <h1 className="text-3xl sm:text-7xl font-bold mb-8 tracking-tight">The same button component in 3 major versions of VueJS</h1>
          </header>

        </div>
      </div>

      <div className="container px-0 max-w-[1400px] mb-10 sm:mb-16">
        <Image 
          src="/images/article-vuejs-cover.jpg"
          width="1600"
          height="1200"
          alt=""
          className="w-full sm:rounded-xl"
        />
      </div>
      
      <div className="container px-5">
        <div className="max-w-3xl mx-auto">

          <div className="article">

            <p className="text-xl md:text-2xl">
              Vue.js has come a long way since its initial release. From its humble beginnings as a lightweight library inspired by Angular and React, it has grown into one of the most beloved frontend frameworks. In this post, I'll look at three major milestones: <b>Vue 1</b>, <b>Vue 2</b> (the Options API era that powered massive adoption), and <b>Vue 3</b> (the modern Composition API default). I'll implement the same simple feature: a button that shows an alert when clicked.
            </p>


            <h2>Vue 1 (2015)</h2>
            <p>Vue 1 introduced the core concepts that made it stand out: reactive data binding, a simple template syntax, and component-based architecture using <code>Vue.extend()</code> and global registration.</p>
            <p><b>Key characteristics of this era:</b></p>
            <ul>
              <li><div>Heavy use of <code>Vue.extend()</code> for component definitions.</div></li>
              <li><div>Templates were often strings or in the DOM.</div></li>
              <li><div>Event handling with <code>v-on</code> (shorthand <code>@</code> came later but was similar).</div></li>
              <li><div>Data was defined directly, with caveats around sharing objects.</div></li>
            </ul>
            <p><b>Example with Vue 1</b></p>
            <CodeBlock code={vue1Code} lang="html" />
            <p><b>What's notable:</b> Everything was quite imperative and constructor-based. Components felt like enhanced custom elements. This version was lightweight and easy to pick up, focusing on progressive enhancement. No build tools were strictly required.</p>


            <h2>Vue 2: The Options API (2016–2020)</h2>

            <p>Vue 2 refined the developer experience significantly. It popularized the Options API: organizing code into clear sections like <code>data</code>, <code>methods</code>, <code>computed</code>, and lifecycle hooks. This became the standard way most developers learned and used Vue for years. Global <code>Vue.component</code> was still common, but Single-File Components (.vue files) with webpack/Vue CLI became the norm.</p>
            <p><b>Key improvements:</b></p>
            <ul>
              <li><span>More structured component options.</span></li>
              <li><span>Better reactivity system.</span></li>
              <li><span>Official CLI and excellent documentation.</span></li>
              <li><span><code>v-on:click</code> shorthand <code>@click</code> widely used.</span></li>
            </ul>
            <p><b>Example with Vue 2</b></p>
            <CodeBlock code={vue2Code} lang="html" />
            <p><b>Usage in parent:</b></p>
            <CodeBlock code={vue2Code2} lang="html" />
            <p>This syntax feels very organized and explicit. The separation of concerns (template, script, style) in Single-File Components made large apps much more maintainable.</p>


            <h2>Vue 3: Composition API &amp; <code>&lt;script setup&gt;</code> (2020+)</h2>

            <p>Vue 3 brought a complete rewrite with better performance, TypeScript support, and the Composition API. While the Options API is still fully supported for backward compatibility, the new <code>&lt;script setup&gt;</code> syntax has become the recommended default for its conciseness and better logical composition.</p>
            <p><b>Key differences in Vue 3:</b></p>
            <ul>
              <li>Composition API allows grouping logic by feature rather than option type.</li>
              <li><code>&lt;script setup&gt;</code> is syntactic sugar that compiles to highly optimized code.</li>
              <li>Better tree-shaking and smaller bundle sizes.</li>
              <li><code>defineProps</code> / <code>defineEmits</code> macros for better ergonomics.</li>
            </ul>
            <p><b>Example with <code>&lt;script setup&gt;</code></b></p>
            <CodeBlock code={vue3Code} lang="html" />


            <h2>Evolution Summary</h2>

            <ul>
              <li><span><b>Vue 1</b>: Focused on simplicity and getting started quickly with minimal ceremony.</span></li>
              <li><span><b>Vue 2</b>: Emphasized structure and scalability through the Options API.</span></li>
              <li><span><b>Vue 3</b>: Prioritizes flexibility, performance, and composability. Logic can now be extracted into reusable composables (<code>useAlert.js</code>, etc.), making code more modular.</span></li>
            </ul>
            <p>The button itself didn't change much, what changed is how we organize that functionality, and it evolved dramatically for the better.</p>
            <p>In any case, it's impressive how the framework has stayed true to its roots: approachable, performant, and friendly to not-so-bright people like me.</p>

          </div>
        </div>
      </div>
    </article>
  );
}