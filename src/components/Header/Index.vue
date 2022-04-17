<template>
  <div
    id='g-header'
    :class="{'indexPage':headData.urlName === '','whiteHeader':headData.setWhiteStyle,'indexPage':headData.indexPage}"
  >
    <div
      class="headBox"
      :class="{toFixed:headData.setFixData.isFixed,'openMenu':headData.switchMenu}"
    >
      <div class="wrapper">
        <div class="logo">
          <router-link to="/">
            <i
              style="background-image:url('/images/icons/logo-black.png')"
              class="blackLogo"
            ></i>
            <i
              style="background-image:url('../../assets/images/icons/logo-black.png')"
              class="blackLogo"
            ></i>
            <i
              style="background-image:url('../../assets/images/icons/logo-white.png')"
              class="whiteLogo"
            ></i>
          </router-link>
        </div>
        <div
          class="wap-btn-box"
          :class="{'active':wapMenuStatu}"
          @click="swithMenuWap"
        >
          <span></span>
        </div>
        <ul
          class="headNavBox"
          :class="{'active':wapMenuStatu}"
        >
          <li
            class="headNavItem"
            :class="{'active': headData.urlName === 'index'}"
          >
            <div class="headNavTitle">
              <router-link to="/">首页</router-link>
            </div>
          </li>
          <li class="headNavItem">
            <div
              class="headNavTitle"
              v-if="teCamId"
            >
              <router-link :to="{name:'teCampaign',params:{id:teCamId}}">MY TENO</router-link>
            </div>
          </li>
          <li class="headNavItem">
            <div
              class="headNavTitle"
              v-if="laCamId"
            >
              <router-link :to="{name:'laCampaign',params:{id:laCamId}}">La Danum</router-link>
            </div>
          </li>
          <li class="headNavItem">
            <div class="headNavTitle">
              <a
                href="http://www.kodice.cn"
                target="_blank"
              >KODICE</a>
            </div>
          </li>
          <li
            class="headNavItem"
            :class="{'active': headData.urlName === 'group' || headData.urlName === 'culture'}"
            @mouseenter="openMenu($event)"
            @mouseleave="closeMenu($event)"
          >
            <div class="headNavTitle">
              <router-link to="/group">关于集团</router-link>
              <div
                class="wap-menu-second-btn"
                @click="switchSecMenu($event)"
              >
                <i class="iconfont icon-next-btn"></i>
              </div>
            </div>
            <div class="secondNavBox">
              <div class="secondWrapper">
                <div class="img">
                  <img :src="headMenuImg">
                </div>
                <ul class="secondNavList">
                  <li class="secondItem">
                    <h5>
                      <router-link to="/group">关于集团</router-link>
                      <span>/</span>
                    </h5>
                  </li>
                  <li class="secondItem">
                    <h5>
                      <router-link to="/culture">集团文化</router-link>
                    </h5>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li
            class="headNavItem"
            :class="{'active': headData.urlName === 'career'}"
          >
            <div class="headNavTitle">
              <router-link to="/career">人才招聘</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import $ from "jquery";
