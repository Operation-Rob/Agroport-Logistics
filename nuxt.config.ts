// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      mapboxToken: process.env.MAPBOX_TOKEN || ""
    }
  },
  css: [
    '@/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" }
      ]
    }
  }
})
