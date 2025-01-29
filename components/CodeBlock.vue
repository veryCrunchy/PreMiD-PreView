<template>
  <div v-html="html"></div>
</template>

<script lang="ts" setup>
  const { data } = defineProps({
    data: { type: String, required: true },
  });
  // Import Prettier and use the built-in JSON parser
  import prettier from "prettier";
  import babel from "prettier/plugins/babel";
  import estree from "prettier/plugins/estree";
  import { highlighter } from "~/utils/highlighter";

  // Format the JSON using Prettier
  const formattedJson = await prettier.format(data, {
    parser: "json", // Use Prettier's built-in JSON parser
    printWidth: 1000, // Optional:Wrap lines at 80 characters

    tabWidth: 10, // Optional: Use 2 spaces for indentation
    bracketSameLine: true,
    useTabs: false, // Optional: Use spaces instead of tabs
    plugins: [babel, estree],
  });

  // Convert the formatted JSON into highlighted HTML
  const html = highlighter.codeToHtml(formattedJson, {
    lang: "json",
    theme: "github-dark-default",
  });
</script>
<style>
  .hoverable {
    position: relative;
    cursor: pointer;
    text-decoration: underline;
  }

  .hidden {
    display: none;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 5px;
    padding: 5px;
    white-space: pre-wrap;
    max-width: 300px;
    z-index: 10;
  }

  .hoverable:hover .hidden {
    display: block;
  }
  div:has(pre:has(code)) {
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.8);
    border: solid 2px #333;
  }

  pre:has(code) {
    border-radius: 1rem;
    border: solid 2px #333;
  }
  pre code {
    display: block;
    background: none;
    white-space: pre;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    max-width: 100%;
    min-width: 100px;
    padding: 20px;
  }
</style>
