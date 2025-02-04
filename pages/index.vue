<script setup>
  import { ClientOnly } from "#components";

  const { loggedIn, user, session, fetch, clear } = useUserSession();
  let pmd = usePMD();
  if (loggedIn) {
  }
  async function createShare() {
    if (!pmd.files.value) return;

    const { data } = useFetch("/api/share", {
      method: "POST",
      body: { files: pmd.files.value, metadata: pmd.metadata.value },
    });
  }

  // Fetch existing shares (optional, for debugging)
  const { data: shares } = useFetch("/api/share");
  const statusClass = computed(() => ({
    "bg-green": pmd.status.value === "OPEN",
    "bg-yellow": pmd.status.value === "CONNECTING",
    "bg-red": pmd.status.value === "CLOSED",
  }));
</script>

<template>
  <main class="mx-auto max-w-360 flex flex-col gap-5 w-4/5">
    <ClientOnly>
      {{ pmd }}
      {{ user }}
      <div
        :class="statusClass"
        class="flex p-2 px-4 w-min items-center transition-all justify-center rounded-full"
      >
        <Transition name="status-transition">
          <span v-if="pmd.status.value === 'OPEN'">CONNECTED</span>
          <span
            v-else-if="pmd.status.value === 'CONNECTING'"
            class="animate-pulse rounded-full"
          >
            CONNECTING
          </span>
          <span v-else-if="pmd.status.value === 'CLOSED'">DISCONNECTED</span>
        </Transition>
      </div>
    </ClientOnly>

    <ActivityCard
      class="card"
      v-if="pmd.metadata.value"
      :metadata="pmd.metadata.value"
    >
    </ActivityCard>
    <button @click="createShare">Upload</button>
    <div class="flex gap-5">
      <ActivityCard
        class="card"
        v-for="share in shares"
        :key="share.id"
        :share="share"
      />
    </div>
  </main>
</template>
<style>
  .card {
    background: rgba(75, 123, 247, 0.05);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(119, 66, 253, 0.1);
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);
    border: 1px solid rgba(78, 62, 187, 0.2);
    @apply hover:border-[#4b7bf7] transition-all duration-300 ease-out;
    position: relative;
  }

  .card hr {
    border: 0;
    display: block;
    width: 100%;
    background-color: rgba(75, 123, 247, 0.2);
    height: 1px;
    border-radius: 4px;
  }

  .status-transition-enter-active,
  .status-transition-leave-active {
    transition: all 0.5s ease;
  }
  .status-transition-enter-from,
  .status-transition-leave-to {
    opacity: 0;
    width: 0;
    transform: scale(0);
  }

  .bg-green {
    background-color: rgba(75, 123, 247, 0.8);
  }
  .bg-yellow {
    background-color: rgba(119, 66, 253, 0.8);
  }
  .bg-red {
    background-color: rgba(42, 17, 65, 0.8);
  }
</style>
