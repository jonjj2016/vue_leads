<template>
  <div>
    <FilterForm />
    <div v-if="leads.length === 0">No leads found.</div>
    <div v-else>
      <lead-list-item v-for="lead in leads" :key="lead.id" :lead="lead" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LeadListItem from './LeadListItem.vue'
import FilterForm from './Filter.vue'

export default {
  components: {
    LeadListItem,
    FilterForm,
  },

  computed: mapState({
    leads: (state) => {
      return state.leads
    },
  }),
  // watch: {
  //   leads(newVal) {
  //     this.lead = newVal
  //   },
  //   lead(newVal) {
  //     console.log(newVal)
  //   },
  // },
}
</script>
