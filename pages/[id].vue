<template>
  <div class="mx-auto max-w-5xl flex flex-col gap-5 w-4/5" v-if="data">
    <NuxtLink to="/" class="mt-4 inline-block text-blue-500 underline"
      >Go Back</NuxtLink
    >

    <div
      class="bg-dark h-52 rounded-lg"
      :style="{
        background: `url(${data.metadata.thumbnail}) center center no-repeat`,
        backgroundSize: 'cover',
      }"
    >
      <div
        class="bg-#0d1117 rounded-inherit gap-10 bg-opacity-50 h-full w-full flex items-center"
      >
        <img
          class="h-20 w-20 ml-1/8 rounded-md"
          :src="data.metadata.logo"
          alt="Service Logo"
        />
        <h1
          class="text-2xl font-semibold text-white"
          v-text="data.metadata.service"
        />
      </div>
    </div>
    <div class="flex gap-5">
      <div class="w-0 flex-[2] flex flex-col gap-5">
        <div class="bg-neutral-950 h-sm rounded-md p-5">
          <h1 class="text-white font-bold text-lg">About Share</h1>
        </div>

        <CodeBlock name="metadata.json" :data="JSON.stringify(data.metadata)" />
      </div>
      <div class="bg-neutral-950 flex flex-col rounded-lg h-md p-5 flex-[.8]">
        <h1 class="text-white font-bold text-lg">About Activity</h1>
        <ul class="space-y-4">
          <li>
            <h2>Description</h2>
            <p v-text="data.metadata.description.en" />
          </li>
          <li>Author</li>
          <li>Contributors</li>
          <li>Version</li>
          <li>Supported Urls</li>
        </ul>
        <button class="mt-auto">a</button>
      </div>
    </div>
  </div>
  <div v-if="error" class="text-red-500">Content not found!</div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const { data, error } = await useFetch(`/api/share/${route.params.id}`);
</script>
