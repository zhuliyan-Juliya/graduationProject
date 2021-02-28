<template>
  <div class="box">
    <section class="Organization">
      <ul class="helper_structure_list">
        <!-- <li class="helper_structure_list_item_1">
          <div class="helper_structure_list_panel_1">
            <img src="../../assets/images/organization/pic_1.png" width="70" height="70" alt="" />
            <h3><span>组织机构</span></h3>
          </div>
        </li> -->
        <!-- <li class="helper_structure_list_item_2">
          <div class="helper_structure_list_panel_2">
            <img src="../../assets/images/organization/pic_2.png" width="60" height="60" alt="" />
            <p class="helper_structure_list_item_title"><span>组织机构</span></p>
            <p class="helper_structure_list_item_link">
              <a href="/company_list"><span>单位设置</span></a>
            </p>
            <p class="helper_structure_list_item_link">
              <a href="/company_list"><span>部门设置</span></a>
            </p>
            <p class="helper_structure_list_item_link">
              <a href="/company_list"><span>组织架构图</span></a>
            </p>
            <p class="helper_structure_list_item_link">
              <a href="/company_list"><span>组织汇报图</span></a>
            </p>
          </div>
        </li> -->
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
          pic: require('images/organization/pic_1.png'),
          title: '组织机构',
          size: 70,
          children: [],
        },
        {
          pic: require('images/organization/pic_2.png'),
          title: '组织架构',
          size: 60,
          children: [
            { name: '单位设置', url: '/Home/Organization/CompanyList' },
            { name: '部门设置', url: '' },
            { name: '组织架构图', url: '' },
            { name: '组织汇报图', url: '' },
          ],
        },
        {
          pic: require('images/organization/pic_3.png'),
          title: '职位管理',
          size: 60,
          children: [
            { name: '职类管理', url: '' },
            { name: '职位管理', url: '' },
            { name: '职位体系', url: '' },
          ],
        },
        {
          pic: require('images/organization/pic_4.png'),
          title: '编制管理',
          size: 60,
          children: [
            { name: '编制管理', url: '' },
            { name: '组织编制图', url: '' },
          ],
        },
        {
          pic: require('images/organization/pic_5.png'),
          title: '工作城市',
          size: 60,
          children: [{ name: '工作城市', url: '' }],
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
      background: url(~images/Organization.jpg);
      width: 974px;
      height: 593px;
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
          width: 200px;
          padding-top: 110px;
          margin-left: -9px;
        }
        .helper_structure_list_item_2 {
          position: absolute;
          top: 250px;
          left: 260px;
        }
        .helper_structure_list_item_3 {
          position: absolute;
          top: 50px;
          left: 572px;
        }
        .helper_structure_list_item_4 {
          position: absolute;
          top: 250px;
          left: 814px;
        }
        .helper_structure_list_item_5 {
          position: absolute;
          top: 414px;
          right: 322px;
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
