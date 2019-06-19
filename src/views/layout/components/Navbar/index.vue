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
    // 完整路由表
    allRoutes(){
      return this.$router.options.routes
    },
    // 非隐藏路由表
    noHiddenRoutes(){  

      // 1. 非 hidden 项
      let alls = this.noHiddenRoutesFilter( this.allRoutes )

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
    // 默认激活菜单
    activeIndex(){    
      return this.getFirstPath( this.noHiddenRoutes )
    },
    // 样式常量
    variables() {     
      return variables
    },
  },
  methods: {
    // 菜单选择
    handleSelect(key, keyPath) {  
      let fullPath = keyPath.join('/')
      
      this.$router.push( {
        path: fullPath
      })
    },
    // 获取路由表中的第一个菜单路径名
    getFirstPath( arr ){ 
      let index = arr.findIndex( v => !v.hidden );

      if ( arr[index].children ){
        return this.getFirstPath( arr[index].children )
      }

      return arr[index].path
    },
    // 递归过滤出非隐藏路由表
    noHiddenRoutesFilter( routesArr = [] ){  
      let arr = []
      routesArr.forEach( v => {

        if ( !v.hidden ){
          arr.push( v )
        }

        if ( v.children && v.children.length > 0 ){
          v.children = this.noHiddenRoutesFilter( v.children )
        }
       
      })

      return arr;
     
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

