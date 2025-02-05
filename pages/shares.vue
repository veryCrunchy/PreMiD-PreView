<script setup>
const { data: shares } = useFetch("/api/share");
</script>

<template>
  <main class="mx-auto max-w-360 flex flex-col gap-8 w-4/5">
    <AppHeader status="CLOSED" />
    
    <section>
      <h1 class="text-3xl font-semibold mb-8 text-white">Recent Shares</h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActivityCard
          v-for="share in shares"
          :key="share.id"
          :share="share"
          class="card"
        />
      </div>
    </section>
  </main>
</template>
