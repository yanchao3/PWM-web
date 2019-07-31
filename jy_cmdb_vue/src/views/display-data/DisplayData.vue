<template>
  <div>
    <!--<div class="tips-import">-->
      <!--<el-dialog title="导入人员" :visible.sync="importVisible" width="700px" :before-close="handleClose">-->
        <!--<div class="content">-->
          <!--&lt;!&ndash;<div class="import-intro">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="mgr20">导入说明：文件必须xls或xlsx格式</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button><a href="" download="1.xlsx">下载文件模版</a></el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<div class="import-container">-->
            <!--<el-upload ref="upload" class=""-->
                       <!--:drag="true" :multiple="false" action=""-->
                       <!--:auto-upload="false" accept=".xlsx"-->
                       <!--:on-change="importfxx">-->
              <!--<img src="" alt="" style="padding-top: 50px;">-->
              <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
            <!--</el-upload>-->
          <!--</div>-->
        <!--</div>-->
        <!--<span slot="footer" class="dialog-footer">-->
          <!--&lt;!&ndash;<el-button @click="importVisible = false">取 消</el-button>&ndash;&gt;-->
          <!--<el-button type="primary" @click="importSubmit">确 定</el-button>-->
        <!--</span>-->
      <!--</el-dialog>-->
    <!--</div>-->
    <div id="upload">
      <input type="file" @change="importf(this,$event)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
      <el-button style="margin-left: 1px;" size="small" type="success" @click="upload_file('vm')">上传虚拟机资源</el-button>
      <el-button style="margin-left: 1px;" size="small" type="danger" @click="upload_file('phic')">上传物理机资源</el-button>
    </div>

    <div id="download">
      <!--<input type="button" @click="handleDownload(this)"/>-->
            <button type="error" @click="export2Excel"><Icon type="ios-download-outline"></Icon>导出数据</button>
    </div>

    <div style="margin: 20px 0;"></div>
    <div>

      <!--<el-autocomplete id="search_input"  :suffix-icon="search_input_icon"  :autofocus="is_focus" :trigger-on-focus="false" @focus="on_focus"  @keyup.enter.native="on_search()" select-when-unmatched  placeholder="示例：(hostname:huawei* AND price:[20000 TO 40000]) 更多请参阅Lucene语法" style="width: 100%">-->
      <el-autocomplete id="search_input" ref="search_input" :autofocus="is_focus" :trigger-on-focus="false" :suffix-icon="search_input_icon" @focus="on_focus" :fetch-suggestions="history_filter" select-when-unmatched @keyup.enter.native="on_search()" placeholder="示例：(ipaddress:10.1.1* AND memory:[10 TO 20]) 更多请参阅Lucene语法" v-model="query" style="width: 100%">
        <!--<el-select  style="width: 250px" multiple filterable default-first-option placeholder="选择表 默认：all">-->
          <!--<el-option style="padding: 10px; display: flex; align-items: center; justify-content: space-between" >-->
            <!--<div>-->
              <!--<el-button style="padding: 0px" icon="el-icon-circle-plus" ></el-button>-->
              <!--<el-button style="padding: 0px" icon="el-icon-info" ></el-button>-->
            <!--</div>-->
          <!--</el-option>-->
        <!--</el-select>-->
        <el-button id="submit" @click="on_search()" slot="append" icon="el-icon-search" ></el-button>
      </el-autocomplete>
    </div>
    <div style="border: 1px #DCDFE6 solid; margin: 10px 0px; width: 100%; overflow-x: auto">
      <header-item></header-item>
      <data-item v-for="item in data" :data="item" :key="item._id" v-on:delete_data="delete_data" ></data-item>
    </div>
    <!--<el-pagination style="float: right; margin-right: 100px;" background layout="total, prev, pager, next" >-->
    <!--</el-pagination>-->
    <el-pagination style="float: right; margin-right: 100px;" background layout="total, prev, pager, next" :page-size="page_size" :total="total_num" :current-page.sync="current_page" @current-change="on_page_change">
    </el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
import DataItem from "./components/DataItem.vue";
import HeaderItem from "./components/HeaderItem.vue"
import master from "@/api";
import axios from "axios";
import moment from 'moment'