export default {
  name: "my-header",
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
      urlName: null,
      setWhiteStyle: false,
      switchMenu: false,
      indexPage: false,
    });
    const wapMenuStatu = ref(false);
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
        if (newPath === "group" || newPath === "culture") {
          headData.setWhiteStyle = true;
        } else {
          headData.setWhiteStyle = false;
        }
        if (newPath === "index") {
          headData.indexPage = true;
        } else {
          headData.indexPage = false;
        }
        //二级菜单关闭
        $(".secondNavBox")
          .stop()
          .slideUp(300, function () {
            headData.switchMenu = false;
          });
      },
      { immediate: true }
    );

    const openMenu = (el) => {
      if (window.innerWidth < 991) return;
      headData.switchMenu = true;
      $(el.currentTarget).find(".secondNavBox").stop().slideDown();
    };

    const closeMenu = (el) => {
      if (window.innerWidth < 991) return;
      $(el.currentTarget)
        .find(".secondNavBox")
        .stop()
        .slideUp(300, function () {
          headData.switchMenu = false;
        });
    };

    const swithMenuWap = () => {
      //移动端菜单
      wapMenuStatu.value = !wapMenuStatu.value;
    };

    const switchSecMenu = (el) => {
      //移动端二级菜单
      $(el.currentTarget).toggleClass("active");
      $(el.currentTarget)
        .parents(".headNavItem")
        .find(".secondNavBox")
        .slideToggle();
    };

    onMounted(() => {
      setHeadFixed(headData);
    });

    return {
      teCamId: computed(() => store.state.mainStore.teCampaignId),
      laCamId: computed(() => store.state.mainStore.laCampaignId),
      headMenuImg: computed(() => store.state.mainStore.headMenuImg),
      headData,
      openMenu,
      closeMenu,
      wapMenuStatu,
      swithMenuWap,
      switchSecMenu,
    };
  },
};
</script>

<style lang='scss' scoped>
.headBox .wrapper,
.headBox .wrapper .headNavBox .headNavItem,
.headBox .wrapper .headNavBox .headNavItem .headNavTitle:after,
.headBox .wrapper .headNavBox .headNavItem .headNavTitle a,
.headBox .wrapper .headNavBox .headNavItem .headNavTitle i {
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
#g-header.whiteHeader .headBox {
  -webkit-transition: opacity 2s linear;
  transition: opacity 2s linear;
}
.headBox .wrapper .headNavBox .headNavItem .headNavTitle:after {
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .secondNavBox
  .secondWrapper
  .secondNavList
  .secondItem
  h5
  span,
.headBox .wrapper .logo,
.headBox .wrapper .wap-btn-box {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
}
.headBox .wrapper .wap-btn-box span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}
@media screen and (max-width: 991px) {
  .headBox {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 99;
  }
}

.headBox .wrapper {
  position: relative;
  text-align: right;
  border-bottom: 1px solid #f1f1f1;
  background-color: #fff;
}

@media screen and (max-width: 991px) {
  .headBox .wrapper {
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: left;
  }
}

@media screen and (max-width: 767px) {
  .headBox .wrapper {
    padding-top: 9px;
    padding-bottom: 8px;
  }
}

.headBox .wrapper .logo {
  display: inline-block;
  vertical-align: middle;
  left: 70px;
  margin-top: 6px;
  font-size: 0;
}

@media screen and (max-width: 1200px) {
  .headBox .wrapper .logo {
    left: 30px;
  }
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .logo {
    position: static;
    -webkit-transform: none;
    transform: none;
    margin-left: 14px;
    margin-top: 0;
  }
}

@media screen and (max-width: 767px) {
  .headBox .wrapper .logo {
    margin-left: 12px;
  }
}

.headBox .wrapper .logo i {
  display: inline-block;
  width: 220px;
  height: 92px;
  background-size: 220px;
  background-repeat: no-repeat;
  background-position-y: -70px;
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .logo i {
    width: 110px;
    background-size: 110px;
    height: 46px;
    background-position-y: -35px;
  }
}

@media screen and (max-width: 767px) {
  .headBox .wrapper .logo i {
    width: 80px;
    background-size: 80px;
    height: 34px;
    background-position-y: -25px;
  }
}

.headBox .wrapper .logo i.whiteLogo {
  display: none;
}

.headBox .wrapper .wap-btn-box {
  display: none;
  right: 30px;
  width: 35px;
  height: 26px;
  font-size: 0;
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .wap-btn-box {
    display: inline-block;
  }
}

@media screen and (max-width: 767px) {
  .headBox .wrapper .wap-btn-box {
    width: 28px;
    height: 22px;
    right: 24px;
  }
}

