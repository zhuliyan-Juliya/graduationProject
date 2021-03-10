<template>
  <div class="box">
    <section class="Organization">
      <ul class="helper_structure_list">
        <li :class="'helper_structure_list_item_' + (index + 1)" v-for="(item, index) in organizationData" :key="index">
          <div :class="'helper_structure_list_panel_' + (index + 1)">
            <img :src="item.pic" :width="item.size" :height="item.size" alt="" />
            <h3 v-if="index === 0">
              <span>{{ item.title }}</span>
            </h3>
            <p v-else class="helper_structure_list_item_title">
              <span>{{ item.title }}</span>
            </p>
            <p class="helper_structure_list_item_link" v-for="(v, k) in item.children" :key="k">
              <a href="javascript:;" @click="urlJump(v.url)">
                <span>{{ v.name }}</span>
              </a>
            </p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      organizationData: [
        {
          pic: require('images/staff/pic_1.png'),
          title: '员工管理',
          size: 70,
          children: [],
        },
        {
          pic: require('images/staff/pic_2.png'),
          title: '员工信息',
          size: 60,
          children: [
            { name: '员工花名册', url: '/Home/Staff/CompanyList' },
            { name: '人才统计', url: '/Home/Staff/Department' },
            { name: '档案统计', url: '/Home/Staff/Structure/1' },
            { name: '邀请员工', url: '/Home/Staff/Structure/2' },
            { name: '员工审核', url: '/Home/Staff/Structure/2' },
            { name: '证件管理', url: '/Home/Staff/Structure/2' },
            { name: '历史花名册', url: '/Home/Staff/Structure/2' },
            { name: '黑名单', url: '/Home/Staff/Structure/2' },
          ],
        },
        {
          pic: require('images/staff/pic_3.png'),
          title: '职位管理',
          size: 60,
          children: [
            { name: '职类管理', url: '/Home/Staff/Category' },
            { name: '职位管理', url: '/Home/Staff/Designation' },
            { name: '职位体系', url: '/Home/Staff/PositionSystem' },
          ],
        },
        {
          pic: require('images/staff/pic_4.png'),
          title: '编制管理',
          size: 60,
          children: [
            { name: '编制管理', url: '/Home/Staff/Establishment' },
            { name: '组织编制图', url: '/Home/Staff/Structure/3' },
          ],
        },
        {
          pic: require('images/staff/pic_5.png'),
          title: '工作城市',
          size: 60,
          children: [{ name: '工作城市', url: '/Home/Staff/Workcity' }],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    urlJump(url) {
      this.$router.push({ path: url });
    },
  },
};
</script>
<style lang='less' scoped>
body {
  .box {
    .Organization {
      background: url(~images/Staff.jpg);
      width: 1074px;
      height: 698px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: auto;
      font-size: 12px;
      .helper_structure_list {
        position: relative;
        li {
          text-align: center;
          h3 {
            font-size: 12px;
            color: #fff;
            font-weight: bold;
          }
          p {
            font-size: 12px;
            color: #333;
            margin-bottom: 8px;
            &.helper_structure_list_item_title {
              margin-top: -8px;
            }
          }
        }
        .helper_structure_list_item_1 {
          top: 132px;
          left: 58px;
          position: absolute;
        }
        .helper_structure_list_item_2 {
          position: absolute;
          top: 95px;
          left: 350px;
        }
        .helper_structure_list_item_3 {
          position: absolute;
          top: 86px;
          left: 865px;
        }
        .helper_structure_list_item_4 {
          position: absolute;
          top: 436px;
          left: 720px;
        }
        .helper_structure_list_item_5 {
          position: absolute;
          top: 450px;
          left: 310px;
        }
        .helper_structure_list_item_link {
          margin-bottom: 5px;
          background-color: #6bb6de;
          border: 1px solid #6bb6de;
          border-radius: 1em;
          text-align: center;
          padding: 2px 6px;
          transition: all 0.3s;
          a {
            color: #fff;
          }
          &:hover {
            background-color: #fff;
            a {
              color: #6bb6de;
            }
          }
        }
      }
    }
  }
}
</style>
