<template>
  <DTO-footer>
    <FooterWrapper>
      <CopyrightText>Copyright &copy; {{ new Date().getFullYear() }} DotOracle</CopyrightText>
      <SocialLinks>
        <SocialItem>
          <a href="https://t.me/dotoracle" target="_blank" rel="nofollw noreferrer noopener">
            <v-icon name="fa-telegram-plane" scale="1.5" />
          </a>
        </SocialItem>
        <SocialItem>
          <a href="https://twitter.com/DotOracle" target="_blank" rel="nofollw noreferrer noopener">
            <v-icon name="fa-twitter" scale="1.5" />
          </a>
        </SocialItem>
        <SocialItem>
          <a href="https://github.com/dotoracle" target="_blank" rel="nofollw noreferrer noopener">
            <v-icon name="fa-github" scale="1.5" />
          </a>
        </SocialItem>
      </SocialLinks>
    </FooterWrapper>
  </DTO-footer>
</template>

<script>
import styled from 'vue-styled-components'
import OhVueIcon from 'oh-vue-icons'
import { FaTelegramPlane, FaTwitter, FaGithub } from 'oh-vue-icons/icons'

const DTOFooter = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: ${props => props.theme.purple200};
  padding-top: 1rem;
  padding-bottom: 0.875rem;
  min-height: 80px;
`
const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  max-width: 80rem;
  color: #fff;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`
const CopyrightText = styled.p`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`
const SocialLinks = styled.ul`
  @media (min-width: 768px) {
    text-align: right;
  }
`
const SocialItem = styled.li`
  display: inline-block;
  vertial-align: middle;
  margin-right: 2rem;
  @media (min-width: 768px) {
    margin-right: 0;
    margin-left: 2rem;
  }
  a {
    color: #fff;
    transition: 0.5s ease all;
    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`
OhVueIcon.add(FaTelegramPlane, FaTwitter, FaGithub)

export default {
  name: 'Footer',
  components: {
    DTOFooter,
    FooterWrapper,
    CopyrightText,
    SocialLinks,
    SocialItem,
    'v-icon': OhVueIcon,
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>
