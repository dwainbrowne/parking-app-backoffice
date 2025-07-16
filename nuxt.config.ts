export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    public: {
      appName: 'Parking Enforcement Admin'
    }
  },
  nitro: {
    experimental: {
      wasm: true
    }
  },
  ssr: false
})