<template>

  <ul style="white-space:nowrap; margin: 0px; padding: 0px">
    <li v-for="value,index in header" :key="index" style="display: inline-block;  border:1px solid #E4E7ED; padding: 0 12px; font-size:14px; height: 40px; line-height: 40px" :style="{color: value==null ? '#44d3e4':'#44d3e4'}">
      {{ value==null?'null':value }}
    </li>
  </ul>

</template>

<script>

  export default {
    data(){
      return {
        header:[
          '设备型号(equipment_type)',
          '一级产品(first_name)',
          '系统(sys_name)',
          'SN(sn)',
          '业务条线(bussiness_name)',
          '宿主机(parent)',
          '楼层(floor)',
          '机架位(rack_position)',
          '房间(root)',
          '机房名(idc_name)',
          'CPU(核)(cpu)',
          '资产名称(asset_name)',
          '业务系统(bussiness_system)',
          '技术负责人(manager)',
          '业务负责人(contact)',
          '二级产品线(second_name)',
          '内存(G)(memory)',
          '业务部门(department)',
          'U位(u_position)',
          '硬盘(G)(disk)',
          'IP(ipaddress)',
          'id(id)'
        ]
      }
    }
  }


</script>
<style>

</style>
