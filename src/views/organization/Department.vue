<template>
  <div>
    <el-card shadow="hover">
      <el-row style="padding-bottom: 15px">
        <el-button type="primary" icon="el-icon-plus" @click="newCompany">新增</el-button>
        <el-button icon="el-icon-upload">导入</el-button>
        <el-button>子部门排序</el-button>
      </el-row>

      <el-table :data="tableData" ref="multipleTable" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="ID" width="150"> </el-table-column>
        <el-table-column prop="deptName" label="部门"> </el-table-column>
        <el-table-column prop="short_name" label="部门简称"> </el-table-column>
        <el-table-column prop="parent_name" label="所属公司/中心">
          <template slot-scope="scope">
            <div>
              {{ scope.row.sub_company.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="people_num" label="上级部门"> </el-table-column>
        <el-table-column prop="people_num" label="部门负责人">
          <template slot-scope="scope">
            <div>
              {{ scope.row.dep_head.fullName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="people_num" label="兼任负责人"> </el-table-column>
        <el-table-column prop="people_num" label="工作城市">
          <template slot-scope="scope">
            <div>
              {{ scope.row.work_city ? scope.row.work_city : '不指定城市' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="nums" label="部门人数"> </el-table-column>
        <el-table-column prop="people_num" label="编制人数"> </el-table-column>
        <el-table-column prop="people_num" label="超缺编"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 0">禁用</p>
            <p v-else-if="scope.row.status == 1">启用</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button @click="newCompany(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small" style="color: #ff8c00">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :modal-append-to-body="false" :title="editFlag ? '编辑' : '新增'" :visible.sync="DialogFlag" width="60vw" @close="passCancel">
      <el-form :value="itemInfo" class="wid-100" inline label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称：">
              <el-input v-model.trim.number="itemInfo.name" clearable style="width: 300px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位简称：">
              <el-input v-model.trim.number="itemInfo.rebates" clearable style="width: 300px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型：">
              <el-select v-model="itemInfo.typeText" style="width: 300px">
                <el-option v-for="(item, index) in typeList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级：">
              <el-select v-model="itemInfo.parent_name" style="width: 300px">
                <el-option v-for="(item, index) in parentOptions" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位体系：">
              <el-select v-model="itemInfo.scheme" style="width: 300px">
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
      tableData: [
        {
          company_id: '4716',
          created_at: '2021-02-28 17:38:22',
          dep_head: { id: '1067233', fullName: '盛静银', profileImage: null, designation: '', mobileNumber: '18368490622' },
          deptName: '技术部',
          des_id: null,
          designation: '',
          ding_id: '0',
          ding_parentid: '0',
          employee_count: 0,
          feishu_id: '0',
          feishu_parent_id: '0',
          id: '18433',
          is_default: '0',
          nums: '0',
          order: '99999999',
          parent: [],
          parent_department: null,
          parent_id: '0',
          part_time_department_leaders: [],
          part_time_department_name: '',
          short_name: 'jsb',
          status: '1',
          sub_company: { id: 6949, company_id: 4716, pid: 0, type: 0, name: 'testCompany', status: 1 },
          sub_id: '6949',
          updated_at: '2021-02-28 17:38:22',
          wework_id: '0',
          wework_parentid: '0',
          work_city: null,
          work_city_id: '0',
        },
      ],
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
      parentOptions: [{ value: 'testCompany', label: 'testCompany' }],
      schemeOptions: [{ value: '', label: '暂无数据', disable: true }],
    };
  },
  mounted() {},
  methods: {
    newCompany(editContent) {
      if (!!editContent) {
        // 编辑
        this.editFlag = true;
        this.itemInfo = JSON.parse(JSON.stringify(editContent));
        console.log('this.itemInfo', this.itemInfo);
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
    passConfirm() {},
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
