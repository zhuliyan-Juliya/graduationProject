<template>
  <div>
    <el-card shadow="hover" v-if="!editFlag">
      <el-row style="padding-bottom: 15px">
        <el-button type="primary" icon="el-icon-plus" @click="newEmployee()">添加员工</el-button>
      </el-row>

      <el-table :data="tableData" ref="multipleTable" style="width: 100%" v-loading="tableLoading">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
        <el-table-column prop="avtr" label="头像" width="150"> </el-table-column>
        <el-table-column prop="department_name" label="部门" width="150"> </el-table-column>
        <el-table-column prop="job_category_name" label="职位" width="150"> </el-table-column>
        <el-table-column prop="city_name" label="工作城市" width="150"> </el-table-column>
        <el-table-column prop="phone" label="手机" width="150"> </el-table-column>
        <el-table-column prop="company_emile" label="企业邮箱" width="150"> </el-table-column>
        <el-table-column prop="runTime" label="司龄" width="150"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.staff_status === '1'">
              <span class="success">
                <span>正式</span>
              </span>
            </p>
            <p v-else>
              <span class="warning">
                <span>试用</span>
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="parent_name" label="加入公司" width="150"> </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120" v-if="isManager">
          <template slot-scope="scope">
            <el-button @click="newEmployee(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteEmployee(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" style="color: #ff8c00" @click="deleteCity(scope.row._id)">办理离职</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="hover" v-else>
      <el-row style="padding-bottom: 15px">
        <el-button type="primary" icon="el-icon-plus" @click="editFlag = false">返回</el-button>
      </el-row>
      <EditEmployee
        :staffInfo.sync="staffInfo"
        :s_companyList="companyList"
        :s_categoryList="categoryList"
        :s_cityList="cityList"
        :s_departmentList="departmentList"
        @finishEdit="finishEdit"
      ></EditEmployee>
    </el-card>

    <el-dialog top="2%" :modal-append-to-body="false" :title="editFlag ? '编辑' : '新增'" :visible.sync="DialogFlag" width="80vw" @close="passCancel">
      <el-form :value="staffInfo" class="wid-100" inline label-position="right" label-width="7vw">
        <main class="clearfix">
          <aside style="width: 48%; margin: 0 1% 0 1%" class="fl">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>基础信息</span>
              </div>
              <el-form-item label="员工编号：">
                <el-input v-model.trim="staffInfo.serial_num" clearable style="width: 24vw"></el-input>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input v-model.trim="staffInfo.name" clearable style="width: 24vw"></el-input>
              </el-form-item>
              <el-form-item label="显示名：">
                <el-input v-model.trim="staffInfo.show_name" clearable style="width: 24vw"></el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-radio v-model="staffInfo.sex" :label="1">男</el-radio>
                <el-radio v-model="staffInfo.sex" :label="0">女</el-radio>
              </el-form-item>
              <el-form-item label="手机号：">
                <el-input v-model.number="staffInfo.phone" placeholder="境外手机请加国际电话区号，例：862-123456" clearable style="width: 24vw"></el-input>
              </el-form-item>
              <el-form-item label="企业邮箱：">
                <el-input v-model.number="staffInfo.company_emile" placeholder="请输入" clearable style="width: 24vw"></el-input>
              </el-form-item>
              <el-form-item label="证件类型：">
                <el-select v-model="staffInfo.card_type" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in cardListOptions" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码：">
                <el-input v-model.trim="staffInfo.card_num" clearable style="width: 24vw"></el-input>
              </el-form-item>
            </el-card>
          </aside>
          <aside style="width: 48%" class="fl">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>职位信息</span>
              </div>
              <el-form-item label="工作性质：">
                <el-select v-model="staffInfo.job_category" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in workTypeListOptions" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="员工状态：">
                <el-select v-model="staffInfo.staff_status" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in statusOptions" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="开始工作时间：">
                <el-date-picker value-format="yyyy-MM-dd" v-model="staffInfo.start_work_time" style="width: 24vw" type="date" placeholder="选择日期"> </el-date-picker>
              </el-form-item>
              <el-form-item label="入职时间：">
                <el-date-picker value-format="yyyy-MM-dd" v-model="staffInfo.join_time" style="width: 24vw" type="date" placeholder="选择日期"> </el-date-picker>
              </el-form-item>
              <el-form-item label="试用期：">
                <el-select v-model="staffInfo.probation_period" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in probationPeriodOptions" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="合同年限：">
                <el-select v-model="staffInfo.contract_time" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in contractOptions" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="所属公司/中心：">
                <el-select v-model="staffInfo.company_id" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in companyList" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="部门：">
                <el-select v-model="staffInfo.department_id" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in departmentList" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="职位：">
                <el-select v-model="staffInfo.category_id" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in categoryList" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="工作城市：">
                <el-select v-model="staffInfo.city_id" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in cityList" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="职级：">
                <el-select v-model="staffInfo.rank_id" style="width: 24vw" clearable>
                  <el-option v-for="(item, index) in rankList" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-card>
          </aside>
        </main>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="passCancel">取 消</el-button>
        <el-button type="primary" @click="passConfirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EditEmployee from './EditEmployee';
