<template>
  <div id="app">
    <div class="header">
      <h2 class="logo">LOGO HERE</h2>
    </div>
    <SignUp/>

    <div class="footer">
      <div class="links">
        <span>Feature 1</span>
        <span>Feature 2</span>
        <span>Feature 3</span>
      </div>
      <div class="version">Version 1.02.05</div>
    </div>
  </div>
</template>

<script lang="ts">
import SignUp from "~/components/SignUp.vue";

export default {
  name: "App",
  components: {
    SignUp
  }
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  background: #102a43;
  background-image: url("~/assets/background2.png");
  background-size: contain;
	background-color: #FFFCF5;
	background-position: bottom;
	background-repeat: no-repeat;
}
.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    color: #f0f4f8;
    padding: 0;
    margin: 0;
  }
  .links {
    display: flex;
    font-family: "Open Sans";
    span {
      padding: 0 10px;
      font-size: 18px;
      border-right: 1px solid #9fb3c8;
      &:last-child {
        border-right: none;
      }
    }
  }
  .version {
    font-family: "Open Sans";
    padding: 0 10px;
    color: #9fb3c8;
    font-size: 12px;
    margin-top: 5px;
  }
}
.header {
  padding: 10px 20px;
  .logo {
    font-family: "Open Sans";
    letter-spacing: 3px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo .part-2 {
    color: #d64545;
  }
}
</style>
