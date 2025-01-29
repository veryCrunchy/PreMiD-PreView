<script setup lang="ts">
  import type { Share } from "~/server/utils/db";

  const { share } = defineProps({
    share: { type: Object as PropType<Share>, required: true },
  });
  const { metadata } = share;
</script>

<template>
  <main
    class="rounded-xl max-w-sm rounded overflow-hidden shadow-lg text-gray-800 ring ring-indigo-50"
  >
    <!-- Service logo and thumbnail -->
    <img
      class="w-full h-36 object-cover"
      :src="metadata.thumbnail"
      alt="Service Thumbnail"
    />

    <div class="px-4 my-4 gap-2 flex flex-col">
      <!-- Service title and version -->
      <div class="flex items-center">
        <img
          class="size-15 rounded-md mr-3"
          :src="metadata.logo"
          alt="Service Logo"
        />
        <div>
          <h2 class="text-xl font-semibold">
            {{ metadata.service }}
          </h2>
          <p class="text-sm text-gray-800">Version {{ metadata.version }}</p>
        </div>
      </div>

      <!-- Description -->
      <div>
        <p class="text-gray-800">
          {{
            metadata.description["en"] ??
            Object.entries(metadata.description)[0][1]
          }}
        </p>
      </div>

      <hr />
      <div class="flex items-center">
        <img
          class="size-15 rounded-md mr-3"
          src="https://pfp.crun.zip"
          alt="Uploaded Pfp"
        />
        <div>
          <h2 class="text-xl font-semibold">Uploader Name</h2>
          <RelativeTime :timestamp="new Date().getTime()" />
        </div>
      </div>

      <NuxtLink class="h-4 w-20 bg-white rounded-md border-solid" :to="`/${share.id}`">
      </NuxtLink>
    </div>
  </main>
</template>
