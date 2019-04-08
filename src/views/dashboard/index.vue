<template>
  <div class="dashboard-container">
    <div class="hello" @click="toggle"> happy coding ... </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data(){
    return {
      isdrag: true,
    }
  },
  methods: {
    toggle(){
      this.isdrag = !this.isdrag
    }
  },
  created(){
    this.$layer.msg('可以在组件中使用 this.$layer 调用弹出层方法哦！')
    
  },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {

    min-height: 2000px;

    .hello {
      height: 60vh;
      text-align: center;
      line-height: 60vh;
    }

    .drag{
      width: 200px;
      height: 200px;
      background-color: aquamarine;
    }

  }

}
</style>
