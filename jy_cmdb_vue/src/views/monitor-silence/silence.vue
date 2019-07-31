<template>
  <div>
    <c-option-bar>
      <el-button size="medium" type="primary" @click="add_dialog('AppSilenceCreateUpdate', {p_type: 'create'})" icon="el-icon-plus">添加</el-button>
      <c-search placeholder="ID/JOB名称" :parent="this"></c-search>
    </c-option-bar>
    <el-table :data="data" border stripe size="medium" @filter-change="on_change_filter" @sort-change="on_change_sort" v-loading="loading" style="width: 100%" :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass">
      <el-table-column label="id" prop="id" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="silence_id" prop="silence_id" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="开始时间" prop="startsAt" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="结束时间" prop="endsAt" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="创建者" prop="createdBy" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="描述" prop="comment" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="add_dialog('AppSilenceCreateUpdate', {p_type: 'update', p_item: scope.row})">修改</el-button>
          <el-button size="mini" type="danger" :loading="scope.row.__loading_delete" @click="on_delete(scope.row)" style="margin-left: 2px">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 80px">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.page_size" style="float: right; margin-right: 100px; margin-top: 20px" background layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>

  </div>

</template>

<script>
import Vue from "vue";
import master from "@/api";
import { master_s } from "@/api";
import { list_mixin } from "@/utils/mixins";

export default {
  mixins: [list_mixin],
  data() {
    return {
      url: "slience",
      // datetime_fields: ["date_joined", "last_login"]
    };
  },
  mounted() {
    this.get_data();
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:#3f5c6d2c;color:#000;";
    },
  }
};
</script>


<style scoped>
.c-option-bar >>> .el-input-group__append {
  border-left: 0;
  background-color: #62a5f3 !important;
  color: #ffffff !important;
}
</style>
