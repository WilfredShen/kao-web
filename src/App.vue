<template>
  <div id="app">
    <!--    <div >-->
    <!--      <Header/>-->
    <!--    </div>-->
    <div>
      <router-view style="margin-left:12%;margin-right: 12%"/>
    </div>
  </div>
</template>

<script>
  // import Header from "./components/home/Header";

  export default {
    name: "App",
    // components: {Header},
    data() {
      return {
        activeIndex: "1",
        activeIndex2: "1"
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      }
    }
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
