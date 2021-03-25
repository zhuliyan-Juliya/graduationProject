<template>
  <div class="layout">
    <div class="ovHidden m-t-20">
      <SmallTitle :titleInfo="titleInfo1" @editInfo="editInfo"></SmallTitle>
      <ShowData :showData="showData1"></ShowData>
    </div>
    <div class="ovHidden m-t-20">
      <SmallTitle :titleInfo="titleInfo2" @editInfo="editInfo"></SmallTitle>
      <ShowData :showData="showData2"></ShowData>
    </div>
    <div class="ovHidden m-t-20">
      <SmallTitle :titleInfo="titleInfo3" @editInfo="editInfo"></SmallTitle>
      <ShowData :showData="showData3"></ShowData>
    </div>
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
export default {
  data() {
    return {
      titleInfo1: {
        titleLeft: '基础信息',
        dataName: 'showData1',
      },
      dialogData: [],
      showData1: [
        { type: 'input', visable: false, prop: '_id', label: '系统标识码', value: '123123123' },
        { type: 'input', visable: false, prop: 'phone', label: '系统账号', value: '13065158818' },
        { type: 'input', visable: true, prop: 'serial_num', label: '员工编号', value: '001' },
        { type: 'input', visable: true, prop: 'name', label: '姓名', value: '盛静银' },
        { type: 'input', visable: true, prop: 'show_name', label: '显示名', value: '盛静银' },
        { type: 'select', visable: true, prop: 'card_type', label: '证件类型', value: '剧名身份证' },
        { type: 'input', visable: true, prop: 'card_num', label: '证件号码', value: '剧名身份证' },
        { type: 'date', visable: true, prop: 'birth_date', label: '出生日期', value: '剧名身份证' },
        { type: 'input', visable: false, prop: '', label: '年龄', value: '剧名身份证' },
        {
          type: 'select',
          visable: true,
          prop: 'marital_status',
          label: '婚姻状况',
          value: '剧名身份证',
          options: [
            { label: '已婚', value: '0' },
            { label: '未婚', value: '1' },
            { label: '离异', value: '2' },
          ],
        },
        {
          type: 'radio',
          visable: true,
          prop: 'sex',
          label: '性别',
          value: 1,
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 },
          ],
        },
        {
          type: 'select',
          visable: true,
          prop: 'hight_education',
          label: '最高学历',
          value: '剧名身份证',
          options: [
            { label: '博士', value: 0 },
            { label: '硕士', value: 1 },
            { label: '本科', value: 2 },
            { label: '大专', value: 3 },
            { label: '其它', value: 4 },
          ],
        },
        {
          type: 'select',
          visable: true,
          prop: 'politics_status',
          label: '政治面貌',
          value: '剧名身份证',
          options: [
            { label: '中共党员', value: 0 },
            { label: '中共预备党员', value: 1 },
            { label: '共青团员', value: 2 },
            { label: '其它', value: 3 },
          ],
        },
        { type: 'input', visable: true, prop: 'nation', label: '民族', value: '剧名身份证' },
        {
          type: 'select',
          visable: true,
          prop: 'nation',
          label: '户口类型',
          value: '剧名身份证',
          options: [
            { label: '本地城镇', value: 0 },
            { label: '本地农村', value: 1 },
            { label: '外地城镇', value: 2 },
            { label: '外地农村', value: 3 },
          ],
        },
        { type: 'input', visable: true, prop: 'registered_address', label: '户籍地址', value: '剧名身份证' },
        { type: 'input', visable: true, prop: 'registered_permanent_residence', label: '户口所在地', value: '剧名身份证' },
      ],
      titleInfo2: {
        titleLeft: '联系方式',
        dataName: 'showData2',
      },
      showData2: [
        { type: 'input', visable: true, prop: '', label: '通讯地址', value: '123123123' },
        { type: 'input', visable: true, prop: '', label: '手机', value: '13065158818' },
        { type: 'input', visable: true, prop: '', label: '家庭电话', value: '001' },
        { type: 'input', visable: true, prop: '', label: '公司邮箱', value: '盛静银' },
        { type: 'input', visable: true, prop: '', label: '个人邮箱', value: '剧名身份证' },
        { type: 'input', visable: true, prop: '', label: 'QQ', value: '剧名身份证' },
        { type: 'input', visable: true, prop: '', label: '微信', value: '剧名身份证' },
      ],
      titleInfo3: {
        titleLeft: '在职信息',
        dataName: 'showData3',
      },
      showData3: [
        { type: 'select', visable: true, prop: '', label: '所属公司/中心', value: '123123123' },
        { type: 'select', visable: true, prop: '', label: '部门', value: '13065158818' },
        { type: 'select', visable: true, prop: '', label: '职位', value: '001' },
        { type: 'select', visable: true, prop: '', label: '工作城市', value: '盛静银' },
        { type: 'select', visable: true, prop: '', label: '工作性质', value: '剧名身份证' },
        {
          type: 'radio',
          visable: true,
          prop: '',
          label: '员工状态',
          value: '剧名身份证',
          options: [
            { label: '正式', value: '1' },
            { label: '试用', value: '2' },
          ],
        },
        { type: 'date', visable: true, prop: '', label: '开始工作时间', value: '剧名身份证' },
        { type: 'date', visable: true, prop: '', label: '入职日期', value: '剧名身份证' },
        { type: 'select', visable: false, prop: '', label: '工龄', value: '剧名身份证' },
        { type: 'select', visable: false, prop: '', label: '司龄', value: '剧名身份证' },
        { type: 'date', visable: true, prop: '', label: '转正日期', value: '剧名身份证' },
        { type: 'select', visable: true, prop: '', label: '合同年限', value: '剧名身份证' },
        { type: 'date', visable: true, prop: '', label: '合同结束日期', value: '剧名身份证' },
        { type: 'select', visable: true, prop: '', label: '任职受雇类型', value: '剧名身份证' },
        { type: 'select', visable: false, prop: '', label: '岗位说明书', value: '剧名身份证' },
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
    this.showData1.forEach(item => {
      let prop = item.prop;
      if (this.staffInfo.hasOwnProperty(prop)) {
        item.value = this.staffInfo[prop];
      }
    });
    console.log('this.staffInfo', this.showData1);
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
          this.dialogData = this.deepClone(this.showData1);
          console.log('this', this.dialogData, this.itemInfo);
          this.dialogData.forEach(item => {
            console.log('item', item);
          });
          // for (let i = 0; i < this.dialogData.length; i++) {
          //   console.log('this.dialogData[i].prop', this.dialogData[i].prop);
          //   this.itemInfo[this.dialogData[i].prop] = this.dialogData[i].value;
          // }
          console.log('this.itemInfo', this.itemInfo);
          break;
        case 'showData2':
          this.dialogData = this.deepClone(this.showData2);
          break;
        case 'showData3':
          this.dialogData = this.deepClone(this.showData3);
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
