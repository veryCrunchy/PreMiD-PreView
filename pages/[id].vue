<template>
  <div>
    <h1 class="text-2xl font-bold">Shared Content</h1>
    <div v-if="data" class="w-md">
      <CodeBlock :data="JSON.stringify(data.metadata)" />
    </div>
    <div v-if="error" class="text-red-500">Content not found!</div>
    <NuxtLink to="/" class="mt-4 inline-block text-blue-500 underline"
      >Go Back</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const { data, error } = await useFetch(`/api/share/${route.params.id}`);
</script>