import Select from '@src/assets/js/selectOptions';
export default {
  name: 'Employee',
  data() {
    return {
      DialogFlag: false,
      tableLoading: false,
      tableData: [],
      editFlag: false,
      staffInfo: {},
      sourceData: {
        sex: 1,
      },
      parrentList: [],
      cardListOptions: Select.card_type,
      workTypeListOptions: Select.workTypeListOptions,
      statusOptions: Select.statusOptions,
      probationPeriodOptions: Select.probationPeriodOptions,
      contractOptions: Select.contractOptions,
      rankList: [],
    };
  },
  mounted() {
    this.getEmployeeList();
    this.getChooseData();
  },
  components: {
    EditEmployee,
  },
  methods: {
    async finishEdit() {
      let { data } = await this.getEmployeeList();
      let targetPeople = data.find(item => item._id === this.staffInfo._id);
      this.staffInfo = targetPeople;
    },
    deleteEmployee(item) {
      this.tableLoading = true;
      this.$api.deleteEmployee({ id: item._id }).then(res => {
        if (res.success) {
          this.getEmployeeList();
        }
      });
    },
    toggleStatus(item) {
      let obj = {
        status: Number(!item.status),
        id: item._id,
      };
      this.$api.toggleCategoryStatus(obj).then(res => {
        if (res.success) {
          this.getEmployeeList();
        }
      });
    },
    newEmployee(editContent) {
      if (!!editContent) {
        // 编辑
        this.editFlag = true;
        // this.
        this.staffInfo = JSON.parse(JSON.stringify(editContent));
      } else {
        this.editFlag = false;
        this.staffInfo = JSON.parse(JSON.stringify(this.sourceData));
        this.DialogFlag = true;
      }
    },
    passCancel() {
      this.DialogFlag = false;
      this.staffInfo = {};
    },
    passConfirm() {
      this.DialogFlag = false;
      if (this.editFlag) {
        this.$api.editCategory(this.staffInfo).then(res => {
          if (res.success) {
            this.getEmployeeList();
          }
        });
      } else {
        this.$api.creatEmployee(this.staffInfo).then(res => {
          if (res.success) {
            this.getEmployeeList();
          }
        });
      }
    },
    getEmployeeList() {
      this.tableLoading = true;
      return new Promise(resolve => {
        this.$api.getEmployeeList().then(res => {
          this.tableLoading = false;
          if (res.success) {
            this.tableData = res.data;
            this.tableData.forEach(item => {
              if (item.company) {
                item.company_name = item.company.name;
              }
              if (item.city) {
                item.city_name = item.city.region_name;
              }
              if (item.department) {
                item.department_name = item.department.name;
              }
              if (item.category) {
                item.job_category_name = item.category.name;
              }
            });
            this.parrentList = res.data.map(item => {
              return { label: item.name, value: item._id };
            });
          }
          resolve(res);
        });
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
/deep/ .el-card__header {
  font-size: 16px;
  font-weight: 700;
  background-color: #f2f4fa;
}
</style>
