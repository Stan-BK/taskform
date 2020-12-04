<template>
  <div>
    <div class="title clearFix">
        <div class="grid-content gridflex1 fl" id="left"><div id="line"></div></div>
        <div class="grid-content gridflex2 fl" id="center"><h2 id="title"  onselectstart="return false">{{this.$store.state.title}}</h2></div>
        <div class="grid-content gridflex1 fr clearFix" id="right" style="overflow:hidden"  >
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            <el-submenu index="4">
              <template slot="title">{{this.$store.state.name}}</template>
              <router-link to='/admin'><el-menu-item index="4-1">登出</el-menu-item></router-link>
              <el-menu-item index="4-2">选项2</el-menu-item>
              <el-menu-item index="4-3">选项3</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style scoped>
  .grid-content {
    /* //min-height: 36px; */
    height: 100%;
  }
  .gridflex1{
    width:20%;
    flex-grow: 1;
  }
  .gridflex2{
    flex-grow: 2;
  }
  .title{
    width: 100%;
    margin:0;
    height: 100%;
    display: flex;
    line-height: 350%;
    box-shadow: 1px 1px 5px rgb(205, 205, 205);
  }
  #title{
    color:  #303133;
  }
  #left::after{
    display: block;
    width:100%;
    height: 1px;
    box-shadow: 1px 1px 5px rgb(205, 205, 205);
  }
  #right::after{
    display: block;
    width:100%;
    height: 1px;
    box-shadow: 1px 1px 5px rgb(205, 205, 205);
  }
  #center::after{
    display: block;
    width:100%;
    height: 1px;
    box-shadow: 1px 1px 5px rgb(205, 205, 205);
  }
</style>