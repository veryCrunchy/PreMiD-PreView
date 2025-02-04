import presetUno from "@unocss/preset-uno";
import UnocssIcons from "@unocss/preset-icons";
import transformerDirectives from "@unocss/transformer-directives";
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    UnocssIcons({
      prefix: "i-",
      extraProperties: {
        display: "inline-block",
      },
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    fontFamily: {
      DEFAULT: "Inter",
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
        body {
          font-family: ${theme.fontFamily!.DEFAULT};
        }
      `,
    },
  ],
});
