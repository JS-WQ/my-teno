<template>
  <div class=''>
    <div class="laShowBox">
      <div class="title-100">
        <p>MY TENO</p>
        <h2 class="h2-100">Show videos</h2>
        <span></span>
      </div>
      <ul
        class="showList"
        ref="listBox"
      >
        <li
          class="showItem"
          v-for="(item,idx) in showData.list"
        >
          <img :src="item.img_url">
          <video
            class="historyVideo"
            loop
            controls
            preload
            x5-video-player-type="h5"
            v-if="item.video_src"
            :src="item.video_src"
          ></video>
          <div class="text">
            <h4>SHOWS</h4>
            <h3 class="h3-50"> MY TENO × {{item.title}}</h3>
            <div
              class="videoBtn"
              style="background-image: url('/images/png/star-btn.png')"
              v-if="item.video_src"
              @click="startVideo($event)"
            >
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import api from "@/api";
import { onMounted, onUpdated } from "@vue/runtime-core";
import $ from "jquery";
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  setup() {
    const listBox = ref(null);
    const showData = reactive({
      list: [],
    });
    const pageLoading = ref(true);

    const store = useStore();

    const getData = () => {
      api
        .getRows({ other_cid: 524, categoryId: 537, video_src: 1 })
        .then((res) => {
          showData.list = res.data;
        });
    };
    
    const startVideo = (el) => {
      let video = $(el.currentTarget).parents(".showItem").find("video");
      if (video[0].paused) {
        video[0].play();
        video.css("visibility", "visible");
      } else {
        video.pause();
        video.css("visibility", "hidden");
      }
    };

    onMounted(() => {
      getData();
    });

    onUpdated(() => {
      if (pageLoading.value) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
      }
    });

    return {
      showData,
      startVideo,
      listBox,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
