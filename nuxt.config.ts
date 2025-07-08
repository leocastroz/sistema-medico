// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    abacateKey: process.env.ABACATE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
  supabase: {
    redirect: false
  },
  devtools: { enabled: false },
  modules: ['@nuxtjs/supabase', 'nuxt-toastify'],
  plugins: ['~/plugins/event-bus.js'],
  toastify: {
    autoClose: 2000,
    position: 'top-right',
    theme: 'auto',
  },
})
