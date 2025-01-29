import { codeToHtml, createHighlighter } from "shiki";
export const highlighter = await createHighlighter({
  langs: ["json"],
  themes: ["github-dark-default"],
});
