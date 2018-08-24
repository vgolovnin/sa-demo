import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leftSide: 'LOADING LEFT',
    rightSide: 'LOADING RIGHT'
  },
  mutations: {
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
