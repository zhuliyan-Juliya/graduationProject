<template>
  <div>
    <el-card shadow="hover">
      <el-row style="padding-bottom: 15px">
        <el-button type="primary" icon="el-icon-plus" @click="newDesignation()">新增</el-button>
      </el-row>

      <el-table :data="tableData" ref="multipleTable" style="width: 100%" v-loading="tableLoading">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="designation" label="职位" width="150"> </el-table-column>
        <el-table-column prop="parent_name" label="所属部门" width="150">
          <template slot-scope="scope">
            <div>
              {{ scope.row.department ? scope.row.department.name : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="parent_name" label="所属公司/中心" width="150">
          <template slot-scope="scope">
            <div>
              {{ scope.row.department ? scope.row.department.company.name : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="parent_name" label="上级职位" width="150">
          <template slot-scope="scope">
            <div>
              {{ scope.row.parentJobClass ? scope.row.parentJobClass.designation : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="parent_name" label="职类" width="150">
          <template slot-scope="scope">
            <div>
              {{ scope.row.jobClass ? scope.row.jobClass.name : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="parent_name" label="默认职级" width="150"> </el-table-column>
        <el-table-column prop="parent_name" label="职位人数" width="150"> </el-table-column>
        <el-table-column prop="parent_name" label="编制人数" width="150"> </el-table-column>
        <el-table-column prop="parent_name" label="超缺编" width="150"> </el-table-column>
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
            <el-button type="text" size="small" @click="toggleStatus(scope.row)">
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </el-button>
            <el-button type="text" size="small" style="color: #ff8c00" @click="deleteDesignation(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :modal-append-to-body="false" :title="editFlag ? '编辑' : '新增'" :visible.sync="DialogFlag" width="60vw" @close="passCancel">
      <el-form :value="itemInfo" class="wid-100" inline label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="职位名称：">
              <el-input v-model.trim="itemInfo.designation" clearable style="width: 300px" placeholder="请输入职位名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态：">
              <el-radio v-model="itemInfo.status" :label="1">启用</el-radio>
              <el-radio v-model="itemInfo.status" :label="0">禁用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门：">
              <el-select v-model="itemInfo.deptID" style="width: 300px" clearable>
                <el-option v-for="(item, index) in departmentOptions" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职类：">
              <el-select v-model="itemInfo.jobClassID" style="width: 300px" clearable>
                <el-option v-for="(item, index) in jobCategory" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级职位部门：">
              <el-select v-model="itemInfo.superiorDeptID" style="width: 300px" clearable>
                <el-option v-for="(item, index) in departmentOptions" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级职位：">
              <el-select v-model="itemInfo.pid" style="width: 300px" clearable>
                <el-option v-for="(item, index) in parrentList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="岗位说明书：">
              <el-input v-model="itemInfo.desc" type="textarea" :rows="3" style="width: 300px" placeholder="请输入..."></el-input>
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
      tableData: [],
      editFlag: false,
      itemInfo: {},
      sourceData: {
        status: 1,
      },
      parrentList: [],
      departmentOptions: [],
      jobCategory: [],
    };
  },
  created() {
    this.getDesignationList();
    this.getJobCategory();
    this.getDepartmentList();
  },
  mounted() {},
  methods: {
    getDepartmentList() {
      this.$api.getDepartmentList().then(res => {
        if (res.success) {
          this.departmentOptions = res.data.map(item => {
            return { label: item.name, value: item._id };
          });
        }
      });
    },
    // 获取职类信息
    getJobCategory() {
      this.$api.getCategoryList().then(res => {
        if (res.success) {
          this.jobCategory = res.data.map(item => {
            return { label: item.name, value: item._id };
          });
        }
      });
    },
    toggleStatus(item) {
      let obj = {
        status: Number(!item.status),
        id: item._id,
      };
      this.$api.toggleDesignationStatus(obj).then(res => {
        if (res.success) {
          this.getDesignationList();
        }
      });
    },
    newDesignation(editContent) {
      if (!!editContent) {
        // 编辑
        this.editFlag = true;

        this.itemInfo = JSON.parse(JSON.stringify(editContent));
      } else {
        this.editFlag = false;
        console.log('default', this.sourceData);
        this.itemInfo = JSON.parse(JSON.stringify(this.sourceData));
      }
      this.DialogFlag = true;
    },
    passCancel() {
      this.DialogFlag = false;
    },
    passConfirm() {
      this.DialogFlag = false;
      if (this.editFlag) {
        this.$api.editDesignation(this.itemInfo).then(res => {
          if (res.success) {
            this.getDesignationList();
          }
        });
      } else {
        this.$api.creatDesignation(this.itemInfo).then(res => {
          if (res.success) {
            this.getDesignationList();
          }
        });
      }
    },
    getDesignationList() {
      this.tableLoading = true;
      this.$api.getDesignationList().then(res => {
        this.tableLoading = false;
        if (res.success) {
          this.tableData = res.data;
          this.parrentList = res.data.map(item => {
            return { label: item.designation, value: item._id };
          });
        }
      });
    },
    deleteDesignation(id) {
      this.$api.deleteDesignation({ id: id }).then(res => {
        if (res.success) {
          this.getDesignationList();
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style lang='less' scoped>
body {
}
</style>
