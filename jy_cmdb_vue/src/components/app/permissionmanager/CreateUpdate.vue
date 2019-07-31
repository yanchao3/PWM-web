<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改权限':'创建权限'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="标题:" :error="form_errors.name">
        <el-input v-model="form_data.alias"></el-input>
      </el-form-item>
      <el-form-item label="前端路由名称:" :error="form_errors.name">
        <el-input v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item label="图标:" :error="form_errors.name">
        <el-input v-model="form_data.icon"></el-input>
      </el-form-item>
      <el-form-item label="所属菜单">
          <el-select v-model="form_data.menu" placeholder="请选择">
              <el-option
                v-for="item in menus_data"
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
      menus_data: []
    };
  },
  created(){
    master
    .get("menu/getall")
    .then(res => {
      console.log("tttttttttt",res.data)
      this.menus_data = res.data;
    })
  }
};
</script>

<style scoped>
</style>
