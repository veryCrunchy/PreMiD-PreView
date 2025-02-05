<template>
  <div class="text-white">
    <button
      @click="isExpanded = !isExpanded"
      class="w-full card flex text-inherit items-center gap-3 px-4 py-2 mb-2 text-left"
    >
      <div
        :class="[
          'i-heroicons-chevron-right size-4 text-inherit transition-transform',
          isExpanded ? 'rotate-90' : '',
        ]"
      />
      <div class="i-heroicons-document-text text-inherit size-5 opacity-70" />
      <h1 class="font-semibold text-inherit">{{ name }}</h1>
    </button>

    <ClientOnly>
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-2"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-show="isExpanded">
          <div v-if="html" v-html="html" class="rounded-xl overflow-hidden" />
          <div v-else class="card p-4 text-gray-400 animate-pulse">
            Formatting code...
          </div>
        </div>
      </Transition>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { data, name, expanded } = defineProps({
  data: { type: String, required: true },
  name: { type: String, required: true },
  expanded: { type: Boolean, default: false },
});

const isExpanded = ref(expanded);
const html = ref<string>('');

// Move all processing to client-side
onMounted(async () => {
  const [prettier, { default: babel }, { default: estree }] = await Promise.all([
    import('prettier'),
    import('prettier/plugins/babel'),
    import('prettier/plugins/estree')
  ]);

  const formattedJson = await prettier.format(data, {
    parser: "json",
    printWidth: 80,
    tabWidth: 2,
    bracketSameLine: true,
    plugins: [babel, estree],
  });

  const highlighter = await getHighlighter();
  html.value = highlighter.codeToHtml(formattedJson, {
    lang: "json",
    theme: "premid-theme",
  });
});
</script>

<style>
  .code-block {
    max-width: 100%;
  }

  .code-block :deep(pre) {
    margin: 0 !important;
    background: rgba(13, 17, 23, 0.7) !important;
    border: 1px solid rgba(78, 62, 187, 0.2);
  }

  .code-block :deep(code) {
    display: block;
    padding: 1.25rem !important;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    tab-size: 2;
  }

  .code-block :deep(pre:hover) {
    border-color: #4b7bf7;
  }

  .code-block :deep(::-webkit-scrollbar) {
    height: 8px;
    background: transparent;
  }

  .code-block :deep(::-webkit-scrollbar-thumb) {
    background: rgba(75, 123, 247, 0.2);
    border-radius: 4px;
  }

  .code-block :deep(::-webkit-scrollbar-thumb:hover) {
    background: rgba(75, 123, 247, 0.4);
  }
</style>
