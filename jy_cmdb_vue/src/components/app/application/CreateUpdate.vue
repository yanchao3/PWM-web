<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改':'创建'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">

      <el-form-item label="应用集名称:" :error="form_errors.name">
        <el-input v-model="form_data.application_name"></el-input>
      </el-form-item>

      <el-form-item label="选择所属的数据源">
          <el-select v-model="form_data.job" placeholder="请选择">
              <el-option
                v-for="item in jobs_data"
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
      jobs_data:[]
    };
  },
  created() {
    console.log("ggggg");
    master
      .get("job_manager/getall")
      .then(res => {
      console.log("dddd", res)
    this.jobs_data = res.data;
  })
  }
};
</script>

<style scoped>
</style>
