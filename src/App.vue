<template>
  <router-view/>
</template>

<style lang="scss">
@import "./styles.scss";

body {
  background-color: #FBD7CE;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px auto;
  max-width: 800px;
  min-height: 650px;
  border: 10px solid #FE9F84;
  border-radius: 40px;
  background: #fdf7f5;
}

nav {
  padding: 15px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 30px;
}

nav a.router-link-exact-active {
  color: #FE9F84;
}
</style>
