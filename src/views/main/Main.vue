<template>
  <div style="padding-top: 60px">
    <el-main>
      <el-row>
        <ul class="card-box">
          <li v-for="item in cardData" :key="item.title">
            <Card-item :data="item"></Card-item>
          </li>
        </ul>
      </el-row>

      <div style="margin-top: 20px" class="p-box">
        <div class="left-box">
          <div class="left">
            <el-card shadow="hover" class="left-card">
              <div class="tit">
                <span><i class="el-icon-time"></i>待办事项</span>
                <el-select :value="matter" clearable :placeholder="`全部（${matterTotal}）`">
                  <el-option v-for="item in matterOptions" :key="item.value" :label="item.label" :value="item.value">
                    <template>
                      <div @click="goMatterDetail(item.value)">
                        {{ `${item.label} (${item.msgNum})` }}
                      </div>
                    </template>
                  </el-option>
                </el-select>
              </div>
              <ul class="matter-detail">
                <li v-for="item in matterOptions" :key="item.value">
                  <strong class="num">{{ item.msgNum }}</strong
                  ><a :href="item.linkUrl">{{ item.label }}</a>
                </li>
              </ul>
            </el-card>
            <!-- 工作日历模块 -->
            <el-card shadow="hover" class="left-card" style="margin-top: 10px">
              <section class="left-box">
                <Card-title :cardData="calenderCardTData" @disClickEvent="disClickEvent"></Card-title>

                <el-calendar v-model="timeValue"> </el-calendar>
              </section>

              <el-divider direction="vertical" class="fl" style="height: 100%"></el-divider>

              <section class="right-box">
                <Card-title :cardData="tipsCardTData" @disClickEvent="disClickEvent"></Card-title>

                <main>
                  <div v-if="tipsCardTDataLength.length === 0" class="message-box">
                    <img src="../../assets/images/message.svg" />
                    <p>暂无提醒</p>
                  </div>
                </main>
              </section>
            </el-card>

            <div style="margin-top: 10px" class="visual">
              <el-card shadow="hover" style="width 48%" class="left">
                <Card-title :cardData="calenderCardTData" @disClickEvent="disClickEvent"></Card-title>
              </el-card>
              <el-card shadow="hover" style="width 48%" class="right">
                <Card-title :cardData="calenderCardTData" @disClickEvent="disClickEvent"></Card-title>
              </el-card>
            </div>
            <!-- 可视化数据展示 -->
          </div>
        </div>
        <div class="right-box">
          <div class="right">
            <!-- 招聘进度模块 -->
            <el-card shadow="hover" class="right-card recruit">
              <Card-title :cardData="recruitCardTData" @disClickEvent="disClickEvent"></Card-title>
              <main>
                <p v-if="recruitTask.length === 0">暂无招聘任务，<a href="#" class="color-ac">新增招聘计划</a></p>
              </main>
            </el-card>
            <!-- 快捷功能入口 -->
            <el-card shadow="hover" class="right-card shortcut" style="margin-top: 10px">
              <Card-title :cardData="shortcutCardTitleData" @disClickEvent="disClickEvent"></Card-title>
              <main>
                <ul>
                  <li v-for="(item, index) in shortcutFuncData" :key="index">
                    <Shortcut :cardData="item"></Shortcut>
                  </li>
                </ul>
              </main>
            </el-card>
            <!-- 公司公告 -->
            <el-card shadow="hover" class="right-card shortcut" style="margin-top: 10px">
              <Card-title :cardData="shortcutCardTitleData" @disClickEvent="disClickEvent"></Card-title>
            </el-card>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardData: [
        { bgColor: 'rgb(35, 102, 167)', title: '总员工', icoClass: 'el-icon-user-solid', msgNum: 2, linkUrl: '/Hm' },
        { bgColor: 'rgb(73, 167, 130)', title: '正式', icoClass: 'el-icon-user', msgNum: 3, linkUrl: '/Hm' },
        { bgColor: 'rgb(57, 146, 193)', title: '试用期', icoClass: 'el-icon-help', msgNum: 4, linkUrl: '/Hm' },
        { bgColor: 'rgb(233, 143, 39)', title: '本月新入职', icoClass: 'el-icon-s-check', msgNum: 5, linkUrl: '/Hm' },
        { bgColor: 'rgb(35, 102, 167)', title: '本月离职', icoClass: 'el-icon-warning', msgNum: 6, linkUrl: '/Hm' },
        { bgColor: 'rgb(73, 167, 130)', title: '待入职员工', icoClass: 'el-icon-circle-plus', msgNum: 6, linkUrl: '/Hm' },
      ],
      matter: null,
      matterTotal: 7,
      matterOptions: [
        { linkUrl: '', msgNum: 1, value: 1, label: '入职办理' },
        { linkUrl: '', msgNum: 1, value: 2, label: '离职办理' },
        { linkUrl: '', msgNum: 1, value: 3, label: '员工加入审核' },
        { linkUrl: '', msgNum: 1, value: 4, label: '入职未增员' },
        { linkUrl: '', msgNum: 1, value: 5, label: '离职未减员' },
        { linkUrl: '', msgNum: 1, value: 6, label: '社保补款项' },
        { linkUrl: '', msgNum: 1, value: 7, label: '社保退款项' },
      ],
      recruitCardTData: {
        title: '招聘进度',
        leftIcoClass: 'el-icon-s-custom',
        rightIcoClass: 'el-icon-setting',
      },
      recruitTask: [],
      calenderCardTData: {
        title: '工作日历',
        leftIcoClass: 'el-icon-date',
        rightIcoClass: 'el-icon-setting',
      },
      timeValue: new Date(),
      tipsCardTData: {
        title: '今日提醒',
        leftIcoClass: 'el-icon-chat-line-round',
        // rightIcoClass: 'el-icon-setting',
      },
      tipsCardTDataLength: [],
      shortcutCardTitleData: {
        title: '快捷功能入口',
        leftIcoClass: 'el-icon-position',
        rightIcoClass: 'el-icon-setting',
      },
      shortcutFuncData: [
        { disable: false, imgUrl: require('images/social.svg'), desc: '社保计算器', linkUrl: 'https://salary.dhumedia.cn/' },
        { disable: false, imgUrl: require('images/personalIncome.svg'), desc: '个税计算器', linkUrl: 'https://www.gerensuodeshui.cn/' },
        { disable: true, imgUrl: require('images/talentPool.svg'), desc: '人才库', linkUrl: 'https://www.gerensuodeshui.cn/' },
        { disable: false, imgUrl: require('images/social.svg'), desc: '社保计算器', linkUrl: 'https://salary.dhumedia.cn/' },
        { disable: false, imgUrl: require('images/personalIncome.svg'), desc: '个税计算器', linkUrl: 'https://www.gerensuodeshui.cn/' },
        { disable: true, imgUrl: require('images/talentPool.svg'), desc: '人才库', linkUrl: 'https://www.gerensuodeshui.cn/' },
        { disable: false, imgUrl: require('images/social.svg'), desc: '社保计算器', linkUrl: 'https://salary.dhumedia.cn/' },
        { disable: false, imgUrl: require('images/personalIncome.svg'), desc: '个税计算器', linkUrl: 'https://www.gerensuodeshui.cn/' },
        { disable: true, imgUrl: require('images/talentPool.svg'), desc: '人才库', linkUrl: 'https://www.gerensuodeshui.cn/' },
      ],
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.$api.testApi().then(res => {
      console.log('res', res);
    });
  },

  methods: {
    goMatterDetail(derection) {
      console.log('derection', derection);
    },
    disClickEvent() {
      console.log('子组件');
    },
  },
};
</script>
<style lang='less' scoped>
main {
  // height: 200px;
  width: 100%;
  overflow: hidden;
  .card-box {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    li {
      margin-right: 8px;
      flex: 1;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .p-box {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .left-box {
      width: 67%;
      flex: 1;
      float: left;
      .left {
        margin-right: 26px;
        .left-card {
          min-width: 615px;
          .tit {
            display: flex;
            justify-content: space-between;
            line-height: 40px;
            i {
              font-size: 20px;
              vertical-align: middle;
              margin-right: 3px;
            }
          }
          .matter-detail {
            margin-top: 20px;
            height: 50px;
            li {
              display: flex;
              flex-direction: column;
              float: left;
              width: 14%;
              text-align: center;
              strong {
                font-size: 20px;
                font-weight: 700;
              }
            }
          }
          .right-box {
            width: 30%;
            main {
              height: 325px;
              .message-box {
                height: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              }
            }
          }
        }
        .visual {
          .right,
          .left {
            width: 49%;
            float: left;
            height: 420px;
          }
          .left {
            margin-right: 2%;
          }
          .right {
          }
        }
      }
    }
    .right-box {
      float: left;
      width: 33%;
      .right {
        .right-card {
          min-width: 300px;
        }
        .recruit {
          main {
            height: 70px;
            line-height: 70px;
            text-align: center;
          }
        }
        .shortcut {
          height: 421px;
          main {
            height: 300px;
            ul {
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              flex-wrap: wrap;
              margin-top: 36px;
              li {
                width: 33%;
                height: 104px;
              }
            }
          }
        }
      }
    }
  }
}
/* /deep/ 深度选择器可以影响子组件内部的样式 */
/deep/ .el-calendar-day {
  height: 35px;
}
/deep/ .el-divider--vertical {
  height: 320px;
}
</style>