<template>
  <div style="width: 560px; margin: 30vh auto auto;">
    <el-card>
      <h1 style="width: 100%; text-align: center">登录PWM</h1>
      <!--<p style="width: 100%; text-align: center; color: #f56c6c">{{ errors.non_field_errors}}</p>-->
      <el-form style="margin-right: 40px" :model="form_data" ref="form_data" :rules="rules" title="登录PWM" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input :autofocus="true" @keyup.enter.native="do_login()" v-model="form_data.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input :autofocus="true" @keyup.enter.native="do_login()" v-model="form_data.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" @keyup.enter.native="do_login()" v-model="form_data.password"></el-input>
        </el-form-item>
        <el-form-item label="选择所属角色" prop="role">

          <el-select v-model="form_data.roles" multiple placeholder="请选择">
            <el-option
              v-for="item in roles_data"
              :key="item.pk"
              :label="item.fields.title"
              :value="item.pk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="do_login()">登 录</el-button>
          <!--<el-button @click="do_reset()">重置</el-button>-->
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>

import ElCard from "element-ui/packages/card/src/main";
import master from "@/api/"
import store from "@/store"

export default {
  components: { ElCard },
  data(){
    return{
      form_data:{
        username:"",
        password:"",
        email:"",
        roles:""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roles: [
          { required: true, message: "请选择所属角色", trigger: "blur" }
        ]
      },
      roles_data:{},
      roles:[]
      // value:""
    }
  },
  created(){
    console.log("sssssssssssssss",store.state.roles);
    this.roles_data = JSON.parse(store.state.roles)
  },
  methods:{
    do_login(){
      this.$refs["form_data"].validate(valid => {
        console.log("dddd",this.form_data);
        if (valid) {
          master
            .post("user", this.form_data)
            .then(response => {
              console.log(response);
              if (response.status == 201){
                this.$router.push({ path: '/login' });
              }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
