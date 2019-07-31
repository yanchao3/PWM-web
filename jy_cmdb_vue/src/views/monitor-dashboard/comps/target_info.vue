<template>
  <div style="margin-left: 40px;margin-top: 40px;background-color: #0d2a42">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="background: -webkit-linear-gradient(left, #0a4869, #142c54);">
          <span style="color: #fff">{{title1}}</span>
        </div>
        <!--<div class="text item">-->
          <!--<div ref="charts" id="target" :style="{width:'100%',height:'200px'}" style="margin-left: 40px;margin-top: 50px;"></div>-->
          <div ref="charts" id="target" :style="{width:'100%',height:'200px'}" style=""></div>
        <!--</div>-->
      </el-card>
  </div>
</template>
<script>
import master from '@/api/'

export default {
  name: 'get_target_info',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  props: {
    data1:[],
    title1:'',
    list1:[],
  },
  mounted() {
    this.drawPie();
  },
  methods: {
    drawPie() {
      let myChart = this.$echarts.init(document.getElementById('target'))
      myChart.setOption({
        // title: {
        //     text: this.title1,
        //     x:'center',
        //     textStyle:{color:'#FFF'}
        // },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient : 'vertical',
          x : 'right',
          data:this.list1,
          textStyle:{color:'#FFF'}
        },
        color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
        stillShowZeroSum: false,
        series: [
            {
                name: this.title1,
                type: 'pie',
                radius: '30%',
                center: ['30%', '30%'],
                data: this.data1,
                itemStyle: {
                  normal:{
                    label:{
                      show: true,
                      formatter: '{c} ({d}%)'
                    },
                    labelLine :{show:true}
                  }
                }
            }
        ]
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
