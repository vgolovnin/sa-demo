import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    leftSide: 'LOADING LEFT',
    rightSide: 'LOADING RIGHT'
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
    },
    updateForm (state, form) {
      if (form.leftSide) {
        state.leftSide = form.leftSide
      }

      if (form.rightSide) {
        state.rightSide = form.rightSide
      }
    }
  },
  actions: {
    getUsername ({ commit }) {
      axios.get('/api/user').then(({ data }) => {
        commit('setUsername', data.username)
      })
    },
    getForm ({ commit }) {
      axios.get('/api/').then(({ data }) => {
        console.log(data)
        commit('updateForm', data)
      })
    },
    sendForm ({ state }) {
      axios.post('/api/setForm', state)
    }
  }
})
