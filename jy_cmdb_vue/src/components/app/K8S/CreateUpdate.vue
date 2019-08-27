<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改':'创建'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="K8S集群名称:" :error="form_errors.name">
        <el-input v-model="form_data.cluster_name"></el-input>
      </el-form-item>

      <el-form-item label="API_SERVER地址:" :error="form_errors.name">
        <el-input v-model="form_data.apiserver" ></el-input>
      </el-form-item>

      <el-form-item label="集群Token:" :error="form_errors.name">
        <el-input type="textarea" :rows="10" v-model="form_data.service_account_token" ></el-input>
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
export default {
  mixins: [dialog_mixin],
  data() {
    return {
      form_data: {
        is_active: true,
      }
    };
  }
};
</script>

<style scoped>
</style>
