<template>
  <theme-provider
    :theme="{
      primary: '#e2007a',
      purple100: '#3b0899',
      purple200: '#470fac',
    }"
  >
    <div id="app" class="bg-light">
      <Header></Header>

      <main class="container">
        <router-view />
      </main>
    </div>
  </theme-provider>
</template>

<script>
import Header from './components/Header'
import { ThemeProvider } from 'vue-styled-components'

export default {
  components: {
    Header,
    'theme-provider': ThemeProvider,
  },
}
</script>
