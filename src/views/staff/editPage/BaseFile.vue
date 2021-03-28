<template>
  <div class="layout">
    <div class="ovHidden m-t-20" v-for="(item, index) in showDataInfo" :key="index">
      <SmallTitle :titleInfo="item.title" @editInfo="editInfo"></SmallTitle>
      <ShowData :showData="item.data"></ShowData>
    </div>
    <!-- <div class="ovHidden m-t-20">
      <SmallTitle :titleInfo="titleInfo2" @editInfo="editInfo"></SmallTitle>
      <ShowData :showData="showData2"></ShowData>
    </div>
    <div class="ovHidden m-t-20">
      <SmallTitle :titleInfo="titleInfo3" @editInfo="editInfo"></SmallTitle>
      <ShowData :showData="showData3"></ShowData>
    </div> -->

    <el-dialog :modal-append-to-body="false" title="编辑" :visible.sync="showDataFlag" width="80vw" @close="passCancel">
      <el-form :value="itemInfo" class="wid-100" inline label-position="right" label-width="120px">
        <el-row>
          <!-- 可实现任意数据 驱动 视图， 减少重复代码 -->
          <template v-for="item in dialogData">
            <el-col :span="12" :key="item.label" v-if="item.visable">
              <el-form-item :label="item.label">
                <div v-if="item.type === 'input'">
                  <el-input v-model.trim="itemInfo[item.prop]" type="text" clearable style="width: 300px" placeholder="请输入..."></el-input>
                </div>
                <div v-else-if="item.type === 'select'">
                  <el-select v-model="itemInfo[item.prop]" clearable style="width: 300px" placeholder="请选择">
                    <el-option v-for="o in item.options" :key="o.value" :label="o.label" :value="o.value"></el-option>
                  </el-select>
                </div>
                <div v-else-if="item.type === 'date'">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="itemInfo[item.prop]" style="width: 300px" clearable type="date" placeholder="请选择"> </el-date-picker>
                </div>
                <div v-else-if="item.type === 'radio'" style="width: 300px; text-align: left">
                  <el-radio-group v-model="itemInfo[item.prop]">
                    <el-radio v-for="o in item.options" :key="o.value" :label="o.value">{{ o.label }}</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
          </template>
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
import SmallTitle from '@src/components/smallTitle/smallTitle';
import ShowData from '@src/components/showData/showData';
import Select from '@src/assets/js/selectOptions';
import * as objUtil from '@src/assets/js/obj.js';
export default {
  data() {
    return {
      dialogData: [],
      // 渲染数据
      showDataInfo: [
        {
          title: {
            titleLeft: '基础信息',
            dataName: 'showData1',
            index: '0',
          },
          data: [
            { hidden: false, type: 'input', visable: false, prop: '_id', label: '系统标识码', value: '' },
            { hidden: false, type: 'input', visable: false, prop: 'phone', label: '系统账号', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'serial_num', label: '员工编号', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'name', label: '姓名', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'show_name', label: '显示名', value: '' },
            { hidden: false, type: 'select', visable: true, prop: 'card_type', label: '证件类型', value: '', options: Select.card_type },
            { hidden: false, type: 'input', visable: true, prop: 'card_num', label: '证件号码', value: '' },
            { hidden: false, type: 'date', visable: true, prop: 'birth_date', label: '出生日期', value: '' },
            { hidden: false, type: 'input', visable: false, prop: 'age', label: '年龄', value: '' },
            { hidden: false, type: 'select', visable: true, prop: 'marital_status', label: '婚姻状况', value: '', options: Select.maritalStatus },
            { hidden: false, type: 'radio', visable: true, prop: 'sex', label: '性别', value: '', options: Select.sex },
            { hidden: false, type: 'select', visable: true, prop: 'hight_education', label: '最高学历', value: '', options: Select.hightEducation },
            { hidden: false, type: 'select', visable: true, prop: 'politics_status', label: '政治面貌', value: '', options: Select.politicsStatus },
            { hidden: false, type: 'input', visable: true, prop: 'nation', label: '民族', value: '' },
            { hidden: false, type: 'select', visable: true, prop: 'registered_type', label: '户口类型', value: '', options: Select.registeredType },
            { hidden: false, type: 'input', visable: true, prop: 'registered_address', label: '户籍地址', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'registered_permanent_residence', label: '户口所在地', value: '' },
          ],
        },
        {
          title: {
            titleLeft: '联系方式',
            dataName: 'showData2',
            index: '1',
          },
          data: [
            { hidden: true, type: 'input', visable: false, prop: '_id', label: '系统标识码', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'postal_address', label: '通讯地址', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'phone', label: '手机', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'family_phone', label: '家庭电话', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'company_emile', label: '公司邮箱', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'person_email', label: '个人邮箱', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'qq', label: 'QQ', value: '' },
            { hidden: false, type: 'input', visable: true, prop: 'weixin', label: '微信', value: '' },
          ],
        },
        {
          title: {
            titleLeft: '在职信息',
            dataName: 'showData3',
            index: '2',
          },
          data: [
            { hidden: true, type: 'input', visable: false, prop: '_id', label: '系统标识码', value: '' },
            { hidden: false, type: 'select', visable: true, prop: 'company_id', label: '所属公司/中心', value: '', options: this.s_companyList },
            { hidden: false, type: 'select', visable: true, prop: 'department_id', label: '部门', value: '', options: this.s_departmentList },
            { hidden: false, type: 'select', visable: true, prop: 'category_id', label: '职位', value: '', options: this.s_categoryList },
            { hidden: false, type: 'select', visable: true, prop: 'city_id', label: '工作城市', value: '', options: this.s_cityList },
            { hidden: false, type: 'select', visable: true, prop: 'job_category', label: '工作性质', value: '', options: Select.workTypeListOptions },
            { hidden: false, type: 'radio', visable: true, prop: 'staff_status', label: '员工状态', value: '', options: Select.statusOptions },
            { hidden: false, type: 'date', visable: true, prop: 'start_work_time', label: '开始工作时间', value: '' },
            { hidden: false, type: 'date', visable: true, prop: 'join_time', label: '入职日期', value: '' },
            { hidden: false, type: 'select', visable: false, prop: '', label: '工龄', value: '' },
            { hidden: false, type: 'input', visable: false, prop: 'runTime', label: '司龄', value: '' },
            { hidden: false, type: 'date', visable: false, prop: 'full_member_time', label: '转正日期', value: '' },
            { hidden: false, type: 'select', visable: true, prop: 'contract_time', label: '合同年限', value: '' },
            { hidden: false, type: 'date', visable: true, prop: '', label: '合同结束日期', value: '' },
            { hidden: false, type: 'select', visable: true, prop: 'employment_type', label: '任职受雇类型', value: '', options: Select.employmentType },
            { hidden: false, type: 'select', visable: false, prop: '', label: '岗位说明书', value: '' },
          ],
        },
      ],
      showDataFlag: false,
      itemInfo: {},
    };
  },
  props: ['staffInfo', 's_companyList', 's_departmentList', 's_categoryList', 's_cityList'],
  watch: {
    staffInfo: {
      handler(val) {
        console.log('val', val);
        this.initForm();
        this.initFormData();
      },
      deep: true,
    },
  },
  components: {
    SmallTitle,
    ShowData,
  },
  created() {
    this.getChooseData().then(() => {
      this.initForm();
      this.initFormData();
    });
  },
  methods: {
    // 把 staffInfo 的数据传入到本组件内
    initFormData() {
      for (let i = 0; i < this.showDataInfo.length; i++) {
        this.showDataInfo[i].data.forEach(item => {
          let prop = item.prop;
          // 处理常规数据
          if (this.staffInfo.hasOwnProperty(prop)) {
            item.value = this.staffInfo[prop];
          }
          // 处理常规数据中是下拉框或者单选框的数据
          if (item.hasOwnProperty('options')) {
            let findValue = item.options.find(o => o.value == item.value);
            let visableName = (findValue && findValue.label) || '';
            this.$set(item, 'visableName', visableName);
          }
        });
      }
    },
    // 响应式的绑定 表单 内容
    initForm() {
      // 合并数组
      let tempArr1 = this.showDataInfo.map(item => item.data);
      // 二维数组拍平
      let tempArr2 = tempArr1.reduce((pre, cur) => pre.concat(cur), []);
      //	因为itemInfo在vue data中只是一个对象，vue无法响应式的监听对象内容，导致编辑弹框无法输入，$set可以让vue响应式的监听后面添加的内容
      tempArr2.forEach(item => {
        this.$set(this.itemInfo, item.prop, '');
      });
    },
    async passConfirm() {
      let obj = objUtil.deleteInvalidProp(this.itemInfo);
      let { success } = await this.$api.editEmployee(obj);
      if (success) {
        this.$message.success('信息编辑成功~');
        this.showDataFlag = false;
        this.$emit('finishEdit');
      }
      // 与 async await 配合使用的效果一样，代码量稍多一点
      // this.$api.editEmployee(this.itemInfo).then(res => {
      //   if (res.success) {
      //     this.$message.success('信息编辑成功~');
      //   }
      // });
    },
    passCancel() {
      this.showDataFlag = false;
    },
    editInfo(data) {
      this.showDataFlag = true;

      let { index } = data; // es6 结构赋值

      this.dialogData = this.deepClone(this.showDataInfo[index].data);
      // 常规数据直接赋值
      for (let i = 0; i < this.dialogData.length; i++) {
        this.itemInfo[this.dialogData[i].prop] = this.dialogData[i].value;
      }
    },
  },
};
</script>
<style lang='less' scoped>
/deep/.el-dialog__header {
  text-align: left;
}
</style>
