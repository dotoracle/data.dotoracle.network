<template>
  <div>
    <TitleWrapper>
      <Title>{{ token.toUpperCase() }} Price Source</Title>
      <TitleShadow>{{ token.toUpperCase() }} Price Source</TitleShadow>
    </TitleWrapper>
    <SubTitle>Read from many main sources eg Binance, Huobi, Chainlink Oracle, DotOracle...</SubTitle>

    <h6>24h Changes</h6>
    <ExchangeRow>
      <Exchange v-for="exchange in exchangePrice" :key="exchange.exchange">
        <img :src="require(`@/assets/images/exchange/${exchange.exchange}.png`)" />
        <Price>$ {{ formatNumber(hideDecimal(exchange.price)) }}</Price>
      </Exchange>
    </ExchangeRow>

    <div class="small">
      <div :id="'chart-' + token" style="height: 400px; min-width: 380px"></div>
    </div>
    <br />
  </div>
</template>

<script>
import styled from 'vue-styled-components'
import Highcharts from 'highcharts'
import moment from 'moment'

const TitleWrapper = styled.div`
  position: relative;
`
const Title = styled.h2`
  position: relative;
  z-index: 2;
  line-height: 1.5;
  font-family: MarketSans, sans-serif;
  font-size: 30px;
  color: #fff;
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
    margin-top: 3px;
    margin-left: 3px;
  }
`
const SubTitle = styled.p`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`
const ExchangeRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
const Exchange = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('${require('../assets/images/exchange/exchange-bg.png')}');
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 0.5rem;
  width: 12%;
  text-align: center;
  min-height: 100px;

  img {
    width: 80%;
    height: 40px;
    object-fit: contain;
  }
`
const Price = styled.div`
  display: block;
  font-size: 16px;
  font-weight: 700;
`

export default {
  props: {
    token: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentPrice: 0,
      exchangePrice: [],
      historyPrice: [],
    }
  },
  components: {
    TitleWrapper,
    Title,
    TitleShadow,
    SubTitle,
    ExchangeRow,
    Exchange,
    Price,
  },
  async created() {
    const loading = this.$vs.loading({
      type: 'scale',
      text: 'Loading...',
    })
    await this.getTokenDetail()
    this.makeChart()
    loading.close()
  },
  methods: {
    async getTokenDetail() {
      let url = 'https://api-token-price.dotoracle.network/tokens/' + this.token
      let token = await this.axios.get(url)
      this.currentPrice = token.data.price.price

      let history = token.data.history
      let data = []
      for (let i = history.length - 1; i >= 0; i--) {
        data.push([
          moment(history[i].timestamp * 1000).format('ddd Do MMM YYYY HH:mm'),
          this.hideDecimal(history[i].price),
        ])
      }
      this.historyPrice = data
      this.exchangePrice = token.data.allExchangePrice
    },
    makeChart() {
      let elevationData = this.historyPrice

      Highcharts.chart(`chart-${this.token}`, {
        chart: {
          styledMode: true,
          type: 'area',
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
        },

        title: {
          text: this.token.toUpperCase() + ' price history',
        },

        xAxis: {
          labels: {
            enabled: false,
          },
        },

        yAxis: {
          startOnTick: true,
          endOnTick: false,
          maxPadding: 0.35,
          title: {
            text: null,
          },
          labels: {
            format: '$ {value}',
          },
        },

        legend: {
          enabled: false,
        },

        series: [
          {
            data: elevationData,
            name: 'Price',
            marker: {
              enabled: false,
            },
            threshold: null,
          },
        ],
      })
    },
  },
}
</script>
