<template>
  <span>{{ relativeTime }}</span>
</template>

<script setup lang="ts">
  const { timestamp, updateInterval } = defineProps({
    timestamp: {
      type: Number,
      required: true, // A Unix timestamp (e.g., Date.now())
    },
    updateInterval: {
      type: Number,
      default: 60000, // Default update interval in milliseconds (e.g., every minute)
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
  };

  // Watch for changes in the `timestamp` prop
  watch(() => timestamp, updateRelativeTime, { immediate: true });

  // Timer for automatic updates
  let intervalId: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    updateRelativeTime();
    intervalId = setInterval(updateRelativeTime, updateInterval);
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>
