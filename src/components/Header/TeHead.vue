<template>
  <div
    id='g-header'
    :class="{'black':headData.setBlackStyle}"
  >
    <div
      class="teHeadBox"
      :class="{toFixed:headData.setFixData.isFixed,'openMenu':headData.switchMenu}"
    >
      <div class="wrapper">
        <div class="headLeft">
          <div class="logo">
            <i
              style="background-image:url('../images/icons/logo-black.png')"
              class="logoBlackImg"
            ></i>
            <i
              style="background-image:url('../images/icons/logo-white.png')"
              class="logoImg"
            ></i>
          </div>
          <ul class="headNavBox">
            <li
              class="headNavItem"
              :class="{'active': headData.urlName === 'teCampaign' || headData.urlName === 'teLookBook'}"
              @mouseenter="openMenu($event)"
              @mouseleave="closeMenu($event)"
            >
              <div
                class="headNavTitle"
                v-if="teCamId"
              >
                <router-link :to="{name:'teCampaign',params:{id:teCamId}}">形象视觉</router-link>
              </div>
              <div class="secondNavBox campaignSecondBox">
                <div class="secondWrapper">
                  <div class="img">
                    <img :src="campaignImg">
                  </div>
                  <ul
                    class="secondNavList"
                    v-if="teCampaignList"
                  >
                    <li
                      class="secondItem"
                      v-for="item in teCampaignList"
                      :key="item.id"
                    >
                      <h5 v-if="item.data[0].id">
                        <router-link :to="{name:'teCampaign',params:{id:item.data[0].id}}">{{item.menuTitle}}</router-link>
                        <span>/</span>
                      </h5>
                      <ul>
                        <li v-if="item.data[0].id">
                          <router-link :to="{name:'teCampaign',params:{id:item.data[0].id}}">{{item.data[0].title}}</router-link>
                        </li>
                        <li v-if="item.data[1].id">
                          <router-link :to="{name:'teLookBook',params:{id:item.data[1].id}}">{{item.data[1].title}}</router-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li
              class="headNavItem"
              :class="{'active': headData.urlName === 'teAbout' || headData.urlName === 'teTeam' || headData.urlName === 'teHistory'}"
              @mouseenter="openMenu($event)"
              @mouseleave="closeMenu($event)"
            >
              <div class="headNavTitle">
                <router-link to="/teAbout">关于品牌</router-link>
              </div>
              <div class="secondNavBox">
                <div class="secondWrapper">
                  <div class="img">
                    <img :src="aboutImg">
                  </div>
                  <ul class="secondNavList">
                    <li class="secondItem">
                      <h5>
                        <router-link to="/teAbout">品牌简介</router-link>
                        <span>/</span>
                      </h5>
                    </li>
                    <li class="secondItem">
                      <h5>
                        <router-link to="/teTeam">设计团队</router-link><span>/</span>
                      </h5>
                    </li>
                    <li class="secondItem">
                      <h5>
                        <router-link to="/teHistory">品牌历程</router-link><span>/</span>
                      </h5>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li
              class="headNavItem"
              :class="{'active': headData.urlName === 'teNew' || headData.urlName === 'teStar' || headData.urlName === 'teShow'}"
              @mouseenter="openMenu($event)"
              @mouseleave="closeMenu($event)"
            >
              <div class="headNavTitle">
                <router-link to="/teNew">资讯动态</router-link>
              </div>
              <div class="secondNavBox">
                <div class="secondWrapper">
                  <div
                    class="img"
                    v-if="newsImg"
                  >
                    <img :src="newsImg">
                  </div>
                  <ul class="secondNavList">
                    <li class="secondItem">
                      <h5>
                        <router-link to="/teNew">品牌新闻</router-link><span>/</span>
                      </h5>
                    </li>
                    <li class="secondItem">
                      <h5>
                        <router-link to="/teStar">明星好友</router-link><span>/</span>
                      </h5>
                    </li>
                    <li class="secondItem">
                      <h5>
                        <router-link to="/teShow">秀场直击</router-link><span>/</span>
                      </h5>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li
              class="headNavItem"
              :class="{'active': headData.urlName === 'teStores'}"
              @mouseenter="openMenu($event)"
              @mouseleave="closeMenu($event)"
            >
              <div class="headNavTitle">
                <router-link to="/teStores">门店形象</router-link>
              </div>
              <div class="secondNavBox">
                <div class="secondWrapper">
                  <div
                    class="img"
                    v-if="storeImg"
                  >
                    <img :src="storeImg">
                  </div>
                  <ul class="secondNavList">
                    <li class="secondItem">
                      <h5>
                        <router-link to="/teStores">门店形象</router-link>
                      </h5>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="headNavItem">
              <div class="headNavTitle">
                <router-link to="/">集团首页</router-link>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="headSearch">
          <i class="iconfont icon-search searchBtn"></i>
          <input
            type="text"
            placeholder="Search"
          >
        </div> -->
      </div>
    </div>
    <div class="teHeadBoxWap">
      <div class="headTopMenuWap">
        <div class="logo">
          <i style="background-image:url('../images/icons/logo-black.png')"></i>
        </div>
        <div
          class="wap-btn-box"
          @click="openMenuWap"
          :class="{'active':headData.switchMenuWap}"
        >
          <span></span>
        </div>
      </div>
      <div
        class="headMenuBoxWap"
        :class="{'active':headData.switchMenuWap}"
      >
        <ul class="menuListWap">
          <li class="firstItemWap">
            <div class="firstTitleWap">
              <a>形象视觉</a>
              <div
                class="wap-menu-second-btn"
                @click="switchSecMenu($event)"
              >
                <i class="iconfont icon-next-btn"></i>
              </div>
            </div>
            <ul
              class="secondBoxWap"
              v-if="teCampaignList"
            >
              <li
                class="secondItemWap"
                v-for="item in teCampaignList"
                :key="item.id"
              >
                <div
                  class="secondTitleWap"
                  v-if="item.data[0].id"
                >
                  <router-link :to="{name:'teCampaign',params:{id:item.data[0].id}}">{{item.menuTitle}}</router-link>
                </div>
                <ul class="secondListWap">
                  <li v-if="item.data[0].id">
                    <router-link :to="{name:'teCampaign',params:{id:item.data[0].id}}">{{item.data[0].title}}</router-link>
                  </li>
                  <li v-if="item.data[1].id">
                    <router-link :to="{name:'teLookBook',params:{id:item.data[1].id}}">{{item.data[1].title}}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="firstItemWap">
            <div class="firstTitleWap">
              <a>关于品牌</a>
              <div
                class="wap-menu-second-btn"
                @click="switchSecMenu($event)"
              >
                <i class="iconfont icon-next-btn"></i>
              </div>
            </div>
            <ul class="secondBoxWap">
              <li class="secondItemWap">
                <div class="secondTitleWap">
                  <router-link to="/teAbout">品牌简介</router-link>
                </div>
              </li>
              <li class="secondItemWap">
                <div class="secondTitleWap">
                  <router-link to="/teTeam">设计团队</router-link>
                </div>
              </li>
              <li class="secondItemWap">
                <div class="secondTitleWap">
                  <router-link to="/teHistory">品牌历程</router-link>
                </div>
              </li>
            </ul>
          </li>
          <li class="firstItemWap">
            <div class="firstTitleWap">
              <a>资讯动态</a>
              <div
                class="wap-menu-second-btn"
                @click="switchSecMenu($event)"
              >
                <i class="iconfont icon-next-btn"></i>
              </div>
            </div>
            <ul class="secondBoxWap">
              <li class="secondItemWap">
                <div class="secondTitleWap">
                  <router-link to="/teNew">品牌新闻</router-link>
                </div>
              </li>
              <li class="secondItemWap">
                <div class="secondTitleWap">
                  <router-link to="/teStar">明星好友</router-link>
                </div>
              </li>
              <li class="secondItemWap">
                <div class="secondTitleWap">
                  <router-link to="/teShow">秀场直击</router-link>
                </div>
              </li>
            </ul>
          </li>
          <li class="firstItemWap">
            <div class="firstTitleWap">
              <a>门店形象</a>
              <div
                class="wap-menu-second-btn"
                @click="switchSecMenu($event)"
              >
                <i class="iconfont icon-next-btn"></i>
              </div>
            </div>
            <ul class="secondBoxWap">
              <li class="secondItemWap">
                <div class="secondTitleWap">
                  <router-link to="/teStores">门店形象</router-link>
                </div>
              </li>
            </ul>
          </li>
          <li class="firstItemWap">
            <div class="firstTitleWap">
              <router-link to="/">集团首页</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import api from "@/api";
