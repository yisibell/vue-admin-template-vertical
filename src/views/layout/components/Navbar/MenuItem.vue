<template>

  <el-menu-item v-if="(!item.children || item.children.length === 0) && !item.hidden" :index="item.path">
    {{item.meta.title}}
  </el-menu-item>

  <el-submenu v-else-if="!item.hidden" :index="item.path" popper-append-to-body>

    <template slot="title">
      {{item.meta.title}}
    </template>

    <menu-item
      v-for="child in item.children"
      :item="child"
      :key="child.path">

    </menu-item>

  </el-submenu>

</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data(){
    return {}
  }
}
</script>

<style lang="scss">

</style>


