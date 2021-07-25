<template>
  <div>
    <div class="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
      <div class="lh-1">
        <h1 class="h6 mb-0 text-white lh-1">Cryptocurrency (USD pairs) Data Feeds</h1>
        <small>Explore the decentralized oracle networks powered by DotOracle</small>
      </div>
    </div>

    <div class="my-3 p-3 bg-body rounded shadow-sm">
      <h6 class="border-bottom pb-2 mb-0">Recent updates</h6>

      <b-row>
        <b-col lg="6" class="my-1">
          <b-form inline>
            <b-form-group
              inline
              label="Search"
              label-for="filter-input"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Type to Search"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
        responsive="lg"
        id="token-list"
      >
        <template #cell(token)="row">
          <img :src="getImgUrl(row.item.token)" height="24px" />
          <a @click="row.toggleDetails" href="#" class="td-show-token"> {{ row.item.token.toUpperCase() }}</a>
        </template>
        <template #cell(price)="row" @click="row.toggleDetails">
          <a @click="row.toggleDetails" href="#" class="td-show-token">
            $ {{ formatNumber(hideDecimal(row.item.price)) }}</a
          >
        </template>
        <template #cell(timestamp)="row">
          {{ formatAge(row.item.timestamp * 1000) }}
        </template>

        <template #cell(actions)="row">
          <b-button-group>
            <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              squared
              variant="primary"
              class="mr-3"
            >
              Show Modal
            </b-button>
          </b-button-group>
        </template>

        <template #row-details="row">
          <TokenDetail :token="row.item.token" :type="'bellow'"></TokenDetail>
        </template>
      </b-table>

      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
      </b-row>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.token.toUpperCase() + ' Price Source'"
        size="xl"
        ok-only
        @hide="resetInfoModal"
      >
        <TokenDetail :token="infoModal.token" :type="'modal'"></TokenDetail>
      </b-modal>
    </div>
  </div>
</template>

<script>
import TokenDetail from '../components/TokenDetail'
export default {
  components: {
    TokenDetail,
  },
  data() {
    return {
      items: [],
      fields: [
        { key: 'token', label: 'Token', sortable: true, class: 'text-center' },
        { key: 'price', label: 'Price', sortable: true, class: 'text-center' },
        { key: 'timestamp', label: 'Last updated', class: 'text-center' },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 20],
      filter: null,
      infoModal: {
        id: 'info-modal',
        token: 'btc',
        content: '',
      },
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
  },
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    async getToken() {
      let url = 'https://api-token-price.dotoracle.network/tokens'
      let tokens = await this.axios.get(url)
      this.items = tokens.data.tokens
      this.totalRows = this.items.length
      console.log('token', tokens.data)
    },
    getImgUrl(token) {
      // eslint-disable-next-line no-undef
      var images = require.context('../assets/images/token', false, /\.svg$/)
      return images('./' + token + '.svg')
    },
  },
}
</script>