import $ from "jquery";

export default {
  name: "te-header",
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    const headData = reactive({
      setFixData: {
        lastScrollTop: 0,
        isFixed: false,
      },
      switchMenu: false,
      urlName: null,
      setBlackStyle: true,
      switchMenuWap: false,
    });

    const route = useRoute();

    const getScrollOffset = function () {
      if (window.pageXOffset) {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset,
        };
      } else {
        return {
          x: document.body.scrollLeft + document.documentElement.scrollLeft,
          y: document.body.scrollTop + document.documentElement.scrollTop,
        };
      }
    };

    const setHeadFixed = (headData) => {
      if (window.innerWidth < 991) return;
      window.addEventListener("scroll", function () {
        var st = getScrollOffset().y;
        if (st >= headData.setFixData.lastScrollTop && st > 120) {
          headData.setFixData.isFixed = true;
        } else if (st < headData.setFixData.lastScrollTop && st < 80) {
          headData.setFixData.isFixed = false;
        }
        headData.setFixData.lastScrollTop = st;
      });
    };

    watch(
      () => route.name,
      (newPath) => {
        headData.urlName = newPath;
        if (newPath === "teCampaign" || newPath === "teAbout") {
          headData.setBlackStyle = false;
        }else{
            headData.setBlackStyle = true;
        }
      },
      { immediate: true }
    );

    watch(()=>route.path,(newPath)=>{
        //二级菜单关闭
        $(".secondNavBox")
          .stop()
          .slideUp(300, function () {
            headData.switchMenu = false;
          });

        //移动端菜单关闭
        headData.switchMenuWap = false;
    })

    //获取形象视觉数据
    const getListData = () => {
      if (store.state.teStore.teCampaignList.length > 0) return;
      let menuTitleList = [];
      api
        .getSubmenu({ categoryId: 547 })
        .then((res) => {
          return Promise.all(
            res.data.map((item) => {
              menuTitleList.push(item.title);
              return api.getSubmenu({ categoryId: item.id });
            })
          );
        })
        .then((res) => {
          var arr = res.slice(0, 4);
          arr.forEach((item, index) => {
            item.menuTitle = menuTitleList[index];
          });
          store.dispatch("teStore/setCampaignList", arr);
        });
    };

    //获取菜单图片
    const getImgsData = () => {
      if (store.state.teStore.teHeadMenuImgs.aboutImg !== "") return;
      Promise.all([
        api.getCategoryModel({ id: 547 }), //形象视觉
        api.getRows({ categoryId: 535, other_cid: 524, big_img: 1 }),
      ]).then((res) => {
        store.dispatch("teStore/setHeadMenuImgs", [
          ...res[1].data,
          res[0].data[0],
        ]);
      });
    };

    const openMenu = (el) => {
      headData.switchMenu = true;
      $(el.currentTarget)
        .find(".secondNavBox")
        .stop()
        .slideDown(300, function () {
          headData.switchMenu = true;
        });
    };

    const closeMenu = (el) => {
      $(el.currentTarget)
        .find(".secondNavBox")
        .stop()
        .slideUp(300, function () {
          headData.switchMenu = false;
        });
    };

    const openMenuWap = () => {
      headData.switchMenuWap = !headData.switchMenuWap;
    };

    const switchSecMenu = (el) => {
      //移动端二级菜单
      $(el.currentTarget)
        .parents(".firstItemWap")
        .siblings(".firstItemWap")
        .find(".wap-menu-second-btn")
        .removeClass("active");
      $(el.currentTarget)
        .parents(".firstItemWap")
        .siblings(".firstItemWap")
        .find(".secondBoxWap")
        .slideUp();
      $(el.currentTarget).toggleClass("active");
      $(el.currentTarget)
        .parents(".firstItemWap")
        .find(".secondBoxWap")
        .slideToggle();
    };

    onMounted(() => {
      setHeadFixed(headData);
      getListData();
      getImgsData();
    });

    return {
      headData,
      teCamId: computed(() => {
        return store.state.teStore.teCampaignId;
      }),
      campaignImg: computed(
        () => store.state.teStore.teHeadMenuImgs.campaignImg
      ),
      newsImg: computed(() => store.state.teStore.teHeadMenuImgs.newsImg),
      storeImg: computed(() => store.state.teStore.teHeadMenuImgs.storeImg),
      aboutImg: computed(() => store.state.teStore.teHeadMenuImgs.aboutImg),
      teCampaignList: computed(() => store.state.teStore.teCampaignList),
      openMenu,
      closeMenu,
      openMenuWap,
      switchSecMenu,
    };
  },
};
</script>

