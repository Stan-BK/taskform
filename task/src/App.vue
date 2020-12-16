<template>
  <div id="app">
    <el-container>
      <el-header style="padding:0;">
        <Title class="header"></Title>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac" style="height: calc(90vh);">
            <el-col :span="24" style="height: 100%;overflow:auto;">
              <el-menu
                :default-active="this.$store.state.route"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#66b1ff" 
                :router="true"
                style="height: 100%;">
                <el-menu-item index="/edit">
                  <i class="el-icon-edit"></i>
                  <span slot="title">Edit</span>
                </el-menu-item>
                <el-menu-item index="/artical">
                  <i class="el-icon-document"></i>
                  <span slot="title">Artical</span>
                </el-menu-item>
                <el-menu-item index="/admin">
                  <i class="el-icon-menu"></i>
                  <span slot="title">login</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Title from './components/Title/Title'
export default {
  data () {
    return {
      title: this.$store.state.title
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$store.commit('init')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    Title
  }
}
</script>
<style>
*{margin:0;padding:0;}
ul, ol, dl{list-style:none;}
a{text-decoration:none;color:#000;}
i, em{font-style:normal;}
b, strong{font-weight:normal;}
input, textarea{outline:none;resize:none;}
.fl{float:left;}
.fr{float:right;}
.clearFix:after{display:block;content:'';clear:both;zoom:1;} 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.option{
  width:100%;
  height: 100%;
  display: block;
  display: flex;
}
.option>li{
  float: left;
  width: 25%;
  line-height: 300%;
}
.header{
  height: 100%;
}
#drop{
  height: 100%;
  position: relative;
}
#drop p{
  height: 100%;
  display: block;
}
#drop:hover #dropdown{
  height: 100%;
  opacity: 1;
}
#dropdown{
  width: 100%;
  position: absolute;
  left: 0;
  height: 0px;
  opacity: 0;
  transition:opacity .8s;
  z-index: 9999;
}
#dropdown li{
  width:100%;
  background-color: #d3dce6;
}
#dropdown li:last-child,#dropdown li:last-child a{
  border-radius: 0 0 0 4px;
}
#dropdown li:last-child a:hover{
  display: block;
  background-color: rgb(95, 93, 93);
  color: #fff;
  border-radius: 0 0 0 4px;
}
body > .el-container {
    margin-bottom: 40px;
  }
</style>
