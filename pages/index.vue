<script setup>
  const pmd = usePMD();
  const { loggedIn, user, session, fetch, clear } = useUserSession()
  async function createShare() {
    if (!pmd.files.value) return;

    const { data } = useFetch("/api/share", {
      method: "POST",
      body: { files: pmd.files.value, metadata: pmd.metadata.value },
    });
  }

  // Fetch existing shares (optional, for debugging)
  const { data: shares } = useFetch("/api/share");
</script>

<template>
  <main class="mx-5vw">
    {{ pmd.files.value.length }}
    {{user}}
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
    <div class="flex gap-5 overflow-x-scroll">
      <ActivityCard class="card" v-for="share in shares" :share="share">
      </ActivityCard>
    </div>
  </main>
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

  .card hr {
    border: 0;
    display: block;
    width: 100%;
    background-color: rgba(48, 30, 30, 0.5);
    height: 1px;
    border-radius: 4px;
  }
</style>
