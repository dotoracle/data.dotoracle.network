<template>
  <div>
    <div v-if="this.type === 'modal'" class="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
      <div class="lh-1">
        <h1 class="h6 mb-0 text-white lh-1">
          Read from many main sources eg binance, huobi, chainlink oracle, DotOracle...
        </h1>
      </div>
    </div>

    <div class="my-3 p-3 bg-body rounded shadow-sm">
      <h6 class="border-bottom pb-2 mb-0">Exchanges</h6>
      <b-row>
        <b-col v-for="exchange in exchangePrice" :key="exchange.exchange" class="d-flex text-muted pt-3">
          {{ exchange.exchange }} <br />
          $ {{ formatNumber(hideDecimal(exchange.price)) }}
        </b-col>
      </b-row>
    </div>
    <div class="small">
      <div :id="'chart-' + token + '-' + type" style="height: 400px; min-width: 380px"></div>
    </div>
    <br />
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import moment from 'moment'

export default {
  props: {
    token: {
      type: String,
      default: '',
    },
    type: {
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
  components: {},
  async created() {
    await this.getTokenDetail()
    this.makeChart()
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
      console.log(this.historyPrice)
    },
    makeChart() {
      let elevationData = this.historyPrice

      Highcharts.chart(`chart-${this.token}-${this.type}`, {
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