export default {
  name: "DisplayData",
  components: {
    DataItem,
    HeaderItem
  },
  data(){
    return {

      exportList: [],
      search_input_icon: "el-icon-edit",
      is_focus: true,
      current_query: "*",
      query:"",
      indices:"",
      current_indices:[],
      history:[],
      page_size:0,
      last_source:null,
      loading:false,
      page_num:0,
      current_page:0,
      data:[],
      total_num:0,
      submit_loading:false,
      data1:{
        'CPU': 'cpu',
        'U位': 'u_position',
        '一级产品线': 'first_name',
        '业务条线': 'bussiness_name',
        '业务系统': 'bussiness_system',
        '业务部门': 'department',
        '二级产品线': 'second_name',
        '内存（GB）': 'memory',
        '存储（GB）': 'disk',
        '房间': 'root',
        '所属环境': 'device_env_type_id',
        '技术负责人': 'manager',
        '操作系统': 'sys_name',
        '数据中心': 'idc_name',
        '服务器类型': 'device_type_id',
        '机架位置': 'rack_position',
        '物理机IP': 'parent',
        '设备型号':'equipment_type',
        '资源名称': 'asset_name',
        '采购日期': 'purchase_date',
        '序列号': 'sn'
      },
      // dataList:[],
      formupdata:{
      },
      formupdata_vm:{

      },
      phic:[],
      vm:[],
    }
  },
  mounted(){
    // var self = this;
    // mounted() {
    var self = this;
    document.onkeydown = function(e) {
      var keyNum = window.event ? e.keyCode : e.which;
      if (73 == e.keyCode && e.ctrlKey) {
        self.$refs.search_input.focus();
      } else if (78 == e.keyCode && e.ctrlKey) {
        if (self.current_page * self.page_size >= self.total_num) {
          self.$message.warning("已在末页");
          return;
        }
        self.current_page += 1;
        self.on_page_change(self.current_page);
      } else if (80 == e.keyCode && e.ctrlKey) {
        if (self.current_page == 1) {
          self.$message.warning("已在首页");
          return;
        }
        self.current_page -= 1;
        self.on_page_change(self.current_page);
      }
    };
    var page_size = Math.floor((window.innerHeight - 170) / 44);
    this.page_size = page_size > 8 ? page_size : 8;
    // this.get_history();
    // master
    //   .get("mgmt/table", { params: { page_size: 100, has_read_perms: true } })
    //   .then(response => {
    //     this.tables = response.data.results;
    //   })
    //   .catch(error => {});
    this.search_data("*", 1, this.page_size);
  // },
  },
  methods: {
    //报表导出前的查询
      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel');
          const tHeader =
            [
             '数据中心', '资源名称','IP地址', '操作系统', 'CPU', '内存', '存储', '业务系统', '一级产品线', '二级产品线', '技术负责人', '业务部门','采购日期',
              '服务器类型','所属环境','房间','机架位置', 'U位','设备型号','资源状态','物理机IP','序列号','服务器用途'
            ];
          let _this = this;
          let loading;
      loading = Vue.prototype.$loading({
        lock: true,
        text: "Loading...",
        target: document.querySelector('.download')//设置加载动画区域
      });
          master
          .post("get_all")
            .then(response => {
              // loading.close();
              console.log("oooooooooooo",response.data);
              response.data.vm.forEach((item, index) => {
                _this.vm.push(item);
                console.log("ttttt");
              })
              response.data.physical.forEach((item, index) => {
                _this.phic.push(item);
                console.log("ffff");
              })
              console.log('hhhhhhhh',this.execl_data);
              const filterVal =
                ['idc_name', 'asset_name','ipaddress','sys_name','cpu','memory','disk','bussiness_name',
                'first_name','second_name','manager','department','purchase_date','device_type_id','device_env_type_id','root','rack_position','u_position','equipment_type','device_status_id','parent','sn','purpose'];
              console.log("pppppppppppp",_this.phic);
              console.log("vvvvvvv",_this.vm);
              const phic_data = _this.formatJson(filterVal, _this.phic);
              const vm_data = _this.formatJson(filterVal, _this.vm);
              export_json_to_excel(tHeader, phic_data,vm_data, '**资产报表'+moment(new Date()).format('YYYYMMDDHHmmss'));
              loading.close();
          })
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    upload_file(status){
      let loading;
      loading = Vue.prototype.$loading({
        lock: true,
        text: "Loading...",
        target: document.querySelector('.upload')//设置加载动画区域
      });
      console.log(status);
      if (status == 'phic') {
        console.log("oooooooooooo",this.formupdata);
        master
          .post("data_import", this.formupdata, {timeout: 1000 * 60 * 2})
          .then(response => {
          loading.close();
      })
      }else {
        master
          .post("data_import", this.formupdata_vm, {timeout: 1000 * 60 * 2})
          .then(response => {
          loading.close();
        console.log("cccccccccccc")
      })
      }
    },
    importf(obj,e) {
        console.log("iiiiiii")
        var event = window.event || e;
        let _this = this;
        _this.submit_loading = true;
        let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据
        console.log("fffffffff");
        console.log("eeeeeeeeeeeeee",event.currentTarget.files[0])
        this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for(var i = 0; i < length; i++) {
                 binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            if(rABS) {
                 wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                      type: 'base64'
                 });
            } else {
                 wb = XLSX.read(binary, {
                      type: 'binary'
                 });
            }
            let dataList = {};
            let dataList_vm = {};
            // outdata就是你想要的东西 excel导入的数据
            dataList = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            dataList_vm = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]]);
            // console.log(_this.formupdata)
            console.log("lllllllllll",dataList);
            let da = [...dataList]
            let da_vm = [...dataList_vm]
            let arr = [];
            let arr_vm = [];
            da.map(v => {
                            let obj = {}
                            obj.cpu = v.CPU;
                            obj.u_position = v.U位;
                            obj.first_name = v.一级产品线;
                            obj.sn = v.序列号;
                            obj.bussiness_name = v.业务条线;
                            obj.bussiness_system = v.业务系统;
                            obj.department = v.业务部门;
                            // obj.contact = v.业务负责人;
                            obj.manager = v.技术负责人;
                            obj.second_name = v.二级产品线;
                            obj.memory = v.内存;
                            obj.disk = v.存储;
                            obj.root = v.房间;
                            obj.device_env_type_id = v.所属环境;
                            obj.manager = v.技术负责人;
                            obj.sys_name = v.操作系统;
                            obj.idc_name = v.数据中心;
                            obj.device_type_id = v.服务器类型;
                            obj.rack_position = v.机架位置;
                            obj.ipaddress = v.IP地址;
                            obj.parent = v.物理机IP;
                            obj.equipment_type = v.设备型号;
                            obj.asset_name = v.资源名称;
                            obj.purchase_date = v.采购日期;
                            obj.device_status_id = v.状态;
                            obj.purpose = v.服务器用途;
                            // obj.status = v.
                            arr.push(obj)
                        })
            da_vm.map(v => {
                            let obj = {}
                            obj.cpu = v.CPU;
                            obj.u_position = v.U位;
                            obj.first_name = v.一级产品线;
                            obj.bussiness_name = v.业务条线;
                            obj.bussiness_system = v.业务系统;
                            obj.department = v.业务部门;
                            // obj.contact = v.业务负责人;
                            obj.manager = v.技术负责人;
                            obj.second_name = v.二级产品线;
                            obj.memory = v.内存;
                            obj.disk = v.存储;
                            obj.root = v.房间;
                            obj.device_env_type_id = v.所属环境;
                            obj.manager = v.技术负责人;
                            obj.sys_name = v.操作系统;
                            obj.idc_name = v.数据中心;
                            obj.device_type_id = v.服务器类型;
                            obj.rack_position = v.机架位置;
                            obj.ipaddress = v.IP地址;
                            obj.parent = v.物理机IP;
                            obj.equipment_type = v.设备型号;
                            obj.asset_name = v.资源名称;
                            obj.purchase_date = v.采购日期;
                            obj.device_status_id = v.状态;
                            obj.purpose = v.服务器用途;
                            // obj.status = v.状态
                            arr_vm.push(obj)
                        })
            console.log("rrrrrrr",arr_vm)
            console.log("yyyyyyyy",arr)
            _this.formupdata_vm.data = arr_vm;
            _this.formupdata.data = arr;
            console.log("===========",_this.formupdata_vm.data);
            console.log("+++++++++++++",_this.formupdata.data);
            _this.$message.success("数据准备完毕！！！ 请上传");
            // _this.accountList = [...arr];
            // console.log( _this.accountList)
             // _this.reload();
             }
             reader.readAsArrayBuffer(f);
         }
         if(rABS) {
              reader.readAsArrayBuffer(f);
         } else {
              reader.readAsBinaryString(f);
         }
    },
    importSubmit(){
          let vm = this;
          if(!vm.userData.length){
              vm.$message.error({message:'请上传文件'});
              return false;
          }
          let pdata = this.formupdata.data;
          util.ajax.post('data_import',pdata).then(function (response) {
              let res = response.data;
              if (res.code == 200) {
                  vm.importVisible=false;
                  vm.$notify.error(d.message);
                  location.reload();
              } else {
                  console.log(response);
              }
          });
      },
    on_focus(event) {
      console.log("on_focus");
      event.currentTarget.select();
    },
    filter_function(query_string) {
      return value => {
        return value.toLowerCase().indexOf(query_string.toLowerCase()) != -1;
      };
    },
    on_page_change(val) {
      console.log("val:", val);
      this.current_page = val;
      this.search_data(
        this.current_indices,
        this.current_query,
        val,
        this.page_size
      );
      },
    history_filter(query_string, cb) {
      console.log("query_string:", query_string);
      var values = query_string
        ? this.history.filter(this.filter_function(query_string))
        : this.history;
      var results = [];
      values.map(value => {
        results.push({ value });
      });
      console.log("results:", results);
      cb(results);
    },
    delete_data(data) {
      this.data.splice(this.data.indexOf(data), 1);

      this.total_num -= 1;
    },
    on_search() {
      const succeeded_callback = () => {
        this.current_query = this.query;
        this.current_indices = this.indices;
      };
      if (
        this.current_query == this.query &&
        this.current_indices == this.indices
      ) {
        this.$message.warning("重复搜索");
        return;
      }
      if (this.query == "") {
        this.query = "*";
      }
      this.is_focus = false;
      if (!this.history.includes(this.query)) {
        this.history.unshift(this.query);
      }
      this.page = 1;
      console.log("tttttttttt222222",this.query);
      this.search_data(
        this.indices,
        this.query,
        1,
        this.page_size,
        true,
        succeeded_callback
      );
      document.getElementById("submit").focus();
    },
    search_data(
      indices,
      query,
      page,
      page_size,
      reset_page = false,
      succeeded_callback = null
    ) {
      if (this.last_source) {
        // this.last_source.cancel()
      }
      var source = axios.CancelToken.source();
      this.last_source = source;
      var self = this;
      this.search_input_icon = "el-icon-loading";
      this.loading = true;
      master
        .post("data-es", { indices,query,page,page_size })
        .then(response => {
          this.loading = false;
          console.log("rrrrrrrrr", response.data["hits"])
          console.log(this.loading);
          self.data = response.data["hits"];
          console.log("eeeetttttt",self.data);
          this.total_num = response.data["total"];
          this.search_input_icon = "el-icon-edit";
          this.page_num = Math.ceil(response.data.total / this.page_size);
          if (reset_page) {
            this.current_page = 1;
          }
          if (succeeded_callback) {
            succeeded_callback();
          }
        })
        .catch(error => {
          this.loading = false;
          this.search_input_icon = "el-icon-edit";
        });
    },
  }
};
</script>
<style>
  .tips-import {
  text-align: left;
  .el-dialog_wrapper{display: block;}
}
.content-box .content {
  background: #fff;
  .import-intro {
    background: #fff5ea;
    text-align: center;
    padding: 10px;
    margin-bottom: 30px;
    .mgr20 {
      margin-right: 20px;
    }
  }
  .import-container {
    border: 1px solid #dbdbdb;
    text-align: center;
    padding: 50px 0;
    .mgbt30 {
      margin: 20px 0;
    }
  }
  .import-bottom {
    border: 1px solid #dbdbdb;
    border-top: none;
    padding: 20px 10px;
    background: #f5f5f5;
    .select-container {
      display: inline-block;
      width: 300px;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      border: 1px solid #dbdbdb;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      img {
        margin-right: 10px;
      }
      .select-item {
        position: absolute;
        background: #fff;
        width: 100%;
        left: 0;
        box-sizing: border-box;
        li {
          padding-left: 10px;
          &:hover {
            background: #dbdbdb;
          }
        }
      }
    }
    .change-dept {
      float: right;
      margin-right: 20px;
      font-size: 16px;
      line-height: 40px;
      color: #409eff;
      cursor: pointer;
    }
  }
}

</style>
