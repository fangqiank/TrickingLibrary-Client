import colors from 'vuetify/es5/util/colors'
import path from 'path'
import fs from 'fs'

const config = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  publicRuntimeConfig:{
    auth:{
      loginPath: process.env.LOGIN_PATH,
      logoutPath: process.env.LOGOUT_PATH
    },

    axios:{
      baseURL: process.env.BROWSER_SIDE_URL,
      https: true
    }
  },

  privateRuntimeConfig:{
    axios:{
      baseURL: "http://localhost:5000",
      https:false
    }
  },

  server:{
    https:{
      key: fs.readFileSync(path.relative(__dirname,'server.key')),
      cert: fs.readFileSync(path.relative(__dirname,'server.cert'))
    }
  },

  head: {
    titleTemplate: '%s - Tricking Library',
    title: 'Welcome',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //{src: '~/plugins/clientInit.js', mode:'client'} //Oidc-clint to connect identity server4
    "~/plugins/axios"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    //customVariables: ['~/assets/css/main.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config,ctx){

    }
  }
}

if(process.env.NODE_ENV === 'development'){
  config.server = {
    https:{
      key: fs.readFileSync(path.relative(__dirname,'server.key')),
      cert: fs.readFileSync(path.relative(__dirname,'server.cert'))
    }
  }
}

export default config




