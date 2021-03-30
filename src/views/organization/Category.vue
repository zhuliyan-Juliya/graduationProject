<template>
  <div>
    <el-card shadow="hover">
      <el-row style="padding-bottom: 15px" v-if="isManager">
        <el-button type="primary" icon="el-icon-plus" @click="newWorkCity()">新增</el-button>
      </el-row>

      <el-table :data="tableData" ref="multipleTable" style="width: 100%" v-loading="tableLoading">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="职类" width="150"> </el-table-column>
        <el-table-column prop="parent_name" label="上级职类" width="150"> </el-table-column>
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
            <el-button @click="newWorkCity(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="toggleStatus(scope.row)">
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </el-button>
            <el-button type="text" size="small" style="color: #ff8c00" @click="deleteCity(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :modal-append-to-body="false" :title="editFlag ? '编辑' : '新增'" :visible.sync="DialogFlag" :width="dialogWidth" @close="passCancel">
      <el-form :value="itemInfo" class="wid-100" inline label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="职类名称：">
              <el-input v-model.trim="itemInfo.name" clearable :style="{ width: formWidth }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级职类：">
              <el-select v-model="itemInfo.pid" :style="{ width: formWidth }" clearable>
                <el-option v-for="(item, index) in parrentList" :key="index" :value="item.value" :label="item.label" />
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
      editFlag: false,
      itemInfo: {},
      sourceData: {
        status: 1,
      },
      parrentList: [],
      parentOptions: [{ value: 'testCompany', label: 'testCompany' }],
      schemeOptions: [{ value: '', label: '暂无数据', disable: true }],
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    toggleStatus(item) {
      let obj = {
        status: Number(!item.status),
        id: item._id,
      };
      this.$api.toggleCategoryStatus(obj).then(res => {
        if (res.success) {
          this.getCategoryList();
        }
      });
    },
    newWorkCity(editContent) {
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
      if (this.editFlag) {
        this.$api.editCategory(this.itemInfo).then(res => {
          if (res.success) {
            this.getCategoryList();
          }
        });
      } else {
        this.$api.creatCategory(this.itemInfo).then(res => {
          if (res.success) {
            this.getCategoryList();
          }
        });
      }
    },
    getCategoryList() {
      this.tableLoading = true;
      this.$api.getCategoryList().then(res => {
        this.tableLoading = false;
        if (res.success) {
          this.tableData = res.data;
          this.tableData.forEach(item => {
            if (item.parent) {
              item.parent_name = item.parent.name;
            }
          });
          console.log('res.data', res.data);
          this.parrentList = res.data.map(item => {
            return { label: item.name, value: item._id };
          });
        }
      });
    },
    deleteCity(id) {
      this.$api.deleteCategory({ id: id }).then(res => {
        if (res.success) {
          this.getCategoryList();
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
