<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改用户组':'创建用户组'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="角色名称:" :error="form_errors.name">
        <el-input v-model="form_data.title"></el-input>
      </el-form-item>
      <el-form-item label="选择拥有的权限">
          <el-select v-model="form_data.permissions" multiple placeholder="请选择">
              <el-option
                v-for="item in permissions_data"
                :key="item.id"
                :label="item.alias"
                :value="item.id">
              </el-option>
          </el-select>
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
        is_active: true
      },
      permissions_data: []
    };
  },
  created(){
    master
    .get("permission/getall")
    .then(res => {
      console.log("tttttttttt",res.data)
      this.permissions_data = res.data;
    })
  }
};
</script>

<style scoped>
</style>
