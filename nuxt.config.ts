// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      mapboxToken: process.env.MAPBOX_TOKEN || ""
    }
  },
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