.headBox .wrapper .wap-btn-box span {
  display: inline-block;
  width: 100%;
  height: 2px;
  background-color: #000;
  transition: opacity 0.3s linear;
  -webkit-transition: opacity 0.3s linear;
}

.headBox .wrapper .wap-btn-box:after,
.headBox .wrapper .wap-btn-box:before {
  content: "";
  width: 100%;
  height: 2px;
  background-color: #000;
  position: absolute;
  left: 0;
  -webkit-transform-origin: left;
  transform-origin: left;
  -webkit-transition: transform 0.35s linear;
  -webkit-transition: -webkit-transform 0.35s linear;
  transition: -webkit-transform 0.35s linear;
  transition: transform 0.35s linear;
  transition: transform 0.35s linear, -webkit-transform 0.35s linear;
}

.headBox .wrapper .wap-btn-box:before {
  top: 0;
}

.headBox .wrapper .wap-btn-box:after {
  bottom: 0;
}

.headBox .wrapper .wap-btn-box.active span {
  opacity: 0;
}

.headBox .wrapper .wap-btn-box.active:before {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.headBox .wrapper .wap-btn-box.active:after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.headBox .wrapper .headNavBox {
  display: inline-block;
  vertical-align: middle;
  margin-right: 60px;
  text-align: left;
}

@media screen and (max-width: 1200px) {
  .headBox .wrapper .headNavBox {
    margin-right: 40px;
  }
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox {
    position: absolute;
    margin-right: 0;
    right: 0;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: -1;
    padding-top: 157px;
    transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;
    opacity: 0;
    transform: translateY(-100%);
    -webkit-transform: translateY(-100%);
  }

  .headBox .wrapper .headNavBox.active {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
}

@media screen and (max-width: 767px) {
  .headBox .wrapper .headNavBox {
    padding-top: 112px;
  }
}

.headBox .wrapper .headNavBox .headNavItem {
  display: inline-block;
  /* padding: 42px 24px 40px; */
  padding: 68px 24px 60px;
}

@media screen and (max-width: 1200px) {
  .headBox .wrapper .headNavBox .headNavItem {
    padding: 42px 16px 40px;
  }
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox .headNavItem {
    display: block;
    padding: 0;
  }
}

.headBox .wrapper .headNavBox .headNavItem .headNavTitle {
  padding: 0 8px;
  position: relative;
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox .headNavItem .headNavTitle {
    padding: 15px 30px;
    border-bottom: 1px solid #f1f1f1;
  }
}

@media screen and (max-width: 767px) {
  .headBox .wrapper .headNavBox .headNavItem .headNavTitle {
    padding: 12px 24px;
  }
}

.headBox .wrapper .headNavBox .headNavItem .headNavTitle:after {
  bottom: -5px;
  content: "";
  height: 2px;
  background-color: #da9d60;
  width: 0;
  z-index: 99;
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox .headNavItem .headNavTitle:after {
    display: none;
  }
}

.headBox .wrapper .headNavBox .headNavItem .headNavTitle a {
  color: rgba(94, 71, 78, 0.7);
  font-size: 12px;
  font-weight: 700;
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox .headNavItem .headNavTitle a {
    font-size: 14px;
    color: #000;
    font-weight: 400;
  }
}

.headBox .wrapper .headNavBox .headNavItem .headNavTitle .wap-menu-second-btn {
  display: none;
  position: absolute;
  top: 50%;
  right: 20px;
  -webkit-transform: translateY(-50%) rotate(-90deg);
  transform: translateY(-50%) rotate(-90deg);
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
}

.headBox .wrapper .headNavBox .headNavItem .headNavTitle i {
  display: inline-block;
  font-size: 20px;
}

@media screen and (max-width: 991px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle
    .wap-menu-second-btn {
    display: inline-block;
  }
}

@media screen and (max-width: 767px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle
    .wap-menu-second-btn {
    right: 12px;
    width: 36px;
    height: 36px;
    line-height: 36px;
  }

  .headBox .wrapper .headNavBox .headNavItem .headNavTitle i {
    font-size: 14px;
  }
}

.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .headNavTitle
  .wap-menu-second-btn.active
  i {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.headBox .wrapper .headNavBox .headNavItem .secondNavBox {
  display: none;
  position: absolute;
  left: 0;
  top: 149px;
  width: 100%;
  background-color: #fff;
  font-size: 0;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  z-index: 99;
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox .headNavItem .secondNavBox {
    position: static;
    -webkit-transform: none;
    transform: none;
    border: none;
  }
}

.headBox .wrapper .headNavBox .headNavItem .secondNavBox .secondWrapper {
  padding: 50px 30px 80px 100px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
}

@media screen and (max-width: 1200px) {
  .headBox .wrapper .headNavBox .headNavItem .secondNavBox .secondWrapper {
    padding: 40px 20px 60px 60px;
  }
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox .headNavItem .secondNavBox .secondWrapper {
    padding: 30px 30px 10px;
    box-shadow: none;
  }
}

@media screen and (max-width: 767px) {
  .headBox .wrapper .headNavBox .headNavItem .secondNavBox .secondWrapper {
    padding: 24px 24px 5px;
  }
}

.headBox .wrapper .headNavBox .headNavItem .secondNavBox .secondWrapper .img {
  display: inline-block;
  vertical-align: middle;
  width: 28.8%;
}

@media screen and (max-width: 1200px) {
  .headBox .wrapper .headNavBox .headNavItem .secondNavBox .secondWrapper .img {
    width: 25%;
  }
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox .headNavItem .secondNavBox .secondWrapper .img {
    display: none;
  }
}

.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .secondNavBox
  .secondWrapper
  .img
  img {
  width: 100%;
}

.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .secondNavBox
  .secondWrapper
  .secondNavList {
  display: inline-block;
  vertical-align: middle;
  width: 71.2%;
}

@media screen and (max-width: 1200px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList {
    width: 75%;
  }
}

@media screen and (max-width: 991px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList {
    width: 100%;
  }
}

.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .secondNavBox
  .secondWrapper
  .secondNavList
  .secondItem {
  display: inline-block;
  vertical-align: top;
  margin-left: 10%;
  width: 180px;
  margin-bottom: 50px;
}

@media screen and (max-width: 1600px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList
    .secondItem {
    margin-left: 5%;
    width: 160px;
  }
}

@media screen and (max-width: 1300px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList
    .secondItem {
    margin-left: 3%;
    width: 140px;
    margin-bottom: 40px;
  }
}

@media screen and (max-width: 991px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList
    .secondItem {
    margin-left: 0;
    width: 100%;
    margin-bottom: 15px;
  }
}

.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .secondNavBox
  .secondWrapper
  .secondNavList
  .secondItem
  h5 {
  font-size: 12px;
  font-weight: 700;
  position: relative;
  padding-right: 30px;
}

@media screen and (max-width: 1200px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList
    .secondItem
    h5 {
    padding-right: 15px;
  }
}

@media screen and (max-width: 991px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList
    .secondItem
    h5 {
    padding-right: 0;
  }
}

.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .secondNavBox
  .secondWrapper
  .secondNavList
  .secondItem
  h5
  a {
  color: rgba(94, 71, 48, 0.7);
}

@media screen and (max-width: 991px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList
    .secondItem
    h5
    a {
    color: #000;
  }
}

.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .secondNavBox
  .secondWrapper
  .secondNavList
  .secondItem
  h5
  span {
  right: 0;
}

@media screen and (max-width: 991px) {
  .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .secondNavBox
    .secondWrapper
    .secondNavList
    .secondItem
    h5
    span {
    display: none;
  }
}

.headBox
  .wrapper
  .headNavBox
  .headNavItem
  .secondNavBox
  .secondWrapper
  .secondNavList
  .secondItem
  h5:hover
  a {
  color: #5e4730;
}

.headBox .wrapper .headNavBox .headNavItem:hover .headNavTitle:after {
  width: 100%;
}

.headBox .wrapper .headNavBox .headNavItem:hover .headNavTitle a {
  color: #5e474e;
}

.headBox .wrapper .headNavBox .headNavItem.active .headNavTitle:after {
  width: 100%;
}

.headBox .wrapper .headNavBox .headNavItem.active .headNavTitle a {
  color: #5e474e;
}

@media screen and (max-width: 991px) {
  .headBox .wrapper .headNavBox .headNavItem.active .headNavTitle a {
    color: #000;
  }
}

.headBox.openMenu {
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
}

@media screen and (min-width: 992px) {
  .headBox.openMenu .wrapper .logo i.whiteLogo {
    display: none;
  }

  .headBox.openMenu .wrapper .logo i.blackLogo {
    display: inline-block;
  }

  .headBox.openMenu .wrapper .headNavBox .headNavItem .headNavTitle a {
    color: rgba(94, 71, 48, 0.7);
  }
}

.headBox.toFixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
}

.headBox.toFixed .wrapper {
  padding-top: 0;
  padding-bottom: 0;
}

.headBox.toFixed .wrapper .logo {
  margin-top: 0;
  left: 75px;
}

@media screen and (max-width: 1200px) {
  .headBox.toFixed .wrapper .logo {
    left: 34px;
  }
}

.headBox.toFixed .wrapper .logo i {
  width: 150px;
  height: 65px;
  background-size: 150px;
  background-position-y: -46px;
}

.headBox.toFixed .wrapper .logo i.whiteLogo {
  display: none;
}

.headBox.toFixed .wrapper .logo i.blackLogo {
  display: inline-block;
}

.headBox.toFixed .wrapper .headNavBox .headNavItem {
  padding: 38px 26px 22px;
}

@media screen and (max-width: 1200px) {
  .headBox.toFixed .wrapper .headNavBox .headNavItem {
    padding: 38px 16px 22px;
  }
}

.headBox.toFixed .wrapper .headNavBox .headNavItem .headNavTitle:after {
  bottom: -24px;
  background-color: #da9d60;
}

.headBox.toFixed .wrapper .headNavBox .headNavItem .headNavTitle a {
  color: rgba(94, 71, 48, 0.7);
}

.headBox.toFixed .wrapper .headNavBox .headNavItem .headNavTitle:hover:after {
  width: 100%;
}

.headBox.toFixed .wrapper .headNavBox .headNavItem .headNavTitle:hover a {
  color: #5e4730;
}

.headBox.toFixed .wrapper .headNavBox .headNavItem .secondNavBox {
  top: 80px;
}

@media screen and (min-width: 992px) {
  #g-header.indexPage .headBox {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
  }

  #g-header.indexPage .headBox .wrapper {
    background-color: transparent;
    border-bottom: none;
  }
}

