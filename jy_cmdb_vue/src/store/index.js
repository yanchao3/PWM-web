import Vue from "vue"
import Vuex from "vuex"
import  axios from "axios"

import cookie from "./cookie"
import * as mutation from "./mutation"

Vue.use(Vuex)

// var is_logged = false
// if(cookie.get_cookie("token")){
//   console.log("token:"+cookie.get_cookie("token"))
//   is_logged = true
//   console.log("is_logged:", is_logged)
// }

const store = new Vuex.Store({
  state: {
    count: 0,
    token: localStorage.getItem("token")?localStorage.getItem("token"): null,
    username: cookie.get_cookie("username"),
    loading_num: 0,
    user_info: {},
    cancel_token: axios.CancelToken.source(),
    page_size: 0,
    next: "root",
    next_path: "/",
    filtered_menu: [],
    user_permissions: [],
    roles:"",
    replace_list:[
      "设备运行状态",
      "所属环境",
      "用途",
      "IDC机房",
      "操作系统",
      "二级产品线",
    ],
    select_list: [
      "技术负责人",
      "SN号",
      "一级产品线",
      "业务系统",
      "操作系统",
      "所属环境",
      "业务条线",
      "IDC机房",
      "设备运行状态",
      "机器类型",
      "IPADDRESS",
      "二级产品线",
      "用途"
    ],
    symbol_list: [
      "=",
      "!="
    ]
    // menu: localStorage.getItem("menu") || {}
  },
  mutations: mutation
})

export default store
