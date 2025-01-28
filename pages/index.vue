<template>
  {{ pmd.files.value.length }}
  <div
    :class="{
      'bg-green': pmd.status.value === 'OPEN',
      'bg-yellow': pmd.status.value === 'CONNECTING',
      'bg-red': pmd.status.value === 'CLOSED',
    }"
    class="flex p-2 px-4 w-min items-center justify-center rounded-full"
  >
    <div class="">
      <span v-if="pmd.status.value === 'OPEN'">CONNECTED</span>
      <span
        v-if="pmd.status.value === 'CONNECTING'"
        class="badge badge-blue animate-pulse rounded-full"
        >CONNECTING</span
      >
      <span v-if="pmd.status.value === 'CLOSED'">DISCONNECTED</span>
    </div>
  </div>
  <ActivityCard
    class="card"
    v-if="pmd.metadata.value"
    :metadata="pmd.metadata.value"
  >
    <button @click="createShare">Upload</button>
  </ActivityCard>
  {{ shares }}
  <NuxtPage />
</template>
<style>
  body {
    background: #a487e6;
    background: linear-gradient(90deg, #a487e6, #f2bfe3);
    backdrop-filter: blur(5px);
  }

  .card {
    background: rgba(22, 1, 1, 0.19);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.2px);
    -webkit-backdrop-filter: blur(6.2px);
    border: 1px solid rgba(48, 30, 30, 0.3);
  }
</style>

<script setup>

  const pmd = usePMD();
  const shares = ref([]);

  async function createShare() {
    if (!pmd.files.value) return;

    const { data } = await useFetch("/api/share", {
      method: "POST",
      body: { files: pmd.files.value, metadata: pmd.metadata.value },
    });
  }

  // Fetch existing shares (optional, for debugging)
  async function fetchShares() {
    const { data } = await useFetch("/api/share");
    shares.value = data.value || [];
  }
  fetchShares();
</script>
