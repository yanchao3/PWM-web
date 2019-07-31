<template>
  <div style="margin-left: 40px;margin-top: 40px;width:100%;background-color: #0d2a42">
  <el-card class="box-card">
  <div slot="header" class="clearfix" style="background: -webkit-linear-gradient(left, #0a4869, #142c54);">
    <span style="color: #fff">{{title}}</span>
  </div>

    <div class="text item">
        <el-table :data="data" border stripe size="medium" style="width: 100%;" :row-style="getRowClass" :header-row-style="getHeaderClass" :header-cell-style="getHeaderClass">
          <el-table-column label="开始时间" prop="create_timestamp" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="报警时间" prop="last_edit_timestamp" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="报警级别" prop="level" show-overflow-tooltip>
            <template scope="scope">
              <span v-if="scope.row.level=='error'" style="background: #f2dede" >{{scope.row.level}}</span>
              <span v-else-if="scope.row.level=='critical'" style="background: darkred" >{{scope.row.level}}</span>
              <span v-else-if="scope.row.level=='warning'" style="background: #fcf8e3" >{{scope.row.level}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规则名称" prop="rule_name" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="报警状态" prop="monitor_level_choices">
            <template scope="scope">
              <span v-if="scope.row.monitor_level_choices=='firing'" style="background: red" >{{scope.row.monitor_level_choices}}</span>
              <span v-else style="color: #37B328" >{{scope.row.monitor_level_choices}}</span>
            </template>
          </el-table-column>
          <el-table-column label="通知状态(重复n次)" prop="repeat_num" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="告警规则" prop="expr" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="告警内容" prop="msg" show-overflow-tooltip>
            <template scope="scope">
              <span v-if="scope.row.monitor_level_choices=='firing'" style="background: red" >{{scope.row.msg}}</span>
              <span v-else style="color: #37B328" >{{scope.row.msg}}</span>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="bottom clearfix">
      今日未解决报警次数{{monitor_count}}
    </div>
    <!--{{resource.value}}-->
  </el-card>
  </div>
</template>
<script>
  export default {
    name: 'his_monitor_msg',
    // data4:[
    //   {"ipaddress":"10.1.1.1","value":10},
    // ],
    props:['data','title'],
    computed:{
      monitor_count:function () {
        var str = 0;
        for (var i = 0; i < this.data.length; i++) {
          str += this.data[i].repeat_num
        }
        return str
      }
    },
    methods:{
      getHeaderClass({ row, column, rowIndex, columnIndex }){
        return "background:#3f5c6d2c;color:#000;";
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        // console.log("wwrrrr",row)
        // if(row.level == "warning"){
          // return "background:red"
        // }else {
          return "background:#3f5c6d2c;color:#000;";
        // }
      },
    }

    // props:['resource']
  }
</script>
<style>
.text {
    font-size: 14px;
    color: #84e2fa;
  }

  .item {
    margin-bottom: 18px;
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

  .el-card {
    color:#84e2fa ;
  }

  .el-tabs__item{
    color:#84e2fa ;
  }
  </style>
