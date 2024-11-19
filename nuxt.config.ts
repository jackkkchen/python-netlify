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
    documentDriven: true,
    navigation: {
      fields: ['title', 'description']
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
        '/python-zero/1.Preliminaries',
        '/python-zero/2.1python_basic',
        '/python-zero/2.2python_basic_II',
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
  ssr: false
})