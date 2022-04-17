<template>
  <div>
    <div class="footBox" v-if="name === 'main'">
      <div class="wrapper">
        <ul class="footCont">
          <li class="footItem">
            <h4>Follow us</h4>
            <ul class="campanyBox">
              <li class="active">马天奴</li>
              <li>阿丹娜</li>
              <li>KODICE</li>
            </ul>
            <div class="contactIconBox">
              <ul class="companyItemBox active">
                <li>
                  <img
                    src="../../assets/images/footer/myteno-wx.jpg"
                    class="ewmImg"
                  >
                  <img
                    src="../../assets/images/footer/wxIcon.png"
                    class="contactIcon"
                  >
                </li>
                <li>
                  <a
                    href="https://myteno.tmall.com/"
                    target="_blank"
                  >
                    <img
                      src="../../assets/images/footer/tmIcon.png"
                      class="contactIcon"
                    >
                  </a>
                </li>
                <li>
                  <img
                    src="../../assets/images/footer/myteno-dy.jpg"
                    class="ewmImg"
                  >
                  <img
                    src="../../assets/images/footer/douyinIcon.png"
                    class="contactIcon"
                  >
                </li>
              </ul>
              <ul class="companyItemBox">
                <li>
                  <img
                    src="../../assets/images/footer/ladanum-wx.jpg"
                    class="ewmImg"
                  >
                  <img
                    src="../../assets/images/footer/wxIcon.png"
                    class="contactIcon"
                  >
                </li>
                <li>
                  <a
                    href="https://ladanum.tmall.com/"
                    target="_blank"
                  >
                    <img
                      src="../../assets/images/footer/tmIcon.png"
                      class="contactIcon"
                    >
                  </a>
                </li>
              </ul>
              <ul class="companyItemBox">
                <li>
                  <img
                    src="../../assets/images/footer/KODICE-wx.jpg"
                    class="ewmImg"
                  >
                  <img
                    src="../../assets/images/footer/wxIcon.png"
                    class="contactIcon"
                  >
                </li>
                <li>
                  <a
                    href="https://kodice.tmall.com/"
                    target="_blank"
                  >
                    <img
                      src="../../assets/images/footer/tmIcon.png"
                      class="contactIcon"
                    >
                  </a>
                </li>
                <li>
                  <img
                    src="../../assets/images/footer/KODICE-dy.jpg"
                    class="ewmImg"
                  >
                  <img
                    src="../../assets/images/footer/douyinIcon.png"
                    class="contactIcon"
                  >
                </li>
                <li>
                  <img
                    src="../../assets/images/footer/KODICE-KIKI-dy.jpg"
                    class="ewmImg"
                  >
                  <img
                    src="../../assets/images/footer/douyinIcon.png"
                    class="contactIcon"
                  >
                </li>
                <li>
                  <a
                    href="https://www.weibo.com/kodice"
                    target="_blank"
                  >
                    <img
                      src="../../assets/images/footer/weiboIcon.png"
                      class="contactIcon"
                    >
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.xiaohongshu.com/user/profile/5eba7127000000000100142f?xhsshare=CopyLink&appuid=557332cc0bf90c6da8c5acd3&apptime=1623141494"
                    target="_blank"
                  >
                    <img
                      src="../../assets/images/footer/xiaohongshu.png"
                      class="contactIcon"
                    >
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="footItem brandBox">
            <h4>Brands</h4>
            <ul class="footConListBox">
              <li v-if="teCamId">
                <router-link :to="{name:'teCampaign',params:{id:`${teCamId}`}}">MY TENO</router-link>
              </li>
              <li v-if="laCamId">
                <router-link :to="{name:'laCampaign',params:{id:`${laCamId}`}}">MY TENO</router-link>
              </li>
              <li><a
                  href="http://www.kodice.cn"
                  target="_blank"
                >KODICE</a></li>
            </ul>
          </li>
          <li class="footItem contactBox">
            <h4>Contact</h4>
            <ul class="footConListBox">
              <li><span>Tel </span> : 0755-3289 8999</li>
              <li><span>Fax </span> : 0755-3298 3992</li>
              <li><span>E-mail </span> : fuchao@myteno.com</li>
            </ul>
          </li>
          <li class="footItem">
            <h4>Address</h4>
            <ul class="footConListBox">
              <li>
                <p>深圳市布吉布澜路赛兔数码科技园1栋9楼</p>
              </li>
              <li>
                <p class="en">9/F,1 Block, Saitu Technology Parks, Bulan Road,Buji,Shenzhen,china</p>
              </li>
            </ul>
          </li>
        </ul>
        <div class="footBottom">
          COPYRIGHT @ <span class="j-time">{{itime}}</span> MYTENO ALL RIGHTS RESERVED <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
          >粤ICP备11007859号</a>
          <p>
            <a
              href="https://yfd.com.cn/"
              target="_blank"
            >POWER BY:YUFEI DESIGN</a>
          </p>
        </div>
      </div>
    </div>
    <div class="laFootBox" v-if="name === 'la'">
      <div class="wrapper">
        <div class="left">
          COPYRIGHT © <span class="j-time">{{itime}}</span> MYTENO ALL RIGHTS RESERVED
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
          >粤ICP备11007859号</a>
          <a
            href="https://yfd.com.cn/"
            target="_blank"
          >POWER BY:YUFEI DESIGN</a>
        </div>
        <div class="right">
          <div class="phone">Tel : 0755-3289 8999</div>
          <ul class="contactIconBox">
            <li>
              <img
                src="../../assets/images/footer/ladanum-wx.jpg"
                class="ewmImg"
              >
              <img
                src="../../assets/images/footer/wxmini.png"
                class="contactIcon"
              >
            </li>
            <li>
              <a href="https://ladanum.tmall.com/">
                <img
                  src="../../assets/images/footer/tmmini.png"
                  class="contactIcon"
                >
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="teFootBox" v-if="name === 'te'">
      <div class="wrapper">
        <div class="left">
          COPYRIGHT @ <span class="j-time">{{itime}}</span> MYTENO ALL RIGHTS RESERVED
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
          >粤ICP备11007859号</a>
          <a
            href="https://yfd.com.cn/"
            target="_blank"
          >POWER BY:YUFEI DESIGN</a>
        </div>
        <div class="right">
          <div class="phone">Tel : 0755-3289 8999</div>
          <ul class="contactIconBox">
            <li>
              <img
                src="../../assets/images/footer/myteno-wx.jpg"
                class="ewmImg"
              >
              <img
                src="../../assets/images/footer/wxmini.png"
                class="contactIcon"
              >
            </li>
            <li>
              <a
                href="https://myteno.tmall.com/"
                target="_blank"
              >
                <img
                  src="../../assets/images/footer/tmmini.png"
                  class="contactIcon"
                >
              </a>
            </li>
            <li>
              <img
                src="../../assets/images/footer/myteno-dy.jpg"
                class="ewmImg"
              >
              <img
                src="../../assets/images/footer/douyinmini.png"
                class="contactIcon"
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from 'vuex';
export default {
  name: "my-footer",
  data() {
    return {};
  },
  props:['name'],
  setup() {
    const itime = ref(0);
    const store = useStore()
    const setTime = () => {
      itime.value = new Date().getFullYear();
    };

    onMounted(() => {
      setTime();
    });


    return {
        teCamId: computed(()=>store.state.mainStore.teCampaignId),
        laCamId: computed(()=>store.state.mainStore.laCampaignId),
        itime
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
