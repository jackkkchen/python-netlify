// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineNuxtConfig({
  app: {
    baseURL: '/',
    buildAssetsDir: '_nuxt',
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
    sources: {
      content: {
        driver: 'fs',
        base: './content'
      }
    },
    documentDriven: true,
    navigation: {
      fields: ['title', 'description', 'layout']
    },
    experimental: {
      clientDB: true,
      stripQueryParameters: false
    },
    markdown: {
      anchorLinks: {
        depth: 2,
        exclude: [1]
      }
    }
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
      routes: [
        '/',
        '/python-zero',
        '/python-zero/1.preface',
        '/python-zero/1.preliminaries',
        '/python-zero/2.1python_basic',
        '/python-zero/2.2python_basic_II',
        '/python-zero/3.numpy',
        '/python-zero/4.pandas',
        '/python-zero/5.probability',
        '/python-zero/cursor_tutorial'
      ],
      crawlLinks: true
    },
    output: {
      dir: '.output',
      serverDir: '.output/server',
      publicDir: '.output/public'
    }
  },
  ssr: true
})
