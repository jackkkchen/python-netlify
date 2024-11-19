// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineNuxtConfig({
  app: {
    baseURL: '/learn-from-zero/',
    buildAssetsDir: 'assets',
  },
  devServer: {
    port: 3002
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content', 
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/color-mode', 
    '@pinia/nuxt'
  ],
  build: {
    transpile: ['mermaid']
  },
  css: [
    'katex/dist/katex.min.css'
  ],
  content: {
    markdown: {
      toc: { depth: 2, searchDepth: 2 },
      remarkPlugins: {
        'remark-math': {
          singleDollar: true
        }
      },
      rehypePlugins: {
        'rehype-katex': {}
      }
    },
    highlight: {
      langs: ['py', 'js'],
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
        light: 'github-light',
      }
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode'
  },
  nitro: {
    preset: 'netlify',
    prerender: {
      routes: ['/user/1', '/user/2'],
      ignore: ['/dynamic'],
      crawlLinks: true
    }
  },
  ssr: false
})