<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  // import Header from "./components/home/Header";

  export default {
    name: "App",
  };
</script>

<style>

  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  a {
    color: #000000;
  }

</style>
