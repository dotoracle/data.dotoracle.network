<template>
  <theme-provider
    :theme="{
      primary: '#e2007a',
      purple100: '#3b0899',
      purple200: '#470fac',
    }"
  >
    <div id="app" class="bg-light">
      <Header />
      <main class="container">
        <router-view />
      </main>
      <Footer />
    </div>
  </theme-provider>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from 'vue-styled-components'

export default {
  components: {
    Header,
    'theme-provider': ThemeProvider,
    Footer,
  },
}
</script>
