// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@unocss/reset/normalize.css", "@unocss/reset/eric-meyer.css"],
  modules: ["@unocss/nuxt", "@vueuse/nuxt"],
});
