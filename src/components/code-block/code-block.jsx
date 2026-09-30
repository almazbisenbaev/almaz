import { codeToHtml } from 'shiki';

/**
 * Server-side syntax highlighting, so no highlighter ships to the browser.
 * Shiki's output is trusted markup generated here from the given source.
 */
export default async function CodeBlock({ code, lang = 'html', theme = 'vitesse-dark' }) {
  const highlightedCode = await codeToHtml(code, { lang, theme });

  return (
    <div
      className="my-6 rounded-lg overflow-hidden"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
