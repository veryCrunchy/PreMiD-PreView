<template>
  <div class="mx-auto max-w-360 flex flex-col gap-5 w-4/5 my-20" v-if="data">
    <NuxtLink
      to="/"
      class="text-gray-200 hover:text-[#4b7bf7] transition-colors no-underline flex items-center gap-2"
    >
      <div class="i-heroicons-arrow-left text-xl" />
      Back to Overview
    </NuxtLink>

    <div class="card relative group">
      <!-- Banner Image with Gradient Overlay -->
      <div
        class="h-52 w-full"
        :style="{
          background: `url(${data.metadata.thumbnail}) center center no-repeat`,
          backgroundSize: 'cover',
        }"
      >
        <!-- Site-styled Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent opacity-90">
          <div class="absolute inset-0 bg-[#4b7bf7] mix-blend-overlay opacity-5"></div>
        </div>
        
        <!-- Content Container -->
        <div class="relative h-full z-10">
          <div class="flex items-center h-full px-8 gap-8">
            <!-- Service Logo -->
            <img
              class="size-20 rounded-lg border border-white/10"
              :src="data.metadata.logo"
              alt="Service Logo"
            />

            <!-- Service Info -->
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-white">
                {{ data.metadata.service }}
              </h1>
            </div>
            
            <!-- Action Button -->
            <button class="card hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 transition-all px-6 py-3 text-white font-medium flex items-center gap-2">
              <div class="i-heroicons-plus-circle size-5" />
              Add to PreMiD
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-5">
      <div class="w-0 flex-[2] flex flex-col gap-5">
        <div class="card p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-white font-semibold text-xl">About Share</h2>
            
            <!-- Revision Controls -->
            <div class="flex items-center gap-2">
              <button 
                class="card px-3 py-1.5 text-gray-200 hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                :disabled="!canGoPrevious"
                @click="currentRevision--"
              >
                <div class="i-heroicons-arrow-left size-4" />
                Previous
              </button>

              <div class="card px-3 py-1.5 text-gray-200 flex items-center gap-2 bg-white/5">
                <div class="i-heroicons-clock size-4 opacity-70" />
                <span>Revision {{ currentRevision }} of {{ totalRevisions }}</span>
              </div>

              <button 
                class="card px-3 py-1.5 text-gray-200 hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                :disabled="!canGoNext"
                @click="currentRevision++"
              >
                Next
                <div class="i-heroicons-arrow-right size-4" />
              </button>
            </div>
          </div>

          <!-- Share info can go here -->
        </div>

        <!-- Separated Code Block -->
        <CodeBlock
          name="metadata.json"
          :data="JSON.stringify(data.metadata, null, 2)"
        />
      </div>

      <div class="card p-5 flex flex-col flex-[.8]">
        <h2 class="text-white font-semibold text-xl mb-4">About Activity</h2>
        <ul class="space-y-6 text-gray-200">
          <!-- Main Info -->
          <li>
            <h3 class="font-semibold text-lg mb-3 text-white/90">
              Description
            </h3>
            <p v-text="data.metadata.description.en" class="text-gray-300" />
          </li>

          <!-- Technical Info -->
          <li class="bg-black/10 rounded-lg p-4">
            <h3 class="font-semibold text-lg mb-3 text-white/90">
              Technical Details
            </h3>
            <div class="space-y-3">
              <div>
                <h4 class="text-sm font-medium text-gray-400">Version</h4>
                <p class="text-gray-200">{{ data.metadata.version }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-400">Category</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span
                    class="text-gray-200 bg-purple-500/20 px-2 py-0.5 rounded"
                  >
                    {{ data.metadata.category }}
                  </span>
                  <span
                    v-for="tag in data.metadata.tags"
                    :key="tag"
                    class="text-xs bg-purple-500/10 px-2 py-0.5 rounded text-gray-300"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </li>

          <!-- URLs -->
          <li class="bg-black/10 rounded-lg p-4">
            <h3 class="font-semibold text-lg mb-3 text-white/90">
              Supported URLs
            </h3>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="url in data.metadata.url"
                :key="url"
                :to="`https://${url}`"
                target="_blank"
                class="text-gray-200 bg-purple-500/10 px-3 py-1.5 rounded-full text-sm hover:bg-purple-500/20 transition-colors flex items-center gap-2"
              >
                {{ url }}
                <div
                  class="i-heroicons-arrow-top-right-on-square size-4 opacity-70"
                />
              </NuxtLink>
            </div>
          </li>

          <!-- Credits -->
          <li class="bg-black/10 rounded-lg p-4">
            <h3 class="font-semibold text-lg mb-3 text-white/90">Credits</h3>
            <div class="space-y-4">
              <!-- Author -->
              <div>
                <h4 class="text-sm font-medium text-gray-400 mb-2">Author</h4>
                <div class="flex items-center gap-2 text-gray-200">
                  <span>{{ data.metadata.author.name }}</span>
                  <span class="text-xs bg-white/5 px-2 py-0.5 rounded-full">{{
                    data.metadata.author.id
                  }}</span>
                </div>
              </div>

              <!-- Contributors -->
              <div v-if="data.metadata.contributors?.length">
                <h4 class="text-sm font-medium text-gray-400 mb-2">
                  Contributors
                </h4>
                <div class="flex flex-col gap-2">
                  <div
                    v-for="contributor in data.metadata.contributors"
                    :key="contributor.id"
                    class="flex items-center gap-2 text-gray-200"
                  >
                    <span>{{ contributor.name }}</span>
                    <span class="text-xs bg-white/5 px-2 py-0.5 rounded-full">{{
                      contributor.id
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-if="error" class="text-red-500 text-center my-20">
    Content not found!
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const { data, error } = await useFetch(`/api/share/${route.params.id}`);
  
  // Mock data for revisions - replace with actual data
  const currentRevision = ref(1);
  const totalRevisions = 3;

  const canGoPrevious = computed(() => currentRevision.value > 1);
  const canGoNext = computed(() => currentRevision.value < totalRevisions);
</script>

<style scoped>
.card {
  @apply rounded-xl;
  background: rgba(75, 123, 247, 0.05);
  box-shadow: 0 4px 30px rgba(119, 66, 253, 0.1);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  border: 1px solid rgba(78, 62, 187, 0.2);
  overflow: hidden;
}
</style>
