import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 30221,
  },
  head: {
    titleTemplate: "%s - incidents",
    title: "incidents",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:30222",
    proxy: true,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  proxy: {
    "/incident-management/": {
      target: "http://localhost:30222",
      pathRewrite: { "^/incident-management/": "" },
    },
    "/api-geteway/": {
      target: "https://api.development.agentsoncloud.com/external",
      pathRewrite: { "^/api-geteway/": "" },
    },
    "/user-management/": {
      target: "https://62270c622dfa52401812e5c0.mockapi.io",
      pathRewrite: { "^/user-management/": "" },
    },
    "/inventory-management/": {
      target: "https://62270c622dfa52401812e5c0.mockapi.io",
      pathRewrite: { "^/inventory-management/": "" },
    },
    "/facility-management/": {
      target: "https://62270c622dfa52401812e5c0.mockapi.io",
      pathRewrite: { "^/facility-management/": "" },
    },
    "/suppliers-management/": {
      target: "https://62270c622dfa52401812e5c0.mockapi.io",
      pathRewrite: { "^/suppliers-management/": "" },
    },
    "/comments/": {
      target: "https://api.tasks.agentsoncloud.com/",
      pathRewrite: { "^/comments/": "" },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
