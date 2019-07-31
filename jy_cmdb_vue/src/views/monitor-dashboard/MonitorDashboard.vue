<template>
  <div style="background: #0d2a42;">
    <el-row>
      <el-col :span="12">
        <!--<div id="abc" style="height: 200px;">-->
          <!--<el-scrollbar style="height: 100%;">-->
          <server_tree v-if="flag3" :server="data2"></server_tree>
          <!--</el-scrollbar>-->
        <!--</div>-->
      </el-col>
      <el-col :span="12">
        <el-row>
            <el-col :span="11">
                <div class="grid-content bg-purple"><get_target_info v-if="flag1" :data1="data1" :title1="title1"></get_target_info></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"><prometheus_cards_info v-if="flag2"></prometheus_cards_info></div>
            </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
      <div class="grid-content bg-purple"><monitor_msg v-if="flag4" :data="data3" :title="title3"></monitor_msg></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
      <div class="grid-content bg-purple"><his_monitor_msg v-if="flag5" :data="data4" :title="title4"></his_monitor_msg></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import get_target_info from './comps/target_info'
  import prometheus_cards_info from './comps/prometheus_cards_info'
  import monitor_msg from './comps/monitor_msg_table'
  import his_monitor_msg from './comps/his_monitor_msg_table'
  import server_tree from './comps/server_tree'
  import master from '@/api/'
  import ElRow from "element-ui/packages/row/src/row";
  // import monitor_msg from "./comps/monitor_msg_table"

export default {
  name: "monitor-dashboard",
  components: {
    server_tree,
    ElRow,
    get_target_info,
    prometheus_cards_info,
    monitor_msg,
    his_monitor_msg
  },
  data() {
    return {
      data1:[],
      data2:[],
      data3:[],
      data4:[],
      title1:"",
      title2:"",
      title3:"",
      title4:"",
      flag1: false,
      flag2: true,
      flag3: false,
      flag4: false,
      flag5: false,
      height: "400px",
    };
  },
  created() {
    this.init();
  },
  mounted(){
    this.$refs.h.style.height = "300px";
    this.$refs.c.style.height = "310px";
  },
  methods: {

    init() {
      this.getInfoSucc();
      this.server_total1();
      this.get_monitor_msg();
      this.get_his_monitor_msg();
    },
    getInfoSucc() {
      master
        .get("consul_service_check")
        .then(res => {
          console.log("sssssss",res)
          this.data1 = res.data;
          this.title1 = "target存活状态"
          console.log("yyyyyyyyy",this.data1)
          this.flag1 = true
      })
    },

    server_total1(){
      master
        .get("server_total")
        .then(res => {
          console.log("sssssss",res)
          this.data2 = res.data[0];
          console.log("yyyyyyyyy",this.data2);
          this.flag3 = true
      })
    },

    get_monitor_msg(){
      master
        .get("monitor_msg")
        .then(res => {
          console.log("ysdfdgdgfdg",res)
          this.Date= new Date();
          this.title3 = this.Date;
          this.data3 = res.data;
          console.log("yyyyyyyyy",this.data3);
          this.flag4 = true
      })
    },
    get_his_monitor_msg(){
      master
        .get("his_monitor_msg")
        .then(res => {
          console.log("ysdfdgdgfdg",res)
          this.Date= new Date();
          this.title4 = this.Date;
          this.data4 = res.data;
          console.log("yyyyyyyyy",this.data4);
          this.flag5 = true
      })
    }

  }


};
</script>
<style>
.el-row {
    margin-bottom: 20px;
    /*height: 220px;*/
    &:last-child {
      margin-bottom: 0;
    }
  }

.el-card {
  border: 0px;
}
  .el-col {
    /*border-radius: 4px;*/
  }
  /*.bg-purple-dark {*/
    /*background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
    /*background: #d3dce6;*/
  /*}*/
  /*.bg-purple-light {*/
    /*background: #e5e9f2;*/
  /*}*/
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    /*padding: 10px 0;*/
    /*background-color: #f9fafc;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /*.el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;}*/

  /*#abc + .el-tree>.el-tree-node{display:inline-block;}*/

  </style>
