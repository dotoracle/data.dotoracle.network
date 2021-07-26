<template>
  <DTO-header>
    <HeaderWrapper>
      <HeaderSection>
        <a href="/" rel="noreferrer">
          <img src="../assets/images/logo.png" alt="Logo" width="236px" />
        </a>
        <MainMenu>
          <MenuItem>
            <MenuLink href="https://bridge.dotoracle.network" target="_blank" rel="nofollow">Bridge</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="https://swap.dotoracle.network" target="_blank" rel="nofollow">Pegged Swap</MenuLink>
          </MenuItem>
        </MainMenu>
      </HeaderSection>
      <HeaderSection>
        <MobileToggle @click="showMobileMenu = !showMobileMenu">
          <v-icon name="pr-bars" scale="1.5" />
        </MobileToggle>
      </HeaderSection>
    </HeaderWrapper>
    <MobileMenu v-show="showMobileMenu">
      <MobileMenuItem>
        <MenuLink href="https://bridge.dotoracle.network" target="_blank" rel="nofollow">Bridge</MenuLink>
      </MobileMenuItem>
      <MobileMenuItem>
        <MenuLink href="https://swap.dotoracle.network" target="_blank" rel="nofollow">Pegged Swap</MenuLink>
      </MobileMenuItem>
    </MobileMenu>
  </DTO-header>
</template>

<script>
import styled from 'vue-styled-components'
import OhVueIcon from 'oh-vue-icons'
import { PrBars } from 'oh-vue-icons/icons'
OhVueIcon.add(PrBars)

const DTOHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px;
  min-height: 80px;
  background-color: ${props => props.theme.purple100};
`
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  max-width: 80rem;
`
const HeaderSection = styled.div`
  display: flex;
  color: #fff;
`
const MainMenu = styled.nav`
  display: none;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
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
const MobileToggle = styled.span`
  color: #fff;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`
const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  background-color: ${props => props.theme.purple100};
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  color: #fff;

  @media (min-width: 768px) {
    display: none;
  }
`
const MobileMenuItem = styled.div`
  padding: 1rem;
`

export default {
  name: 'Header',
  components: {
    DTOHeader,
    HeaderWrapper,
    HeaderSection,
    MainMenu,
    MenuItem,
    MenuLink,
    MobileToggle,
    MobileMenu,
    MobileMenuItem,
    'v-icon': OhVueIcon,
  },
  data() {
    return {
      showMobileMenu: false,
    }
  },
}
</script>
