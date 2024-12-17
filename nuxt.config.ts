// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["@/assets/scss/style.scss"],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],

  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "th"
      },
      charset: "utf-8",
      titleTemplate: "อย.นครพนม",
      link: [

        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"
        },

        {
          rel: 'icon',
          type: 'image/x-icon',
          href: "/logo.png"
        }
      ],
      script: [
        // {
        //   src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&loading=async&libraries=marker`,
        // },
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=5'
        },
        {
          name: 'author',
          content: "Kitchanut Ruamboon and IE Advisor"
        }
      ]

    }
  }
})