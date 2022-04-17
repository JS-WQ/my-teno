<template>
  <div class=''>
    <my-banner
      :bannerData="aboutData.bannerData"
      class="aboutBanner"
      v-if="aboutData.bannerData.img_url"
    ></my-banner>
    <div class="aboutContent">
      <div class="wrapper">
        <div class="title wow fadeInUp">
          <p>Brand profile</p>
          <h2 class="h2-100">About</h2>
          <h2 class="h2-100">La Danum</h2>
        </div>
        <div
          v-html="setImgStr(aboutData.message.content)"
          v-if="aboutData.message.content"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive,ref } from "@vue/reactivity";
import myBanner from "../components/Banner/Index.vue";
import { computed, onMounted, onUpdated } from "@vue/runtime-core";
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
    const instance = getCurrentInstance();
    const store = useStore();
    const pageLoading = ref(true);

    const getData = () => {
      Promise.all([api.getRow({ id: 1874 }), api.getRow({ id: 1876 })]).then(
        (res) => {
          aboutData.bannerData = res[0].data[0];
          aboutData.message = res[1].data[0];
        }
      );
    };

    const setImgStr = (str) => {
      return str.replace(/(\/upload)/gi, "https://www.myteno.com/upload");
    };

    onUpdated(()=>{
        if(pageLoading.value){
            store.commit("mainStore/hideLoading", false);
            pageLoading.value = false;
            instance.proxy.$wow.init();
        };
    })

    onMounted(() => {
      getData();
    });

    return {
      aboutData,
      setImgStr,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
