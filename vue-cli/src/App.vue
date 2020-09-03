<template>
  <div id="app">
    <div class="header-div">
      DIG4104c Chat Room Project
    </div>
    <img src="./assets/logo.png">
<!--    custom vue component-->
    <Home></Home>

    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>

  //you must import a component if you want to use it, as well as define it in the 'components' object of the component you are bringing it into
  import Home from "./components/Home.vue";

export default {
  name: 'app',
  components:{
    Home
  },
  data () {
    return {
    }
  },
  methods:{
  },
}
</script>

<style>

  *{
    box-sizing: border-box;
  }

  .header-div{
    padding: 10px 20px;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 5%;
    text-align: center;
    background-image: linear-gradient(to right, #ff6600, #ff8400);
    color: white;
    font-size: 1.5rem;
    text-shadow: 0 0 2px 2px black;
  }



#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
