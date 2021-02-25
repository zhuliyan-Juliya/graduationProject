<template>
  <div>
    <main>
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

            <el-card shadow="hover" class="left-card" style="margin-top: 10px">
              <section class="left-box">
                131232
              </section>
              <section class="right-box">
                131232
              </section>
            </el-card>
          </div>
        </div>
        <div class="right-box">
          <div class="right">
            <el-card shadow="hover" class="right-card">
              <Card-title :cardData="cardTData" @disClickEvent="disClickEvent"></Card-title>
              <main>
                <p v-if="recruitTask.length === 0">暂无招聘任务，<a href="#" class="color-ac">新增招聘计划</a></p>
              </main>
            </el-card>
          </div>
        </div>
      </div>
    </main>
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
      cardTData: {
        title: '招聘进度',
        leftIcoClass: 'el-icon-s-custom',
        rightIcoClass: 'el-icon-setting',
      },
      recruitTask: []
    };
  },

  components: {},

  computed: {},

  mounted() {},

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
        }
      }
    }
    .right-box {
      float: left;
      width: 33%;
      height: 152px;
      .right {
        height: inherit;
        .right-card {
          height: inherit;
          min-width: 300px;
          main {
            height: 80px;
            line-height: 80px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>