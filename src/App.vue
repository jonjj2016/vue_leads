<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Form from './components/Form.vue'
import Leads from './components/Leads.vue'
import { useStore } from 'vuex'
import types from './store/mutation-types'

const store = useStore()

onMounted(() => {
  store.dispatch(types.FIND_LEAD)
})
</script>

<template>
  <main>
    <div class="container">
      <Form />
      <Leads />
    </div>
  </main>
</template>
