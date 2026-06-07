import Link from 'next/link';
import BlogJsonLd from '@/components/seo/blog-json-ld';
import CodeBlock from '@/components/code-block/code-block';

const post = {
  title: "The same button component in 3 major versions of VueJS",
  date: "June 10, 2026",
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
        template: '<button v-on:click="showAlert">Click me (Vue 1)</button>',
        methods: {
          showAlert: function() {
            alert('Hello from Vue 1.x!');
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
    Click me (Vue 2)
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


export default async function PostVuejsEvolution() {
  return (
    <article className="min-h-screen py-24">
      <BlogJsonLd post={post} />
      
      <div className="container">
        <div className="max-w-4xl mx-auto">

          <Link href="/posts" className="inline-flex items-center text-neutral-400 hover:text-neutral-900 mb-12 transition-colors text-sm font-medium uppercase tracking-widest">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>

          <header className="mb-16">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-neutral-400 text-sm font-medium uppercase tracking-widest">{post.date}</span>
              <span className="text-neutral-200">•</span>
              <span className="text-neutral-400 text-sm font-medium uppercase tracking-widest">Frontend</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">The same button component in 3 major versions of VueJS</h1>
          </header>

          <div className="article">

            <p className="text-xl md:text-2xl">
              Vue.js has come a long way since its initial release. From its humble beginnings as a lightweight library inspired by Angular and React, it has grown into one of the most beloved frontend frameworks. In this post, I'll look at three major milestones: <b>Vue 1.x</b> (the original), <b>Vue 2.x</b> (the Options API era that powered massive adoption), and <b>Vue 3.x</b> (the modern Composition API default). I'll implement the same simple feature: a button that shows an alert when clicked.
            </p>


            <h2>Vue 1.x: The Dawn of Reactive Components (circa 2015)</h2>
            <p>
              Vue 1 introduced the core concepts that made it stand out: reactive data binding, a simple template syntax, and component-based architecture using <code>Vue.extend()</code> and global registration.
            </p>
            <p><b>Key characteristics of this era:</b></p>
            <ul>
              <li><div>Heavy use of <code>Vue.extend()</code> for component definitions.</div></li>
              <li><div>Templates were often strings or in the DOM.</div></li>
              <li><div>Event handling with <code>v-on</code> (shorthand <code>@</code> came later but was similar).</div></li>
              <li><div>Data was defined directly, with caveats around sharing objects.</div></li>
            </ul>
            <p><b>Example: AlertButton.vue (Vue 1 style)</b></p>
            <CodeBlock code={vue1Code} lang="html" />
            <p><b>What's notable:</b> Everything was quite imperative and constructor-based. Components felt like enhanced custom elements. This version was lightweight and easy to pick up, focusing on progressive enhancement. No build tools were strictly required.</p>


            <h2>Vue 2.x: The Options API Golden Age (2016–2020+)</h2>

            <p>Vue 2 refined the developer experience significantly. It popularized the Options API — organizing code into clear sections like <code>data</code>, <code>methods</code>, <code>computed</code>, and lifecycle hooks. This became the standard way most developers learned and used Vue for years. Global <code>Vue.component</code> was still common, but Single-File Components (.vue files) with webpack/Vue CLI became the norm.</p>
            <p><b>Key improvements:</b></p>
            <ul>
              <li>More structured component options.</li>
              <li>Better reactivity system.</li>
              <li>Official CLI and excellent documentation.</li>
              <li><code>v-on:click</code> shorthand <code>@click</code> widely used.</li>
            </ul>
            <p><b>Example: AlertButton.vue (Vue 2 Options API)</b></p>
            <CodeBlock code={vue2Code} lang="html" />
            <p><b>Usage in parent:</b></p>
            <CodeBlock code={vue2Code2} lang="html" />
            <p>This syntax feels very organized and explicit. The separation of concerns (template, script, style) in Single-File Components made large apps much more maintainable.</p>

            


            <div className="bg-red-500 h-3 mt-24"></div>

          </div>
        </div>
      </div>
    </article>
  );
}