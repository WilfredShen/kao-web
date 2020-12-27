<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  // import Header from "./components/home/Header";

  export default {
    name: "App",
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  a {
    color: #000000;
  }


</style>
