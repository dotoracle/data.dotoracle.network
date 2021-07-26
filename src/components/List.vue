<template>
  <TableWrapper>
    <vs-table>
      <template #header>
        <vs-input v-model="search" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="items = $vs.sortData($event, items, 'token')">Token</vs-th>
          <vs-th sort @click="items = $vs.sortData($event, items, 'price')">Price</vs-th>
          <vs-th sort @click="items = $vs.sortData($event, items, 'timestamp')">Last updated</vs-th>
          <vs-th>Actions</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(tr, i) in $vs.getPage($vs.getSearch(items, search), page, max)" :data="tr">
          <vs-td>
            <img :src="getImgUrl(tr.token)" height="24px" />
            {{ tr.token.toUpperCase() }}
          </vs-td>
          <vs-td>${{ formatNumber(hideDecimal(tr.price)) }}</vs-td>
          <vs-td>
            {{ formatAge(tr.timestamp * 1000) }}
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(items, search), max)" />
      </template>
    </vs-table>
  </TableWrapper>
</template>

<script>
import TokenDetail from '../components/TokenDetail'
import styled from 'vue-styled-components'

const TableWrapper = styled.div`
  background-color: #1e2023;
  border-radius: 1.5rem;
  box-shadow: 0 0 12px ${props => props.theme.primary}69;
  text-align: center;
`

export default {
  components: {
    TokenDetail,
    TableWrapper,
  },
  data() {
    return {
      search: '',
      items: [],
      page: 1,
      max: 5,
      infoModal: {
        id: 'info-modal',
        token: 'btc',
        content: '',
      },
    }
  },
  computed: {},
  async mounted() {
    // Set the initial number of items
    await this.getToken()
  },
  methods: {
    info(item, index, button) {
      this.infoModal.token = item.token
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    async getToken() {
      let url = 'https://api-token-price.dotoracle.network/tokens'
      let tokens = await this.axios.get(url)
      this.items = tokens.data.tokens
    },
    getImgUrl(token) {
      // eslint-disable-next-line no-undef
      var images = require.context('../assets/images/token', false, /\.svg$/)
      return images('./' + token + '.svg')
    },
  },
}
</script>
