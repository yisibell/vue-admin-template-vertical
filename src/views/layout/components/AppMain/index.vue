<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data(){
    return {}
  }
}
</script>

<style lang="scss">
.app-main {
  max-width: 100%;
  min-height: 75vh;
  margin: 15px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 3px 3px 3px 3px #eee;
}
</style>


