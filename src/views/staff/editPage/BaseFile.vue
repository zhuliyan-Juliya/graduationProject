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
    <el-dialog :modal-append-to-body="false" title="编辑" :visible.sync="showData1Flag" width="60vw" @close="passCancel">
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
import SmallTitle from '@src/components/smallTitle/smallTitle';
import ShowData from '@src/components/showData/showData';
export default {
  data() {
    return {
      flag: false,
      titleInfo1: {
        titleLeft: '基础信息',
        dataName: 'showData1',
      },
      showData1: [
        { prop: '', label: '系统标识码', value: '123123123' },
        { prop: '', label: '系统账号', value: '13065158818' },
        { prop: 'serial_num', label: '员工编号', value: '001' },
        { prop: 'name', label: '姓名', value: '盛静银' },
        { prop: 'show_name', label: '显示名', value: '盛静银' },
        { prop: 'card_type', label: '证件类型', value: '剧名身份证' },
        { prop: 'card_num', label: '证件号码', value: '剧名身份证' },
        { prop: '', label: '出生日期', value: '剧名身份证' },
        { prop: '', label: '年龄', value: '剧名身份证' },
        { prop: '', label: '婚姻状况', value: '剧名身份证' },
        { prop: '', label: '性别', value: '剧名身份证' },
        { prop: '', label: '最高学历', value: '剧名身份证' },
        { prop: '', label: '政治面貌', value: '剧名身份证' },
        { prop: '', label: '民族', value: '剧名身份证' },
        { prop: '', label: '户口类型', value: '剧名身份证' },
        { prop: '', label: '户籍地址', value: '剧名身份证' },
        { prop: '', label: '户口所在地', value: '剧名身份证' },
        { prop: '', label: '国籍', value: '剧名身份证' },
      ],
      titleInfo2: {
        titleLeft: '联系方式',
        dataName: 'showData2',
      },
      showData2: [
        { label: '通讯地址', value: '123123123' },
        { label: '手机', value: '13065158818' },
        { label: '家庭电话', value: '001' },
        { label: '公司邮箱', value: '盛静银' },
        { label: '个人邮箱', value: '剧名身份证' },
        { label: 'QQ', value: '剧名身份证' },
        { label: '微信', value: '剧名身份证' },
      ],
      titleInfo3: {
        titleLeft: '在职信息',
        dataName: 'showData3',
      },
      showData3: [
        { label: '所属公司/中心', value: '123123123' },
        { label: '部门', value: '13065158818' },
        { label: '职位', value: '001' },
        { label: '工作城市', value: '盛静银' },
        { label: '工作性质', value: '剧名身份证' },
        { label: '员工状态', value: '剧名身份证' },
        { label: '开始工作时间', value: '剧名身份证' },
        { label: '入职日期', value: '剧名身份证' },
        { label: '工龄', value: '剧名身份证' },
        { label: '司龄', value: '剧名身份证' },
        { label: '转正日期', value: '剧名身份证' },
        { label: '合同年限', value: '剧名身份证' },
        { label: '合同结束日期', value: '剧名身份证' },
        { label: '任职受雇类型', value: '剧名身份证' },
        { label: '岗位说明书', value: '剧名身份证' },
      ],
      showData1Flag: false,
      showData2Flag: false,
      showData3Flag: false,
      itemInfo: {},
    };
  },
  props: ['staffInfo'],
  components: {
    SmallTitle,
    ShowData,
  },
  mounted() {
    console.log('this.staffInfo', this.staffInfo);
  },
  methods: {
    passCancel() {
      this.showData1Flag = false;
      this.showData2Flag = false;
      this.showData3Flag = false;
    },
    editInfo(data) {
      console.log('data', data.dataName);
      switch (data.dataName) {
        case 'showData1':
          this.showData1Flag = true;
          break;
        case 'showData2':
          this.showData2Flag = true;
          break;
        case 'showData3':
          this.showData3Flag = true;
          break;
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>
