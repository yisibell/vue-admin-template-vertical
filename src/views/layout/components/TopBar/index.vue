<template>
  <div class="top-bar clearfix">
    <span class="item"> 登陆 </span>
    <span class="item"> 申请使用 </span>

    <el-dropdown class="item">
      <span class="el-dropdown-link">
        设置<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户设置</el-dropdown-item>
        <el-dropdown-item>角色管理</el-dropdown-item>
        <el-dropdown-item>我的招聘</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data(){
    return {}
  }
}
</script>

<style lang="scss">

.top-bar{
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0px 15px;

  .item {
    cursor: pointer;
    float: right;
    margin-left: 15px;
    font-size: 12px;
  }


  .el-dropdown-link {
    cursor: pointer;
  }
 

}

</style>


