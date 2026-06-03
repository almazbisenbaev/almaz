import { codeToHtml } from 'shiki';

export default async function CodeBlock({ code, lang = 'html', theme = 'vitesse-dark' }) {
  const highlightedCode = await codeToHtml(code, { lang, theme });

  return (
    <div
      className="my-6 rounded-lg overflow-hidden"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
