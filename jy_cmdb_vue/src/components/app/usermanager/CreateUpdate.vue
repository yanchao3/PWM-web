<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改用户':'创建用户'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="用户名称:" :error="form_errors.name">
        <el-input v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" :error="form_errors.name">
        <el-input v-model="form_data.email"></el-input>
      </el-form-item>
      <el-form-item label="电话:" :error="form_errors.name">
        <el-input v-model="form_data.phone"></el-input>
      </el-form-item>
      <el-form-item label="企业wx ID:" :error="form_errors.name">
        <el-input v-model="form_data.wx_id"></el-input>
      </el-form-item>
      <el-form-item label="选择拥有的角色">
          <el-select v-model="form_data.roles" multiple placeholder="请选择">
              <el-option
                v-for="item in roles_data"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="密码:" v-if="p_type==='update'?false:true" :error="form_errors.name" >
        <el-input type="password" v-model="form_data.password"></el-input>
      </el-form-item>
      <!-- <el-form-item v-if="p_type==='update'" label="密码:" :error="form_errors.password">
        <el-input type="password" v-model="form_data.password"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="submit_loading" @click="on_submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { dialog_mixin } from "@/utils/mixins";
import master from "@/api/"
export default {
  mixins: [dialog_mixin],
  data() {
    return {
      form_data: {
        is_active: true,
        // visible: true
      },
      roles_data: []
    };
  },
  created(){
    master
    .get("roles/getall")
    .then(res => {
      console.log("tttttttttt",res.data)
      this.roles_data = res.data;
    })
  }
};
</script>

<style scoped>
</style>
