<template>
<div style="background: #0d2a42;">
  <el-row>
    <el-col :span="12">
      <server_total v-if="flag" :server="server"></server_total>
      <!--aaaa-->
    </el-col>
    <el-col :span="12">
      <target_total v-if="flag1" :server="server1"></target_total>
      <!--aaaa-->
    </el-col>
  </el-row >
  <el-row >
    <el-col :span="12">
      <application_total v-if="flag2" :server="server2"></application_total>
      <!--aaaa-->
    </el-col>
    <el-col :span="12">
      <rules_total v-if="flag3" :server="server3"></rules_total>
      <!--aaaa-->
    </el-col>
  </el-row>
</div>
</template>
<script>
import server_total from './server_total'
import target_total from './target_total'
import application_total from './application_total'
import rules_total from './rules_total'
import master from '@/api/'
export default {
  name: 'prometheus_cards_info',
  components:{
    target_total,
    server_total,
    application_total,
    rules_total
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      flag: false,
      flag1: false,
      flag2: false,
      flag3: false,
      server: {},
      server1: {},
      server2: {},
      server3: {},
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.server_total1();
      this.target_total1();
      this.application_total1();
      this.rules_total1();
    },

    server_total1(){
      master
        .get("server_total")
        .then(res => {
          console.log("sssssss",res)
          this.server = res.data[0];
          console.log("yyyyyyyyy",this.server);
          this.flag = true
      })
    },
    target_total1(){
      master
        .get("target_total")
        .then(res => {
          console.log("sssssss",res)
          this.server1 = res.data[0];
          console.log("yyyyyyyyy",this.server1);
          this.flag1 = true
      })
    },
    application_total1(){
      master
        .get("application_total")
        .then(res => {
          console.log("sssssss",res)
          this.server2 = res.data[0];
          console.log("yyyyyyyyy",this.server1);
          this.flag2 = true
      })
    },
    rules_total1(){
      master
        .get("rules_total")
        .then(res => {
          console.log("sssssss",res)
          this.server3 = res.data[0];
          console.log("yyyyyyyyy",this.server3);
          this.flag3 = true
      })
    }

  }
}
</script>