<style lang='scss' scoped>
.teHeadBox .wrapper .headLeft .headNavBox .headNavItem .headNavTitle:after,
.teHeadBox .wrapper .headLeft .headNavBox .headNavItem .headNavTitle a,
.teHeadBox .wrapper .headLeft .headNavBox .headNavItem .secondNavBox .secondWrapper .secondNavList .secondItem ul li a,
.teHeadBoxWap .headMenuBoxWap .menuListWap .firstItemWap .firstTitleWap i{
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}
.teHeadBox .wrapper .headLeft .headNavBox .headNavItem .headNavTitle:after{
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
.teHeadBox .wrapper .headLeft .headNavBox .headNavItem .secondNavBox .secondWrapper .secondNavList .secondItem h5 span,
.teHeadBox .wrapper .headSearch,
.teHeadBox .wrapper .headSearch i,
.teHeadBoxWap .headTopMenuWap .wap-btn-box{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
}
.teHeadBoxWap .headTopMenuWap .wap-btn-box span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
}
.teHeadBox{
    -webkit-transition: background-color 0.3s linear;
    transition: background-color 0.3s linear;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
}
@media screen and (max-width: 991px) {
    .teHeadBox {
        display: none;
    }
}
.teHeadBox .wrapper {
    position: relative;
}
.teHeadBox .wrapper .headLeft {
    display: inline-block;
    margin-left: 100px;
}

</style>
