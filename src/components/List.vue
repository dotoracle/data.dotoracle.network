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
            <Token>
              <cryptoicon :symbol="tr.token" size="24" />
              {{ tr.token.toUpperCase() }}
            </Token>
          </vs-td>
          <vs-td>
            <span>${{ formatNumber(hideDecimal(tr.price)) }}</span>
          </vs-td>
          <vs-td>
            {{ formatAge(tr.timestamp * 1000) }}
          </vs-td>
          <vs-td>
            <vs-button transparent @click="showModal(tr)">Details</vs-button>
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
  box-shadow: 0 0 12px #00000059;
  text-align: center;
`
const Token = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  svg {
    margin-right: 0.5rem;
  }
`

export default {
  components: {
    TokenDetail,
    TableWrapper,
    Token,
  },
  data() {
    return {
      search: '',
      items: [],
      page: 1,
      max: 10,
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
    showModal(item) {
      this.$modal.show(TokenDetail, { token: item.token }, { height: 'auto', width: 1140 })
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
  },
}
</script>
