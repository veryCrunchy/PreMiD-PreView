<script setup lang="ts">
  import type { Share } from "~/server/utils/db";

  const { share } = defineProps({
    share: { type: Object as PropType<Share>, required: true },
  });
  const { metadata } = share;
</script>

<template>
  <NuxtLink
    :to="`/${share.id}`"
    class="block rounded-xl lt-md:w-75 w-85 overflow-hidden shadow-lg text-gray-200 cursor-pointer no-underline transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
  >
    <!-- Service logo and thumbnail -->
    <div>
      <div
        class="bg-dark lt-md:h-32 h-36 rounded-inherit"
        :style="{
          background: `url(${metadata.thumbnail}) center center no-repeat`,
          backgroundSize: 'cover',
        }"
      >
        <div
          class="bg-#0d1117 bg-opacity-50 gap-5 h-full w-full flex items-center"
        >
          <img
            class="size-20 ml-10 rounded-md"
            :src="metadata.logo"
            alt="Service Logo"
          />
          <h1
            class="text-2xl font-semibold text-white"
            v-text="metadata.service"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col m-2.5">
      <!-- Service title and version -->

      <!-- Description -->
      <!-- <div>
        <p class="text-gray-800">
          {{
            metadata.description["en"] ??
            Object.entries(metadata.description)[0][1]
          }}
        </p>
      </div> -->

      <RelativeTime
        class="text-xs"
        :timestamp="new Date(share.timestamp).getTime()"
      />
      <hr />
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <img
            class="size-8 rounded-full mr-2.5"
            src="https://pfp.crun.zip"
            alt="Uploaded Pfp"
          />
          <div>
            <h2 class="text-sm font-semibold">verycrunchy</h2>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
