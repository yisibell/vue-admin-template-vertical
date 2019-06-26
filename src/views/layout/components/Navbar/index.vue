<template>
  <div class="navbar-wrap clearfix">

    <div class="logo f-20"> LOGO </div>

    <el-menu
      ref="elMenu"
      mode="horizontal"
      menu-trigger="hover"
      :default-active="activeIndex"
      @select="handleSelect"
      :active-text-color="variables.menuText">

      <menu-item @click.native="clickHandle" class="f16" v-for="route in noHiddenRoutes" 
      :key="route.path" :item="route"></menu-item>

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
    return {
      activeIndex: ''  //当前激活菜单
    }
  },
  watch: {
    '$route': {
      handler(val){
        this.updateActiveMenuWhenRoutesChange()
      },
      deep: true
    }
  },
  computed: {
    // 完整静态路由表
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
            noChildren: true
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
    // 样式常量
    variables() {     
      return variables
    }
  },
  methods: {
    // 清除所有单个菜单项的选中样式
    clearNoChildrenMenuStyle(){
      const elMenuItem = document.querySelectorAll('.el-menu-item')
          
      for ( let dom of elMenuItem ){
        if ( dom.classList.contains('no-children') )
        dom.style = ''
      }
    },
    // 单个菜单项点击控制
    clickHandle(e){
      let el = e.target;
      this.clearNoChildrenMenuStyle()
      if ( el.classList.contains('no-children') ){
        el.style.borderBottom = this.variables.menuBorderBottomActive
        el.style.color = this.variables.menuText
      }

    },
    // 菜单选择
    handleSelect(key, keyPath) {  
      let fullPath = keyPath.join('/')
      
      this.$router.push( {
        path: fullPath
      })

      this.clearNoChildrenMenuStyle()
    },
    // 递归获取路由表菜单中的第一个 hidden 项的前一项 路由对象 path 值
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
     
    },
    // 获取当前路由对应菜单 path 值
    getCurrRoutesPath( arr , resPath = ''){
      
      let fullPath = this.$route.fullPath.split('/').slice(1),
          fullPathArr = fullPath.slice( fullPath.findIndex( v => v === resPath) );  // 当前完整路径数组
      
      resPath = fullPathArr[0] || '';

      arr.forEach( (v,i) => {
        if ( v.path === fullPathArr[i] ){
          resPath = v.path
        }

        if ( v.children && v.children.length > 0 ){
          resPath = this.getCurrRoutesPath( v.children , fullPathArr[1] )
        }
      })

      return resPath;
          
    },
    // 根据路由变化更新激活菜单项
    updateActiveMenuWhenRoutesChange(){
      
      const el = document.querySelector(`[data-active="${this.$route.path}"]`);
      this.clearNoChildrenMenuStyle()
      if (el){
        el.style.borderBottom = this.variables.menuBorderBottomActive
        el.style.color = this.variables.menuText
      }
      this.activeIndex = this.getCurrRoutesPath( this.noHiddenRoutes )
    }
  },
  mounted(){
    this.updateActiveMenuWhenRoutesChange()
  }
}
</script>

<style lang="scss">

@import '@/styles/variables.scss';

.navbar-wrap {

  height: $navbarHeight;
  background-color: $menuBg;
  padding: 0px 20px;
  box-shadow: 2px 2px 2px #dcdcdc;

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
        font-size: 16px;
      }

      i.el-submenu__icon-arrow {
        color: $menuText;
      }

      &.is-active {
        border-bottom: $menuBorderBottomActive;
        i.el-submenu__icon-arrow {
          color: $menuTextActive;
        }
      }

    }

  
  }
}

</style>

