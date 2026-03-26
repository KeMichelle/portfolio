// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      titleTemplate: '%s · Michelle Aprile',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'theme-color',
          content: '#fff6f4',
        },
        {
          name: 'description',
          content:
            'A dreamy Nuxt portfolio for creative development, styling work, and visual storytelling.',
        },
      ],
    },
  },
});
