import { createHighlighter, type Highlighter } from "shiki";
import { createCssVariablesTheme } from "shiki/core";

const customTheme = createCssVariablesTheme({
  name: "premid-theme",
  variablePrefix: "--premid-code-",
  variableDefaults: {
    foreground: "#e2e8f0",
    background: "rgba(13, 17, 23, 0.7)",
    "token-comment": "#7c85a0",
    "token-string": "#7cc4f7",
    "token-keyword": "#4b7bf7",
    "token-number": "#7742fd",
    "token-property": "#bb9af7",
    "token-punctuation": "#7c85a0",
  },
});

let _highlighter: Highlighter | null = null;

export async function getHighlighter() {
  if (!_highlighter) {
    _highlighter = await createHighlighter({
      langs: ["json"],
      themes: [customTheme, "github-dark-default"],
    });
  }
  return _highlighter;
}
