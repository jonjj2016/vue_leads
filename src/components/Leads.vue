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

    <div v-if="leads.length === 0">No leads found.</div>
    <div v-else>
      <lead-list-item v-for="lead in leads" :key="lead.id" :lead="lead" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: mapState({
    leads: (state) => {
      return state.leads
    },
  }),
  data() {
    return {
      searchTerm: '',
      searchSelected: false,
    }
  },
  methods: {
    onSearch(e) {
      if (this.searchTerm.length >= 3) {
        const query = { q: this.searchTerm }
        if (this.searchSelected) {
          query.selected = true
        }
        this.filter(query)
      } else {
        const query = {}
        if (this.searchSelected) {
          query.selected = true
        }
        this.filter(query)
      }
    },
  },
}
</script>
