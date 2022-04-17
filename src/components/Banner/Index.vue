<template>
  <div
      class="pageBanner"
      v-if="bannerData"
    >
      <div
        class="img"
        v-if="bannerData.img_url"
        :style="{backgroundImage: `url(${bannerData.img_url})`}"
      ></div>
      <video
        class="historyVideo"
        loop
        controls
        preload
        x5-video-player-type="h5"
        v-if="bannerData.video_src"
        :src="bannerData.video_src"
      ></video>
      <div class="txt">
        <h2
          class="h2-100"
          v-if="bannerData.content"
          v-html="bannerData.content"
        ></h2>
        <div
          class="videoBtn"
          style="background-image: url('../images/png/star-btn.png')"
          v-if="bannerData.video_src"
        >
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <div class="nextBtnBox" v-toNext>
        <div class="nextImg"><i class="iconfont icon-next-btn"></i></div>
        <img src="../images/png/next-btn-solide.png">
      </div>
    </div>
</template>

<script>
export default {
  name: "myBanner",
  data() {
    return {};
  },
  components: {},
  props: ["bannerData"],
};
</script>

<style lang='scss' scoped>
</style>
