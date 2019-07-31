<template>
  <div style="margin-left: 20px;margin-top: 40px;background-color: #0d2a42">
      <el-card class="box-card">
  <div slot="header" class="clearfix" style="background: -webkit-linear-gradient(left, #0a4869, #142c54);">
    <span style="color: #fff">数据种类</span>
  </div>
  <div class="text item">
    <router-link :to="{name:'job-manager'}">{{server.count}}个</router-link>
  </div>
      </el-card>
  </div>

</template>
<script>
import master from '@/api/'

export default {
  name: 'server_total',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  props: {
    server:{},
  },
  mounted(){
    console.log("lllllllll",this.server)
  }
}
</script>
<style>
  .text {
    font-size: 18px;
    color: #84e2fa;
  }

  .item {
    margin-bottom: 10px;
  }
  .el-card__header{
    background: -webkit-linear-gradient(left, #0a4869, #142c54)
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    /*width: 480px;*/
    background-color: #0d2a42;
    padding: 0px;
  }
</style>
