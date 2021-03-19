<template>
  <div>
    <el-card shadow="hover">
      <el-row style="padding-bottom: 15px">
        <el-button type="primary" icon="el-icon-plus" @click="newWorkCity()">新增</el-button>
      </el-row>

      <el-table :data="tableData" ref="multipleTable" style="width: 100%" v-loading="tableLoading">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="login_name" label="用户账号"> </el-table-column>
        <el-table-column prop="login_pwd" label="用户密码"> </el-table-column>
        <el-table-column prop="real_name" label="真实姓名"> </el-table-column>
        <el-table-column prop="nike_name" label="昵称"> </el-table-column>

        <el-table-column fixed="right" label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button @click="newWorkCity(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" style="color: #ff8c00" @click="deleteCity(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :modal-append-to-body="false" :title="editFlag ? '编辑' : '新增'" :visible.sync="DialogFlag" width="60vw" @close="passCancel">
      <el-form :value="itemInfo" class="wid-100" inline label-position="right" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户账号：">
              <el-input v-model.trim="itemInfo.login_name" placeholder="请输入账号" clearable style="width: 300px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码：">
              <el-input v-model.trim="itemInfo.login_pwd" placeholder="请输入密码" clearable style="width: 300px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名：">
              <el-input v-model.trim="itemInfo.real_name" placeholder="请输入真实姓名" clearable style="width: 300px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称：">
              <el-input v-model.trim="itemInfo.nike_name" placeholder="请输入昵称" clearable style="width: 300px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限：">
              <el-select v-model="itemInfo.power" placeholder="请选择" style="width: 300px">
                <el-option v-for="item in powerOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
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
      powerOptions: [
        { value: '0', label: '超级管理员' },
        { value: '1', label: '管理员' },
        { value: '2', label: '员工' },
      ],
    };
  },
  mounted() {
    this.getAccoundList();
  },
  methods: {
    toggleStatus(item) {
      let obj = {
        status: Number(!item.status),
        id: item._id,
      };
      this.$api.toggleCityStatus(obj).then(res => {
        if (res.success) {
          this.getAccoundList();
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
        this.itemInfo = {};
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
        this.$api.editCity(this.itemInfo).then(res => {
          if (res.success) {
            this.getAccoundList();
          }
        });
      } else {
        this.$api.creatAccount(this.itemInfo).then(res => {
          if (res.success) {
            this.getAccoundList();
          }
        });
      }
    },
    getAccoundList() {
      this.tableLoading = true;
      this.$api.getAccountList().then(res => {
        this.tableLoading = false;
        if (res.success) {
          this.tableData = res.data;
        }
      });
    },
    deleteCity(id) {
      this.$api.deleteCity({ id: id }).then(res => {
        if (res.success) {
          this.getAccoundList();
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
