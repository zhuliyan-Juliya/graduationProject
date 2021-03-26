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

    <el-dialog :modal-append-to-body="false" title="编辑" :visible.sync="showDataFlag" width="60vw" @close="passCancel">
      <el-form :value="itemInfo" class="wid-100" inline label-position="right" label-width="120px">
        <el-row>
          <!-- 可实现任意数据 驱动 视图， 减少重复代码 -->
          <template v-for="item in dialogData">
            <el-col :span="12" :key="item.label" v-if="item.visable">
              <el-form-item :label="item.label">
                <div v-if="item.type === 'input'">
                  <el-input v-model.trim="itemInfo[item.prop]" clearable style="width: 300px" placeholder="请输入..."></el-input>
                </div>
                <div v-else-if="item.type === 'select'">
                  <el-select v-model="itemInfo[item.prop]" clearable style="width: 300px" placeholder="请选择">
                    <el-option v-for="o in item.options" :key="o.value" :label="o.label" :value="o.value"></el-option>
                  </el-select>
                </div>
                <div v-else-if="item.type === 'date'">
                  <el-date-picker v-model="itemInfo[item.prop]" style="width: 300px" clearable type="date" placeholder="请选择"> </el-date-picker>
                </div>
                <div v-else-if="item.type === 'radio'" style="width: 300px; text-align: left">
                  <el-radio v-for="o in item.options" :key="o.value" :label="o.label" v-model="itemInfo[item.prop]"></el-radio>
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
          },
          data: [
            { type: 'input', visable: false, prop: '_id', label: '系统标识码', value: '' },
            { type: 'input', visable: false, prop: 'phone', label: '系统账号', value: '' },
            { type: 'input', visable: true, prop: 'serial_num', label: '员工编号', value: '' },
            { type: 'input', visable: true, prop: 'name', label: '姓名', value: '' },
            { type: 'input', visable: true, prop: 'show_name', label: '显示名', value: '' },
            { type: 'select', visable: true, prop: 'card_type', label: '证件类型', value: '', options: Select.card_type },
            { type: 'input', visable: true, prop: 'card_num', label: '证件号码', value: '' },
            { type: 'date', visable: true, prop: 'birth_date', label: '出生日期', value: '' },
            { type: 'input', visable: false, prop: 'age', label: '年龄', value: '' },
            { type: 'select', visable: true, prop: 'marital_status', label: '婚姻状况', value: '', options: Select.maritalStatus },
            { type: 'radio', visable: true, prop: 'sex', label: '性别', value: '', options: Select.sex },
            { type: 'select', visable: true, prop: 'hight_education', label: '最高学历', value: '', options: Select.hightEducation },
            { type: 'select', visable: true, prop: 'politics_status', label: '政治面貌', value: '', options: Select.politicsStatus },
            { type: 'input', visable: true, prop: 'nation', label: '民族', value: '' },
            { type: 'select', visable: true, prop: 'registered_type', label: '户口类型', value: '', options: Select.registeredType },
            { type: 'input', visable: true, prop: 'registered_address', label: '户籍地址', value: '' },
            { type: 'input', visable: true, prop: 'registered_permanent_residence', label: '户口所在地', value: '' },
          ],
        },
        {
          title: {
            titleLeft: '联系方式',
            dataName: 'showData2',
          },
          data: [
            { type: 'input', visable: true, prop: '', label: '通讯地址', value: '' },
            { type: 'input', visable: true, prop: '', label: '手机', value: '' },
            { type: 'input', visable: true, prop: '', label: '家庭电话', value: '' },
            { type: 'input', visable: true, prop: '', label: '公司邮箱', value: '' },
            { type: 'input', visable: true, prop: '', label: '个人邮箱', value: '' },
            { type: 'input', visable: true, prop: '', label: 'QQ', value: '' },
            { type: 'input', visable: true, prop: '', label: '微信', value: '' },
          ],
        },
        {
          title: {
            titleLeft: '在职信息',
            dataName: 'showData3',
          },
          data: [
            { type: 'select', visable: true, prop: '', label: '所属公司/中心', value: '' },
            { type: 'select', visable: true, prop: '', label: '部门', value: '' },
            { type: 'select', visable: true, prop: '', label: '职位', value: '' },
            { type: 'select', visable: true, prop: '', label: '工作城市', value: '' },
            { type: 'select', visable: true, prop: '', label: '工作性质', value: '' },
            { type: 'radio', visable: true, prop: '', label: '员工状态', value: '', options: Select.statusOptions },
            { type: 'date', visable: true, prop: '', label: '开始工作时间', value: '' },
            { type: 'date', visable: true, prop: '', label: '入职日期', value: '' },
            { type: 'select', visable: false, prop: '', label: '工龄', value: '' },
            { type: 'select', visable: false, prop: '', label: '司龄', value: '' },
            { type: 'date', visable: true, prop: '', label: '转正日期', value: '' },
            { type: 'select', visable: true, prop: '', label: '合同年限', value: '' },
            { type: 'date', visable: true, prop: '', label: '合同结束日期', value: '' },
            { type: 'select', visable: true, prop: '', label: '任职受雇类型', value: '' },
            { type: 'select', visable: false, prop: '', label: '岗位说明书', value: '' },
          ],
        },
      ],
      showDataFlag: false,
      itemInfo: {},
    };
  },
  props: ['staffInfo'],
  components: {
    SmallTitle,
    ShowData,
  },
  mounted() {
    this.showDataInfo[0].data.forEach(item => {
      let prop = item.prop;
      // 处理常规数据
      if (this.staffInfo.hasOwnProperty(prop)) {
        item.value = this.staffInfo[prop];
      }
      // 处理常规数据中是下拉框或者单选框的数据
      if (item.hasOwnProperty('options')) {
        let findValue = item.options.find(o => o.value == item.value);
        item.visableName = (findValue && findValue.label) || '';
      }
    });
    console.log('this.showDataInfo[0].data', this.showDataInfo[0].data);
  },
  methods: {
    passConfirm() {},
    passCancel() {
      this.showDataFlag = false;
    },
    editInfo(data) {
      this.showDataFlag = true;
      switch (data.dataName) {
        case 'showData1':
          this.dialogData = this.deepClone(this.showDataInfo[0].data);
          // 常规数据直接赋值
          for (let i = 0; i < this.dialogData.length; i++) {
            this.itemInfo[this.dialogData[i].prop] = this.dialogData[i].value;
          }
          // 复杂数据需要特殊处理

          break;
        case 'showData2':
          this.dialogData = this.deepClone(this.showDataInfo[1].data);
          break;
        case 'showData3':
          this.dialogData = this.deepClone(this.showDataInfo[2].data);
          break;
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
