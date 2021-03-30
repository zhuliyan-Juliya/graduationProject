<template>
  <div>
    <el-card shadow="hover">
      <el-row style="padding-bottom: 15px" v-if="isManager">
        <el-button type="primary" icon="el-icon-plus" @click="newCompany()">新增</el-button>
        <el-button>子公司排序</el-button>
        <el-button>部门排序</el-button>
      </el-row>

      <el-table :data="tableData" ref="multipleTable" style="width: 100%" v-loading="tableLoading">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="名称" width="150"> </el-table-column>
        <el-table-column prop="short_name" label="单位简称"> </el-table-column>
        <el-table-column prop="typeText" label="类型"> </el-table-column>
        <el-table-column prop="parent_name" label="上级"> </el-table-column>
        <el-table-column prop="people_num" label="人数"> </el-table-column>
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
        <el-table-column prop="scheme" label="职位体系"> </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120" v-if="isManager">
          <template slot-scope="scope">
            <el-button @click="newCompany(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="toggleStatus(scope.row)">
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </el-button>
            <el-button type="text" size="small" style="color: #ff8c00" @click="deleteCompany(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :modal-append-to-body="false" :title="editFlag ? '编辑' : '新增'" :visible.sync="DialogFlag" :width="dialogWidth" @close="passCancel">
      <el-form :value="itemInfo" class="wid-100" inline label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称：">
              <el-input v-model.trim="itemInfo.name" clearable :style="{ width: formWidth }" placeholder="请输入公司名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位简称：">
              <el-input v-model.trim="itemInfo.short_name" clearable :style="{ width: formWidth }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型：">
              <el-select v-model="itemInfo.typeText" :style="{ width: formWidth }" clearable>
                <el-option v-for="(item, index) in typeList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="itemInfo.typeText != '总部'">
            <el-form-item label="上级：">
              <el-select v-model="itemInfo.parent_name" :style="{ width: formWidth }" clearable>
                <el-option v-for="(item, index) in parentList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位体系：">
              <el-select v-model="itemInfo.scheme" :style="{ width: formWidth }" clearable>
                <el-option v-for="(item, index) in schemeOptions" :key="index" :disabled="item.disable" :value="item.value" :label="item.label" />
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
      tableData: [],
      parentList: [],
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
      schemeOptions: [{ value: '技术员', label: '技术员' }],
      // schemeOptions: [{ value: '', label: '暂无数据', disable: true }],
    };
  },
  mounted() {
    this.getCompanyList();
  },
  methods: {
    toggleStatus(item) {
      let obj = {
        status: Number(!item.status),
        id: item._id,
      };
      this.$api.toggleCompanyStatus(obj).then(res => {
        if (res.success) {
          this.getCompanyList();
          this.parentList = res.data.map(item => {
            return { label: item.name, value: item._id };
          });
        }
      });
    },
    newCompany(editContent) {
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
    passCancel() {
      this.DialogFlag = false;
      this.itemInfo = {};
    },
    passConfirm() {
      this.DialogFlag = false;
      if (this.itemInfo.typeText == '总部') {
        this.itemInfo.parent_name = '';
      }
      if (this.editFlag) {
        this.$api.editCompany(this.itemInfo).then(res => {
          if (res.success) {
            this.getCompanyList();
          }
        });
      } else {
        this.$api.creatCompany(this.itemInfo).then(res => {
          if (res.success) {
            this.getCompanyList();
          }
        });
      }
    },
    getCompanyList() {
      this.tableLoading = true;
      this.$api.getCompanyList().then(res => {
        this.tableLoading = false;
        if (res.success) {
          this.tableData = res.data;
        }
      });
    },
    deleteCompany(id) {
      this.$api.deleteCompany({ id: id }).then(res => {
        if (res.success) {
          this.getCompanyList();
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
