<template>
  <div>
    <div class="filter">
      <input
        v-on:change="onSearch"
        placeholder="Filter Leads"
        type="text"
        id="search"
        v-model="searchTerm"
      />
      <div>
        <label>
          <input type="checkbox" v-model="searchSelected" />
        </label>
        <span>Selected</span>
      </div>
    </div>
  </div>
</template>

<script>
import LeadListItem from './LeadListItem.vue'
import types from '../store/mutation-types'
import { useStore } from 'vuex'

export default {
  components: {
    LeadListItem,
  },
  setup() {
    const store = useStore()
    return {
      filter: (data) => store.dispatch(types.FIND_LEAD, data),
    }
  },
  data() {
    return {
      searchTerm: '',
      searchSelected: false,
    }
  },
  watch: {
    searchTerm: {
      handler(newVal) {
        this.filterResults(newVal, this.searchSelected)
      },
      immediate: true,
    },
    searchSelected: {
      handler(newVal) {
        this.filterResults(this.searchTerm, newVal)
      },
      immediate: true,
    },
  },
  methods: {
    onSearch(e) {
      this.filterResults(this.searchTerm, this.searchSelected)
    },
    filterResults(searchTerm, searchSelected) {
      const query = {}

      if (searchTerm && searchTerm.length >= 3) {
        query.q = searchTerm
      }

      if (searchSelected) {
        query.selected = true
      }

      this.filter(query)
    },
  },
}
</script>
