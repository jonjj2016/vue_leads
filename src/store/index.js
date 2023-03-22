import axios from 'axios'
import { createStore, createLogger } from 'vuex'
import types from './mutation-types'

const server_url = import.meta.env.VITE_SERVER_URL

export default createStore({
  state: {
    leads: [],
    current: null,
  },
  mutations: {
    [types.FIND_LEAD](state, payload) {
      state.leads.push(payload)
    },
  },
  plugins: [createLogger()],
  actions: {
    [types.FIND_LEAD](state, query) {
      const options = {
        url: `${server_url}/leads`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        params: query,
      }
      axios(options).then((res) => {
        state.state.leads = res.data
      })
    },
    [types.POST_LEAD](state, payload) {
      const options = {
        url: `${server_url}/leads`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: payload,
      }
      axios(options).then((res) => {
        state.state.leads.unshift(res.data)
      })
    },
    [types.PATCH_LEAD](state, payload) {
      const { id, ...data } = payload
      const options = {
        url: `${server_url}/leads/${id}`,
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data,
      }

      axios(options).then((res) => {
        const leads = state.state.leads.map((lead) => {
          if (lead.id === id) {
            return res.data
          }
          return lead
        })
        state.state.leads = leads
      })
    },
    [types.DELETE_LEAD](state, payload) {
      const { id } = payload
      const options = {
        url: `${server_url}/leads/${id}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
      axios(options).then((res) => {
        const leads = state.state.leads.filter((lead) => {
          if (lead.id !== id) {
            return res.data
          }
        })
        state.state.leads = leads
      })
    },
    [types.SET_CURRENT](state, payload) {
      const { id } = payload

      const lead = state.state.leads.find((lead) => {
        if (lead.id === id) {
          return lead
        }
      })
      state.state.current = lead
    },
  },
})
