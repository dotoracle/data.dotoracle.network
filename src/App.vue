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
      <MainWrapper>
        <Container>
          <router-view />
        </Container>
      </MainWrapper>
      <Footer />
    </div>
  </theme-provider>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from 'vue-styled-components'
import styled from 'vue-styled-components'

const MainWrapper = styled.div`
  background-image: url('${require('./assets/images/page-bg.png')}');
  background-size: cover;
  background-attachment: fixed;
  padding-top: 3rem;
  padding-bottom: 3rem;
  min-height: calc(100vh - 160px - 6rem);
}
`
const Container = styled.div`
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 1280px;
`

export default {
  components: {
    'theme-provider': ThemeProvider,
    Header,
    MainWrapper,
    Container,
    Footer,
  },
}
</script>
