<template>
  <div class=''>
    <div class="teHistoryBox">
      <div class="title-100 wow fadeInUp">
        <p>About La Danum</p>
        <h2 class="h2-100">Brand history</h2>
        <span></span>
      </div>
      <div class="videoBox wow zoomIn">
        <img :src="historyData.data.img_url">
        <video
          class="historyVideo"
          v-if="historyData.data.video_src"
          loop
          controls
          preload
          x5-video-player-type="h5"
          :src="historyData.data.video_src"
          ref="ivideo"
          v-show="!isPaused"
        ></video>
      </div>
      <div
        class="videoBtn wow fadeInUp"
        v-if="historyData.data.video_src"
        @click="startVideo"
      >
        <i class="iconfont icon-bofang"></i>
        <span>{{state}}</span>
      </div>
      <h3 class="wow fadeInUp">{{historyData.data.title_en}}</h3>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted, onUpdated } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  setup() {
    const ivideo = ref(null);
    const isPaused = ref(true);
    const historyData = reactive({
      data: {},
    });
    const pageLoading = ref(true);

    const instance = getCurrentInstance();
    const store = useStore();

    const getData = () => {
      api.getRow({ id: 1915, title_en: 1, video_src: 1 }).then((res) => {
        historyData.data = res.data[0];
        store.commit("mainStore/hideLoading", false);
        instance.proxy.$wow.init();
      });
    };

    const startVideo = () => {
      if (ivideo.value.paused) {
        isPaused.value = false;
        ivideo.value.play();
      } else {
        isPaused.value = true;
        ivideo.value.pause();
      }
    };

    const state = computed(() => (isPaused.value ? "播放视频" : "暂停播放"));

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
      historyData,
      startVideo,
      ivideo,
      state,
      isPaused,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
