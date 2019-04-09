<template>
  <div class="dashboard-container">
    <div class="hello"> happy coding ... </div>

    <!-- <h-input v-model="msg" @input="inputHandle"></h-input> -->

  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data(){
    return {
      msg: ''
    }
  },
  methods: {
    inputHandle(val){
      console.log( this.msg );
    },
    changeHandle(val ){
      // console.log(val);
    },
    validator( val ){
      console.log( val );

      return val + '0'
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