@media screen and (min-width: 992px) and (min-width: 992px) {
  #g-header.indexPage .headBox .wrapper .logo {
    opacity: 0;
  }
}

@media screen and (min-width: 992px) {
  #g-header.indexPage
    .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle
    a {
    color: hsla(0, 0%, 100%, 0.6);
  }

  #g-header.indexPage
    .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle:after {
    content: "";
    height: 2px;
    background-color: #da9d60;
    width: 0;
    bottom: -5px;
  }
}

@media screen and (min-width: 992px) and (min-width: 992px) {
  #g-header.indexPage
    .headBox
    .wrapper
    .headNavBox
    .headNavItem:hover
    .headNavTitle
    a {
    color: #fff;
  }

  #g-header.indexPage
    .headBox
    .wrapper
    .headNavBox
    .headNavItem:hover
    .headNavTitle:after {
    width: 100%;
  }
}

@media screen and (min-width: 992px) and (min-width: 992px) {
  #g-header.indexPage
    .headBox
    .wrapper
    .headNavBox
    .headNavItem.active
    .headNavTitle
    a {
    color: #fff;
  }

  #g-header.indexPage
    .headBox
    .wrapper
    .headNavBox
    .headNavItem.active
    .headNavTitle:after {
    width: 100%;
  }
}

