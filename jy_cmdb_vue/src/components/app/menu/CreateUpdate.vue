<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改菜单':'创建菜单'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="一级菜单名称:" :error="form_errors.name">
        <el-input v-model="form_data.alias"></el-input>
      </el-form-item>
      <el-form-item label="图标:" :error="form_errors.name">
        <el-input v-model="form_data.icon"></el-input>
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
  }
};
</script>

<style scoped>
</style>
