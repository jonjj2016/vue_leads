<template>
  <div
    @click="setCurrent"
    :class="{ selected: lead.selected }"
    class="lead_item"
    @dblclick="toggleSelected()"
  >
    <div>{{ lead.firstName }} {{ lead.lastName }}</div>
    <div>{{ lead.role }}</div>
    <div>{{ lead.email }}</div>
    <div>{{ lead.phone }}</div>
    <button @click="deleteLead">X</button>
  </div>
</template>

<script>
import types from '../store/mutation-types'
import { useStore } from 'vuex'

export default {
  props: ['lead'],
  setup() {
    const store = useStore()
    return {
      update: (data) => store.dispatch(types.PATCH_LEAD, data),
      remove: (data) => store.dispatch(types.DELETE_LEAD, data),
      find: () => store.dispatch(types.FIND_LEAD),
      set_current: (data) => store.dispatch(types.SET_CURRENT, data),
    }
  },
  methods: {
    setCurrent() {
      this.set_current({ id: this.lead.id })
    },
    deleteLead() {
      this.remove({ id: this.lead.id })
    },
    toggleSelected() {
      let selected = true
      if (this.lead.selected) {
        selected = false
      }
      this.update({ id: this.lead.id, selected })
      // this.find({})
    },
  },
}
</script>
