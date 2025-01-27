<script setup>
  defineProps(["metadata"]);
</script>

<template>
  <article class="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
    <div class="flex items-start sm:gap-x-8">
      <img :src="metadata.logo" class="size-10" alt="aa" />

      <div class="">
        <strong
          v-for="tag in metadata.tags"
          class="rounded border mr-2 border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
        >
          {{ tag }}
        </strong>

        <h3 class="text-lg font-medium sm:text-xl">
            {{metadata.service}}
        </h3>

        <p class="text-sm text-gray-700">
          {{ metadata.description.en }}
        </p>

        <div class="sm:flex sm:items-center sm:gap-2">
          <div
            class="flex items-center gap-1 text-xs font-medium text-gray-500"
          >
            <!-- <svg
              class="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            <p class="">48:32 minutes</p> -->

            <!-- <span class="hidden sm:block" aria-hidden="true">&middot;</span> -->

            <p>v{{ metadata.version }}</p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
