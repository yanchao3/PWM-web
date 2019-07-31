<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改':'创建'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">

      <el-form-item label="IP:" :error="form_errors.name">
        <el-input v-model="form_data.address"></el-input>
      </el-form-item>

      <el-form-item label="端口:" :error="form_errors.name">
        <el-input v-model="form_data.port"></el-input>
      </el-form-item>

      <el-form-item label="选择所属的job">
          <el-select v-model="form_data.tags" placeholder="请选择">
              <el-option
                v-for="item in tags_data"
                :key="item.id"
                :label="item.job_name"
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
import master from "@/api"

export default {
  mixins: [dialog_mixin],
  data() {
    return {
      form_data: {
        is_active: true
      },
      tags_data:[]
    };
  },
  created() {
    console.log("ggggg");
    master
      .get("job_manager/getall")
      .then(res => {
      console.log("dddd", res)
    this.tags_data = res.data;
  })
  }
};
</script>

<style scoped>
</style>
