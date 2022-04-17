<template>
  <div
    id='g-content'
  >
    <div class="indexBannerBox">
      <swiper
        effect='fade'
        :modules='modules'
        class="indexBannerSwiper"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }"
      >
        <swiper-slide
          v-for="item in indexData.list"
          :style="{backgroundImage: `url(${item.img_url})`}"
          :key="item.id"
        >
          <div
            class="wap-img"
            :style="{backgroundImage: `url(${item.big_img})`}"
          ></div>
          <div class="textBox">
            <div v-html="setImgStr(item.content)"></div>
            <a :href="item.link_url">探索</a>
          </div>
        </swiper-slide>
      </swiper>
      <div
        class="indexBannerNav"
        v-if="indexData.list.length > 0"
      >
        <ul>
          <li :class="{'active':activeIndex == 0}" @mouseover='isHover(0)'>
              <router-link :to="{name:'teCampaign',params:{id:`${teCamId}`}}"><img src="../images/png/Myteno.png"></router-link>
          </li>
          <li :class="{'active':activeIndex == 1}" @mouseover='isHover(1)'>
              <router-link :to="{name:'laCampaign',params:{id:`${laCamId}`}}"><img src="../images/png/Ladanum.png"></router-link>
          </li>
          <li :class="{'active':activeIndex == 2}" @mouseover='isHover(2)'>
            <a :href="indexData.list[2].link_url"><img src="../images/png/kodice.png"></a>
          </li>
        </ul>
      </div>
      <div class="indexBeian">
        <a href="https://beian.miit.gov.cn/">粤ICP备11007859号</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import { onMounted, reactive, getCurrentInstance, ref, computed,onUpdated } from "vue";
import { useStore } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const indexData = reactive({
      list: [],
    });
    const activeIndex = ref(0);
    const instance = getCurrentInstance();
    const store = useStore();
    const iswiper = reactive({
        mySwiper:null
    })
    const pageLoading = ref(true);

    const onSlideChange = (swiper) => {
      activeIndex.value = swiper.activeIndex;
    };

    const onSwiper = (swiper)=>{
        iswiper.mySwiper = swiper
    }

    const isHover = (num)=>{
        iswiper.mySwiper.slideTo(num,1000,false)
    }

    const getBannerData = () => {
      api.getRows({ categoryId: 534, big_img: 1 }).then((res) => {
        indexData.list = res.data;
      });
    };

    const setImgStr = (str)=>{
        return str.replace(/(\.\/assets)/gi,'https://www.myteno.com/assets')
    }

    onUpdated(()=>{
        if(pageLoading.value){
            store.commit("mainStore/hideLoading", false);
            pageLoading.value = false;
            instance.proxy.$wow.init();
        };
    })

    onMounted(() => {
      getBannerData();
    });

    return {
      indexData,
      modules: [EffectFade, Autoplay],
      onSlideChange,
      activeIndex,
      onSwiper,
      isHover,
      teCamId: computed(()=>store.state.mainStore.teCampaignId),
      laCamId: computed(()=>store.state.mainStore.laCampaignId),
      setImgStr
    };
  },
};
</script>

<style lang='scss' scoped>
.indexBannerBox {
  height: 100vh;
  @include mobile{
      height: 100%;
  }
}
</style>
