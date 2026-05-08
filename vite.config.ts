import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/bison-sheds-2-pathways/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        customSheds: resolve(__dirname, 'custom-sheds/index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        agriculturalSheds: resolve(__dirname, 'agricultural-sheds/index.html'),
        whyBison: resolve(__dirname, 'why-bison/index.html'),
        shedKits: resolve(__dirname, 'shed-kits/index.html'),
        theBisonProcess: resolve(__dirname, 'the-bison-process/index.html'),
      }
    }
  }
})
