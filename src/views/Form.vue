<template>
  <div class="form">
    <input type="number" :value="leftSide" @input="$store.commit('updateForm', {leftSide: $event.target.value})">
    <input type="number" :value="rightSide" @input="$store.commit('updateForm', {rightSide: $event.target.value})">
    <button @click="submit">Submit</button>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'home',
  created () {
    this.$store.dispatch('getForm')
  },
  computed: mapState([
    'leftSide',
    'rightSide'
  ]),
  methods: {
    submit () {
      this.$store.dispatch('sendForm').then(() => {
        this.$router.push('about')
      })
    }
  }
}
</script>

<style lang="scss">
  .form {
    input, button {
      margin: 0 10px;
      height: 4em;
      width: 12em;
      text-align: center;
    }

    button {
        display: block;
        margin: 1em auto;
        border-radius: 2px;
        background: #42b983;
        color: white;
        cursor: pointer;
        border-radius: 10px;
      }
  }
</style>