@media screen and (min-width: 992px) {
  #g-header.indexPage .headBox.openMenu {
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
  }
}

@media screen and (min-width: 992px) and (min-width: 992px) {
  #g-header.indexPage .headBox.openMenu .wrapper .logo {
    opacity: 1;
  }
}

@media screen and (min-width: 992px) {
  #g-header.indexPage
    .headBox.openMenu
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle
    a {
    color: rgba(94, 71, 48, 0.7);
  }
}

@media screen and (min-width: 992px) {
  #g-header.whiteHeader .headBox {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
  }

  #g-header.whiteHeader .headBox .wrapper {
    background-color: transparent;
    border-bottom: none;
  }

  #g-header.whiteHeader .headBox .wrapper .logo i.blackLogo {
    display: none;
  }

  #g-header.whiteHeader .headBox .wrapper .logo i.whiteLogo {
    display: inline-block;
  }

  #g-header.whiteHeader
    .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle
    a {
    color: hsla(0, 0%, 100%, 0.6);
  }

  #g-header.whiteHeader
    .headBox
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle:after {
    content: "";
    height: 2px;
    background-color: #da9d60;
    width: 0;
    bottom: -5px;
  }
}

@media screen and (min-width: 992px) and (min-width: 992px) {
  #g-header.whiteHeader
    .headBox
    .wrapper
    .headNavBox
    .headNavItem:hover
    .headNavTitle
    a {
    color: #fff;
  }

  #g-header.whiteHeader
    .headBox
    .wrapper
    .headNavBox
    .headNavItem:hover
    .headNavTitle:after {
    width: 100%;
  }
}

