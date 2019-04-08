<template>
  <div class="layout">
    <top-bar></top-bar>
    <navbar v-affix></navbar>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import FooterBar from './components/FooterBar'
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
import TopBar from './components/TopBar'

export default {
  name: 'Layout',
  components: {
    FooterBar,
    Navbar,
    AppMain,
    TopBar,
  },
  data() {
    return {}
  },
  methods: {
  
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.layout {
  min-width: 500px;
}

</style>


