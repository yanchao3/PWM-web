<template>
  <div style="height: 100%; display: flex;">
    <el-menu :default-active="this.$router.path"
          class="el-menu-vertical-demo"
          @select="menuSelected"

             background-color="#222d32"
          text-color="#b8c7ce"
          active-text-color="black"
          :collapse="isCollapse"
          router
          @open="handleOpen"
          @close="handleClose">
      <!--<c-menu-item v-for="(item, index) in $store.state.filtered_menu" :key="index" :item="item">-->
      <!--</c-menu-item>-->
      <NavMenu :navMenus="leftMenus.childs"></NavMenu>
    </el-menu>
    <div style="height: 100%; display: inline-block; display: flex; align-items: center">
      <i @click="is_collapse=!is_collapse" style="color: #909399; cursor: pointer;" class="fa fa-outdent" :class="{'fa-rotate-180': is_collapse}"></i>
    </div>
  </div>
</template>

<script>
import NavMenu from "./MenuItem";
import store from "@/store"

export default {
  name: "Aside",
  data() {
    return {
      is_collapse: true,
      // leftMenus: {
      //              "entity": null,
      //              "childs": [
      //                {
      //                  "entity": {
      //                    "id": 40,
      //                    "parentMenuId": 0,
      //                    "name": "dashboard-menu\r\n",
      //                    "icon": "\r\n",
      //                    "alias": "首页",
      //                    "state": "ENABLE",
      //                    "sort": 0,
      //                    "value": null,
      //                    "type": "NONE",
      //                    "discription": "首页",
      //                    "createUserId": 1
      //                  },
      //                  "childs": [
      //                    {
      //                      "entity": {
      //                        "id": 30,
      //                        "parentMenuId": 40,
      //                        "name": "dashboard",
      //                        "icon": "icon-dashboard",
      //                        "alias": "首页",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    }
      //                    ]
      //                },
      //                {
      //                  "entity": {
      //                    "id": 4,
      //                    "parentMenuId": 0,
      //                    "name": "dagdata-search\r\n",
      //                    "icon": "\r\n",
      //                    "alias": "查询",
      //                    "state": "ENABLE",
      //                    "sort": 0,
      //                    "value": null,
      //                    "type": "NONE",
      //                    "discription": "用于系统管理的菜单",
      //                    "createUserId": 1
      //                  },
      //                  "childs": [
      //                    {
      //                      "entity": {
      //                        "id": 3,
      //                        "parentMenuId": 4,
      //                        "name": "data",
      //                        "icon": "fa fa-search",
      //                        "alias": "查询",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    },
      //                    {
      //                      "entity": {
      //                        "id": 4,
      //                        "parentMenuId": 4,
      //                        "name": "operation_search",
      //                        "icon": "fa fa-search",
      //                        "alias": "运维资产查询",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    }
      //                    ]
      //                },
      //                {
      //                  "entity": {
      //                    "id": 1,
      //                    "parentMenuId": 0,
      //                    "name": "systemManage",
      //                    "icon": "el-icon-message\r\n",
      //                    "alias": "业务方向配置",
      //                    "state": "ENABLE",
      //                    "sort": 0,
      //                    "value": null,
      //                    "type": "NONE",
      //                    "discription": "用于系统管理的菜单",
      //                    "createUserId": 1
      //                  },
      //                  "childs": [
      //                    {
      //                      "entity": {
      //                        "id": 3,
      //                        "parentMenuId": 1,
      //                        "name": "businessline",
      //                        "icon": "fa fa-list",
      //                        "alias": "业务条线",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    },
      //                    {
      //                      "entity": {
      //                        "id": 4,
      //                        "parentMenuId": 1,
      //                        "name": "firstbusiness",
      //                        "icon": "fa fa-th-list",
      //                        "alias": "一级产品线",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    },
      //                    {
      //                      "entity": {
      //                        "id": 6,
      //                        "parentMenuId": 1,
      //                        "name": "secondbusinessunit",
      //                        "icon": "fa fa-list-alt",
      //                        "alias": "二级产品线",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    },
      //                  ]
      //                },
      //
      //                {
      //                  "entity": {
      //                    "id": 2,
      //                    "parentMenuId": 0,
      //                    "name": "assertManage",
      //                    "icon": "el-icon-message\r\n",
      //                    "alias": "资产配置",
      //                    "state": "ENABLE",
      //                    "sort": 0,
      //                    "value": null,
      //                    "type": "NONE",
      //                    "discription": "用于系统管理的菜单",
      //                    "createUserId": 1
      //                  },
      //                  "childs": [
      //                    {
      //                      "entity": {
      //                        "id": 1,
      //                        "parentMenuId": 2,
      //                        "name": "idc",
      //                        "icon": "fa fa-book",
      //                        "alias": "IDC机房",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    },
      //                    {
      //                      "entity": {
      //                        "id": 2,
      //                        "parentMenuId": 2,
      //                        "name": "systype",
      //                        "icon": "fa fa-book",
      //                        "alias": "系统类别",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    },
      //                    {
      //                      "entity": {
      //                        "id": 3,
      //                        "parentMenuId": 2,
      //                        "name": "asset",
      //                        "icon": "fa snowflake-o",
      //                        "alias": "资产管理",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    },
      //                    {
      //                      "entity": {
      //                        "id": 4,
      //                        "parentMenuId": 2,
      //                        "name": "operation_password",
      //                        "icon": "fa snowflake-o",
      //                        "alias": "密码管理",
      //                        "state": "ENABLE",
      //                        "sort": 0,
      //                        "value": "/system/auth",
      //                        "type": "NONE",
      //                        "discription": "用于权限管理的菜单",
      //                        "createUserId": 1
      //                      },
      //                      "childs": null
      //                    },
      //                  ]
      //                }
      //              ]
      //            }
      leftMenus: {
                   "entity": null,

                 }
      // api_url:
        // window.location.protocol + "//" + window.location.host + "/api-docs"
    }
  },
  created() {
    this.getMenu();
  },

  methods: {
    menuSelected(key, path) {
      console.log('aaaaaaaaa',key);
      this.$router.push({ name: key });
    },
    getMenu(){
      var childs = this.$store.state.menu
      console.log("ppppppppppppttttttyyyyyyyyyyyyy",JSON.parse(localStorage.getItem("menu")))
      // this.leftMenus.childs = this.$store.state.menu
      this.leftMenus.childs = JSON.parse(localStorage.getItem("menu"));
    }
  },
  computed: {},
  components: {
    NavMenu
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
</style>
