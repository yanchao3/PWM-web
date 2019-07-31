<template>
<div class="navMenu">
    <label v-for="navMenu in navMenus">
      <el-menu-item v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                    :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
        <i :class="navMenu.entity.icon"></i>
        <span slot="title" class="item_title">{{navMenu.entity.alias}}</span>
      </el-menu-item>

      <el-submenu v-if="navMenu.childs&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                  :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" >
        <template slot="title">
          <i :class="navMenu.entity.icon"></i>
          <span class="item_title"> {{navMenu.entity.alias}}</span>
        </template>
        <NavMenu :navMenus="navMenu.childs"></NavMenu>
      </el-submenu>
    </label>
  </div>
</template>


<script>
export default {
  name: 'NavMenu',
  props: ["navMenus"],
  mounted(){
        console.log("ttttttttttt",this.navMenus)
    },
};
</script>

<style scoped>
  /*.navMenu{*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: #0d2a42;*/

  /*}*/
  /*.el-submenu{*/
    /*background: #0d2a42;*/
  /*}*/
  /*.el-submenu__title{*/
    /*background: #0d2a42;*/
  /*}*/
 /*.item_title{*/
   /*!*color:#fff ;*!*/
   /*background: #0d2a42;*/
 /*}*/


</style>
