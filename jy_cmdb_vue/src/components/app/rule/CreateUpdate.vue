<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改':'创建'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">

      <el-form-item label="规则名称:" :error="form_errors.name">
        <el-input v-model="form_data.rules_name"></el-input>
      </el-form-item>

      <el-form-item label="所属应用集">
          <el-select v-model="form_data.application_info" placeholder="请选择">
              <el-option
                v-for="item in application_list"
                :key="item.id"
                :label="item.application_name"
                :value="item.id">
              </el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="规则表达式:" :error="form_errors.name">
        <el-input v-model="form_data.expr"></el-input>
      </el-form-item>

      <el-form-item label="持续多久报警:" :error="form_errors.name">
        <el-input v-model="form_data.long_time"></el-input>
      </el-form-item>

      <el-form-item label="报警间隔时间:" :error="form_errors.name">
        <el-input v-model="form_data.repeat_time"></el-input>
      </el-form-item>

      <el-form-item label="报警恢复是否通知">
          <el-radio-group v-model="form_data.resolve">
          <el-radio v-for="item in reslove_list"
                    :label="item[0]">

          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="选择报警级别">
          <el-select v-model="form_data.mysql_file_montior_info" placeholder="请选择">
              <el-option
                v-for="item in mysql_level_montior_choices"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="选择报警方式">
        <el-checkbox-group v-model="form_data.monitor_mode">
          <el-checkbox v-for="item in monitor_mode_choices"
                    :label="item[0]" Key="item[0]">
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!--<el-checkbox-group v-model="checkList">-->
    <!--<el-checkbox label="复选框 A"></el-checkbox>-->
    <!--<el-checkbox label="复选框 B"></el-checkbox>-->
    <!--<el-checkbox label="复选框 C"></el-checkbox>-->
    <!--<el-checkbox label="禁用" disabled></el-checkbox>-->
    <!--<el-checkbox label="选中且禁用" disabled></el-checkbox>-->
  <!--</el-checkbox-group>-->


      <el-form-item label="报给哪个组">
          <el-select v-model="form_data.group" placeholder="请选择">
              <el-option
                v-for="item in group_list"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="报警总结:" :error="form_errors.name">
        <el-input v-model="form_data.summary"></el-input>
      </el-form-item>

      <el-form-item label="报警描述:" :error="form_errors.name">
        <el-input v-model="form_data.desc"></el-input>
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
      // form_data: {
      //   is_active: true,
      //   monitor_mode: []
      // },
      jobs_data:[],
      choices_data: {},
      monitor_mode_choices:[],
      mysql_level_montior_choices:[],
      reslove_list: [],
      group_list:[],
      application_list:[],
      checkList:[]
    };
  },
  created() {
    // this.form_data.monitor_mode = JSON.parse(this.form_data.monitor_mode);

    // var list1 = "sms";
    // this.form_data.monitor_mode = this.p_type==='update'?this.form_data.monitor_mode.split(","):this.form_data.monitor_mode.split(",");
    if (this.p_type==='update') {
      this.form_data.monitor_mode = this.form_data.monitor_mode.split(",")
    }
    // this.form_data = eval("(" + this.form_data + ")");
    // this.form_data.monitor_mode = this.form_data.monitor_mode.split(",")
    // this.form_data.monitor_mode =
    master
      .get("job_manager/getall")
      .then(res => {
      console.log("dddd", res)
      this.jobs_data = res.data;
  }),
  master
    .get("rules_manager/get-choices-info")
    .then(res => {
      this.choices_data = res.data;
      console.log("rrrrrrrrrrrrddddd",res.data);
      this.monitor_mode_choices = res.data.monitor_mode_choices;
      console.log("lllllllll",this.monitor_mode_choices);
      this.mysql_level_montior_choices = res.data.mysql_level_montior_choices;
      console.log("gggg",this.mysql_level_montior_choices)
      console.log("rrrrrrrrrrrrsssssssss",res.data.monitor_mode_choices[0][0])
      this.reslove_list = res.data.reslove_choices;

    }),
  master
    .get("roles/getall")
    .then(res => {
      this.group_list = res.data;
    }),
    master
    .get("application_manager/getall")
    .then(res => {
      this.application_list = res.data;
      console.log("pppppppppp",application_list)
    })

  }
};
</script>

<style scoped>
</style>
