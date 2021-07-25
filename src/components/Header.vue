<template>
  <DTO-header>
    <header-wrapper>
      <a class="navbar-brand" href="/" rel="noreferrer">
        <logo-desktop>
          <img src="../assets/images/logo.png" alt="Logo" width="236px" />
        </logo-desktop>
        <logo-mobile>
          <img src="/assets/images/logo-mobile.png" alt="Logo" height="40px" />
        </logo-mobile>
      </a>
      <main-menu>
        <menu-item>
          <menu-link href="https://bridge.dotoracle.network" target="_blank" rel="nofollow">Bridge</menu-link>
        </menu-item>
        <menu-item>
          <menu-link href="https://swap.dotoracle.network" target="_blank" rel="nofollow">Pegged Swap</menu-link>
        </menu-item>
      </main-menu>
    </header-wrapper>
  </DTO-header>
</template>

<script>
import styled from 'vue-styled-components'

const DTOHeader = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px;
  min-height: 80px;
  background-color: ${props => props.theme.purple100};
`
const HeaderWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  max-width: 80rem;
`
const LogoDesktop = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`
const LogoMobile = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`
const MainMenu = styled.nav`
  display: flex;
  align-items: center;
`
const MenuItem = styled.div`
  position: relative;
  padding: 0 20px;
`
const MenuLink = styled.a`
  position: relative;
  text-transform: uppercase;
  font-weight: 500;
  color: #fff;

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 0;
    height: 2px;
    transition: all 400ms ease;
    background-color: ${props => props.theme.primary};
  }
  &:hover {
    color: ${props => props.theme.primary};
    &::before {
      width: 100%;
    }
  }
`

export default {
  name: 'Header',
  components: {
    DTOHeader,
    HeaderWrapper,
    LogoDesktop,
    LogoMobile,
    MainMenu,
    MenuItem,
    MenuLink,
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>
