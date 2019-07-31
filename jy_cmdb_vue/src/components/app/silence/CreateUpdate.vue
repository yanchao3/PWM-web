<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改静默规则':'创建静默规则'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">



      <el-form-item label="选择开始时间:" :error="form_errors.name">
      <el-date-picker type="datetime" placeholder="请选择开始时间" v-model="form_data.startsAt" v-if="hackReset" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="选择结束时间:" :error="form_errors.name">
      <el-date-picker type="datetime" placeholder="请选择结束时间" v-model="form_data.endsAt"   v-if="hackReset" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm">
      </el-date-picker>
      </el-form-item>

      <el-form-item label="描述:" :error="form_errors.name">
        <el-input v-model="form_data.comment"></el-input>
      </el-form-item>

      <el-form-item label="创建者:" :error="form_errors.name">
        <el-input v-model="form_data.createdBy"></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <div v-for="(v,i) in form_data.matchers" style="height: 50px;">
          <el-form-item label="规则匹配" :error="form_errors.name">
          <el-col :span="8">
            <el-input v-model="form_data.matchers[i].name"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form_data.matchers[i].value"></el-input>
          </el-col>
          <el-col :span="5">
            <el-button style="padding: 0px" icon="el-icon-circle-plus" @click="AddList(form_data.matchers[i].name,form_data.matchers[i].value)"></el-button>
            <el-button style="padding: 0px" icon="el-icon-remove" @click="RemoveList(i)"></el-button>
          </el-col>
          </el-form-item>
        </div>
      </el-row>

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
        // matchers: [{"name":"","value":"","isRegex":false}],
        // startsAt: "",
        // endsAt: ""
      },
      hackReset: true,
    };
  },
  // created() {
  //   this.form_data.list = [{"name":"","value":""}]
  // },
  methods: {
    AddList (name,value) {
        this.form_data.matchers.push({name: name,value: value,isRegex: false})
    },

    RemoveList(index){
      this.form_data.matchers.splice(index,1)
    },
  }


};
</script>

<style scoped>
</style>