@media screen and (min-width: 992px) and (min-width: 992px) {
  #g-header.whiteHeader
    .headBox
    .wrapper
    .headNavBox
    .headNavItem.active
    .headNavTitle
    a {
    color: #fff;
  }

  #g-header.whiteHeader
    .headBox
    .wrapper
    .headNavBox
    .headNavItem.active
    .headNavTitle:after {
    width: 100%;
  }
}
@media screen and (min-width: 992px) {
  #g-header.whiteHeader .headBox.toFixed {
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
  }

  #g-header.whiteHeader .headBox.toFixed .wrapper .logo i.blackLogo {
    display: inline-block;
  }

  #g-header.whiteHeader .headBox.toFixed .wrapper .logo i.whiteLogo {
    display: none;
  }

  #g-header.whiteHeader
    .headBox.toFixed
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle:after {
    bottom: -23px;
  }

  #g-header.whiteHeader
    .headBox.toFixed
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle
    a {
    color: rgba(94, 71, 48, 0.7);
  }
}

@media screen and (min-width: 992px) and (min-width: 992px) {
  #g-header.whiteHeader
    .headBox.toFixed
    .wrapper
    .headNavBox
    .headNavItem:hover
    .headNavTitle
    a {
    color: #5e4730;
  }
}

@media screen and (min-width: 992px) {
  #g-header.whiteHeader
    .headBox.toFixed
    .wrapper
    .headNavBox
    .headNavItem.active
    .headNavTitle
    a {
    color: #5e4730;
  }

  #g-header.whiteHeader .headBox.openMenu {
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
  }

  #g-header.whiteHeader .headBox.openMenu .wrapper .logo i.blackLogo {
    display: inline-block;
  }

  #g-header.whiteHeader .headBox.openMenu .wrapper .logo i.whiteLogo {
    display: none;
  }

  #g-header.whiteHeader
    .headBox.openMenu
    .wrapper
    .headNavBox
    .headNavItem
    .headNavTitle
    a {
    color: rgba(94, 71, 48, 0.7);
  }
}
</style>
