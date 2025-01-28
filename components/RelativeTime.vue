<template>
  <span>{{ relativeTime }}</span>
</template>

<script setup lang="ts">
  const { timestamp } = defineProps({
    timestamp: {
      type: Number,
      required: true, // A Unix timestamp (e.g., Date.now())
    },
  });

  const relativeTime = ref("");

  // Utility function to calculate relative time
  const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = timestamp - now;

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const seconds = Math.round(diff / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (Math.abs(seconds) < 60) return rtf.format(seconds, "seconds");
    if (Math.abs(minutes) < 60) return rtf.format(minutes, "minutes");
    if (Math.abs(hours) < 24) return rtf.format(hours, "hours");
    return rtf.format(days, "days");
  };

  // Update relative time initially and on a timer
  const updateRelativeTime = () => {
    relativeTime.value = getRelativeTime(timestamp);
    setDynamicInterval();
  };
  let intervalId: ReturnType<typeof setInterval> | undefined;

  // Set dynamic update interval based on the time difference
  const setDynamicInterval = () => {
    const now = Date.now();
    const diff = Math.abs(timestamp - now);

    let interval = 60000; // Default to 1 minute

    if (diff < 60000) {
      interval = 1000; // Update every second if less than a minute
    } else if (diff < 3600000) {
      interval = 60000; // Update every minute if less than an hour
    } else if (diff < 86400000) {
      interval = 3600000; // Update every hour if less than a day
    }

    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(updateRelativeTime, interval);
  };

  onMounted(() => {
    watch(() => timestamp, updateRelativeTime, { immediate: true });
    updateRelativeTime();
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>
