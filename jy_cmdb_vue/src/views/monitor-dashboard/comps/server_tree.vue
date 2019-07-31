<template>
    <div style="margin-left: 20px;margin-top: 40px;background-color: #0d2a42;height:200px">
       <el-card class="box-card">
  <div slot="header" class="clearfix" style="background: -webkit-linear-gradient(left, #0a4869, #142c54);">
    <span style="color: #fff">配置树</span>
  </div>
         <div class="text item" style="height: 300px;">
      <el-scrollbar ref="myScrollbar" style="height: 100%;background-color: #0d2a42;">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-scrollbar>
         </div>
       </el-card>
    </div>

</template>
<script>
import master from '@/api/'

export default {
  name: 'server_tree',
  props: {
    server:{},
  },
  data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
  updated: function() {
      this.scrollDown()
    },
  mounted() {
    this.init()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    scrollDown() {
        console.log("mmmmmmmm",this.$refs);
        this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight
    },
    init(){
      master
        .get("get_server_tree")
        .then(res => {
          console.log("sss66666ssss",res.data)
          this.data = res.data.data;
          // console.log("yyyyyyyyy",this.server);
          // this.flag = true
      })
    }
  }
}
</script>
<style>
  .text {
    font-size: 18px;
    color: #84e2fa;
  }

  .el-tree {
    background: -webkit-linear-gradient(left, rgb(10, 72, 105), rgb(20, 44, 84));
    color: #84e2fa;
    highlight-current: false;
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

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-tree-node :nth-child(2) {
    padding: 1px;
    overflow: visible;
  }


</style>
