<template>
  <div class="footer-bar">
    Footer
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  data(){
    return {}
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.footer-bar{
  padding: 15px;
  width: 100%;
  text-align: center;
  background-color: $footerbarBg;
  color: $footerbarFontColor;
}
</style>

