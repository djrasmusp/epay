// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  routeRules: {
    "/": { prerender: true },
    "/test/client" : {
      prerender: true,
      experimentalNoScripts: true
    }
  },
  runtimeConfig: {
    public : {
      merchantNumber: process.env.MERCHANT_NUMBER,
      siteUrl: process.env.SITE_URL,
      md5key: process.env.MD5_KEY
    }
  }
})
