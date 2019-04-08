<template>
  <div class="navbar-wrap clearfix">

    <div class="logo"> LOGO </div>

    <el-menu
      mode="horizontal"
      menu-trigger="hover"
      :default-active="activeIndex"
      @select="handleSelect"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText">

      <menu-item v-for="route in noHiddenRoutes" :key="route.path" :item="route"></menu-item>

    </el-menu>

  </div>
</template>


<script>
import MenuItem from './MenuItem'
import variables from '@/styles/variables.scss'  // 样式常量

export default {
  name: 'NavBar',
  components: {
    MenuItem
  },
  props: {
    menuLimit: {  // 菜单个数限制 （超出多少个后出现更多按钮 ）
      type: Number,
      default: 7
    }
  },
  data(){
    return {}
  },
  computed: {
    noHiddenRoutes(){  // 非隐藏路由表

      // 1. 非 hidden 项
      let alls = this.$router.options.routes.filter( v => !v.hidden )

      // 2. 子菜单只有一个合并 path
      alls = alls.reduce( ( init , v ) => {
        
        let childs = v.children;
        if ( childs && childs.length === 1 ){
          let o = {
            ...childs[0],
            path: v.path + "/" + childs[0].path,
          }
          init.push( o )
        }
        else{
          init.push( v )
        }
        
        return init;

      } , [] )

      // 3. 横向菜单个数显示限制
      if ( alls.length > this.menuLimit ){
      
        let leftRoutes = alls.slice( 0 , this.menuLimit ),
            rightRoutes = alls.slice( this.menuLimit );

        let more = {
          path: '',
          meta: {
            title: '更多'
          },
          children: rightRoutes
        }

        leftRoutes.push( more )

        return leftRoutes
        
      }

      return alls
    },
    activeIndex(){    // 默认激活菜单
      return this.getFirstPath( this.noHiddenRoutes )
    },
    variables() {     // 样式常量
      return variables
    },
  },
  methods: {
    handleSelect(key, keyPath) {  // 菜单选择
      let fullPath = keyPath.join('/')
      
      this.$router.push( {
        path: fullPath
      })
    },
    getFirstPath( arr ){ 
      let index = arr.findIndex( v => !v.hidden );

      if ( arr[index].children ){
        return this.getFirstPath( arr[index].children )
      }

      return arr[index].path
    }
  },

}
</script>

<style lang="scss">

@import '@/styles/variables.scss';

.navbar-wrap {

  height: $navbarHeight;
  background-color: $menuBg;
  padding: 0px 15px;

  .logo {
    width: 145px;
    height: 100%;
    text-align: center;
    line-height: $navbarHeight;
    color: $menuText;
    float: left;
  }
  .el-menu {
    height: $navbarHeight;
    float: left;

    .el-menu-item{
      line-height: $navbarHeight;
      height: $navbarHeight;
    }

    .el-submenu {

      .el-submenu__title {
        line-height: $navbarHeight;
        height: $navbarHeight;
      }

      i.el-submenu__icon-arrow {
        color: $menuText;
      }

      &.is-active {
        i.el-submenu__icon-arrow {
          color: $menuActiveText;
        }
      }

    }

  
  }
}

</style>

