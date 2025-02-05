<template>
  <header class="mb-8 mt-5 sticky top-5 z-100">
    <div class="bg-[#171322]/95 backdrop-blur-md border border-[#4b7bf7]/20 rounded-xl flex items-center justify-between p-4 shadow-lg shadow-[#4b7bf7]/5">
      <NuxtLink 
        to="/" 
        class="text-white no-underline font-semibold flex items-center gap-3 text-lg hover:text-[#7742fd] transition-colors"
      >
        <div class="i-heroicons-swatch size-6 text-[#7742fd]" />
        PreMiD PreView
      </NuxtLink>

      <ClientOnly>
        <div class="flex items-center gap-6">
          <div
            :class="[
              statusClass,
              'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border border-white/5 transition-colors'
            ]"
          >
            <div :class="[
              'size-2 rounded-full',
              status === 'OPEN' ? 'bg-[#4b7bf7]' : 
              status === 'CONNECTING' ? 'bg-[#7742fd] animate-pulse' : 
              'bg-[#771141]'
            ]" />
            <span>{{ status }}</span>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="h-5 w-px bg-[#4b7bf7]/10" />
            <NuxtLink 
              to="/shares"
              class="text-gray-200 hover:text-[#4b7bf7] transition-colors flex items-center gap-2 text-sm no-underline group"
            >
              <div class="i-heroicons-rectangle-stack size-5 group-hover:scale-110 transition-transform" />
              Browse Shares
            </NuxtLink>
          </div>
        </div>
      </ClientOnly>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: 'OPEN' | 'CONNECTING' | 'CLOSED'
}>();

const statusClass = computed(() => ({
  'bg-[#4b7bf7]/10 text-[#4b7bf7]': props.status === 'OPEN',
  'bg-[#7742fd]/10 text-[#7742fd]': props.status === 'CONNECTING',
  'bg-[#771141]/10 text-gray-400': props.status === 'CLOSED',
}));
</script>
