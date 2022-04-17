<template>
  <div class=''>
    <my-banner
      :bannerData="aboutData.bannerData"
      class="aboutBanner"
      v-if="aboutData.bannerData.img_url"
    ></my-banner>
    <div
      class="teAboutContent"
      v-if="aboutData.message.content"
    >
      <div class="wrapper">
        <div class="title wow fadeInUp">
          <p>Brand profile</p>
          <h2 class="h2-100">About</h2>
          <h2 class="h2-100">MY TENO</h2>
          <span></span>
        </div>
        <div
          class="txt wow fadeInUp"
          v-html="aboutData.message.content"
        >
        </div>
        <div class="img">
          <img
            :src="aboutData.message.img_url"
            class="wow zoomIn"
          >
          <h3 class="wow fadeInUp">{{aboutData.message.zhaiyao}}</h3>
        </div>
      </div>
    </div>
    <div class="teAboutNavBox">
      <ul>
        <li>
          <router-link to="/teAbout">Brand profile</router-link>
        </li>
        <li>
          <router-link to="/teTeam">Design team</router-link>
        </li>
        <li>
          <router-link to="/teHistory">Brand history</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive,ref } from "@vue/reactivity";
import myBanner from "../components/Banner/Index.vue";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    myBanner,
  },
  setup() {
    const aboutData = reactive({
      bannerData: {},
      message: {},
    });
    const pageLoading = ref(true);

    const instance = getCurrentInstance();
    const store = useStore();

    const getData = () => {
      Promise.all([api.getRow({ id: 1875 }), api.getRow({ id: 1877 })]).then(
        (res) => {
          aboutData.bannerData = res[0].data[0];
          aboutData.message = res[1].data[0];
          store.commit("mainStore/hideLoading", false);
          instance.proxy.$wow.init();
        }
      );
    };

    onMounted(() => {
      getData();
    });

    onUpdated(() => {
      if (pageLoading.value) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
        instance.proxy.$wow.init();
      }
    });

    return {
      aboutData,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
