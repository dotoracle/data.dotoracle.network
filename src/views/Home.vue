<template>
  <div>
    <!-- <List></List> -->
    <TitleWrapper>
      <Title>Cryptocurrency (USD pairs) Data Feeds</Title>
      <TitleShadow>Cryptocurrency (USD pairs) Data Feeds</TitleShadow>
    </TitleWrapper>
    <SubTitle>Explore the decentralized oracle networks powered by DotOracle</SubTitle>
  </div>
</template>

<script>
import List from '../components/List'
import styled from 'vue-styled-components'

const TitleWrapper = styled.div`
  position: relative;
`
const Title = styled.h1`
  position: relative;
  z-index: 2;
  line-height: 1.5;
  font-family: MarketSans, sans-serif;
  font-size: 30px;
  color: #fff;
  @media (min-width: 768px) {
    font-size: 50px;
  }
`
const TitleShadow = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  margin-top: 2px;
  margin-left: 2px;
  transform: translate(-50%);
  z-index: 1;
  width: 100%;
  line-height: 1.5;
  font-family: MarketSans, sans-serif;
  font-size: 30px;
  color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff9100;
  @media (min-width: 768px) {
    font-size: 50px;
    margin-top: 3px;
    margin-left: 3px;
  }
`
const SubTitle = styled.p`
  margin-top: 1rem;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`

export default {
  name: 'Home',
  components: {
    TitleWrapper,
    Title,
    TitleShadow,
    SubTitle,
    List,
  },
}
</script>
