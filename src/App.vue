<template>
  <div id="app">
    <div>HELLO {{ username }}</div>
    <div id="nav">
      <router-link to="/">Form</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  created () {
    this.$store.dispatch('getUsername')
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
