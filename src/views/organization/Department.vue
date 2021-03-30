<template>
  <div>
    <el-card shadow="hover">
      <el-row style="padding-bottom: 15px" v-if="isManager">
        <el-button type="primary" icon="el-icon-plus" @click="newDepartment()">新增</el-button>
        <el-button icon="el-icon-upload">导入</el-button>
        <el-button>子部门排序</el-button>
      </el-row>

      <el-table :data="tableData" ref="multipleTable" style="width: 100%" v-loading="tableLoading">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="部门"> </el-table-column>
        <el-table-column prop="short_name" label="部门简称"> </el-table-column>
        <el-table-column prop="parent_name" label="所属公司/中心">
          <template slot-scope="scope">
            <div>
              {{ scope.row.company ? scope.row.company.name : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="parent" label="上级部门">
          <template slot-scope="scope">
            <div>
              {{ scope.row.parent ? scope.row.parent.name : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="people_num" label="部门负责人">
          <template slot-scope="scope">
            <div>
              {{ scope.row.dep_head ? scope.row.dep_head.fullName : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="people_num" label="兼任负责人"> </el-table-column>
        <el-table-column prop="people_num" label="工作城市">
          <template slot-scope="scope">
            <div>
              {{ scope.row.city ? scope.row.city.region_name : '不指定城市' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="nums" label="部门人数"> </el-table-column>
        <el-table-column prop="people_num" label="编制人数"> </el-table-column>
        <el-table-column prop="people_num" label="超缺编"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 0">
              <span class="forbidden">
                <span>禁用</span>
              </span>
            </p>
            <p v-else>
              <span class="startUse">
                <span>启用</span>
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120" v-if="isManager">
          <template slot-scope="scope">
            <el-button @click="newDepartment(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="toggleStatus(scope.row)">
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </el-button>
            <el-button type="text" size="small" style="color: #ff8c00" @click="deleteDepartment(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :modal-append-to-body="false" :title="editFlag ? '编辑' : '新增'" :visible.sync="DialogFlag" :width="dialogWidth" @close="passCancel">
      <el-form :value="itemInfo" class="wid-100" inline label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称：">
              <el-input v-model.trim="itemInfo.name" clearable style="width: 300px" placeholder="请输入部门名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门简称：">
              <el-input v-model.trim="itemInfo.short_name" clearable style="width: 300px" placeholder="请输入部门简称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属公司：">
              <el-select v-model="itemInfo.companyID" style="width: 300px" clearable>
                <el-option v-for="(item, index) in companyList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级部门：">
              <el-select v-model="itemInfo.parentID" style="width: 300px" clearable>
                <el-option v-for="(item, index) in parentOptions" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在城市：">
              <el-select v-model="itemInfo.cityID" style="width: 300px">
                <el-option v-for="(item, index) in cityOptions" :key="index" :disabled="item.disable" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态：">
              <el-radio v-model="itemInfo.status" :label="1">启用</el-radio>
              <el-radio v-model="itemInfo.status" :label="0">禁用</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="passCancel">取 消</el-button>
        <el-button type="primary" @click="passConfirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      DialogFlag: false,
      tableLoading: false,
      companyList: [],
      tableData: [],
      editFlag: false,
      itemInfo: {},
      sourceData: {
        status: 1,
      },
      typeList: [
        { value: '总部', label: '总部' },
        { value: '分部', label: '分部' },
        { value: '中心', label: '中心' },
      ],
      parentOptions: [],
      cityOptions: [],
    };
  },
  mounted() {
    this.getDepartmentList();
    this.getCompanyList();
    this.getWorkCityList();
  },
  methods: {
    getCompanyList() {
      this.$api.getCompanyList().then(res => {
        if (res.success) {
          this.companyList = res.data.map(item => {
            return { label: item.name, value: item._id };
          });
        }
      });
    },
    getWorkCityList() {
      this.$api.getCityList().then(res => {
        if (res.success) {
          this.cityOptions = res.data.map(item => {
            return { label: item.region_name, value: item._id };
          });
        }
      });
    },
    toggleStatus(item) {
      let obj = {
        status: Number(!item.status),
        id: item._id,
      };
      this.tableLoading = true;
      this.$api.toggleDepartmentStatus(obj).then(res => {
        if (res.success) {
          this.getDepartmentList();
        }
      });
    },
    newDepartment(editContent) {
      if (!!editContent) {
        // 编辑
        this.editFlag = true;
        this.itemInfo = JSON.parse(JSON.stringify(editContent));
      } else {
        this.editFlag = false;
        this.itemInfo = JSON.parse(JSON.stringify(this.sourceData));
      }
      this.DialogFlag = true;
    },
    deleteDepartment(id) {
      this.tableLoading = true;
      this.$api.deleteDepartment({ id: id }).then(res => {
        if (res.success) {
          this.getDepartmentList();
        }
      });
    },
    passCancel() {
      this.DialogFlag = false;
    },
    passConfirm() {
      this.DialogFlag = false;
      if (this.editFlag) {
        this.$api.editDepartment(this.itemInfo).then(res => {
          if (res.success) {
            this.getDepartmentList();
          }
        });
      } else {
        this.$api.creatDepartment(this.itemInfo).then(res => {
          if (res.success) {
            this.getDepartmentList();
          }
        });
      }
    },
    getDepartmentList() {
      this.tableLoading = true;
      this.$api.getDepartmentList().then(res => {
        this.tableLoading = false;
        if (res.success) {
          this.tableData = res.data;
          this.parentOptions = res.data.map(item => {
            return { label: item.name, value: item._id };
          });
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
body {
}
</style>
