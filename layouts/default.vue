<template>
  <div class="min-h-screen line-height-tight">
    <Blobs class="op-50 brightness-70" />
    <slot />
  </div>
</template>

<style>
  body {
    background: #2a1141;
    /* background: linear-gradient(135deg, #120f1a 0%, #2a1141 50%, #2e1f57 100%);
    background-attachment: fixed; */
  }
</style>
