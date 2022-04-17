<template>
  <div class=''>
    <div class="laStarBox">
      <div class="title-100">
        <p>La Danum</p>
        <h2 class="h2-100">Celebrities</h2>
        <span></span>
      </div>
      <ul class="starList">
        <li
          class="starItem wow zoomIn"
          v-for="item in starData.list"
          @click="showImgs(item.id)"
        >
          <div class="img">
            <img :src="item.img_url" >
          </div>
          <h4>{{item.title}} × La Danum</h4>
          <div class="btnBox">
            <div
              class="wrapper"
              style="background-image: url('/images/png/star-btn.png')"
            >
              <span>Read</span>
            </div>
          </div>
        </li>
      </ul>
      <div
        class="grid-loader"
        ref="iloader"
        v-loading="loading"
      >
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive, ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import $ from "jquery";
import { api as viewerApi } from "v-viewer";
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  setup() {
    const iloader = ref(null);
    const starData = reactive({
      list: [],
      setLoad: {
        pageIndex: 1,
        pageMaxIdx: 1,
        canMore: true,
      },
    });
    const loading = ref(true);
    const pageLoading = ref(true);

    const instance = getCurrentInstance();
    const store = useStore();
   
    function getScrollTop() {
      var scrollPos;
      if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
      } else if (document.compatMode && document.compatMode != "BackCompat") {
        scrollPos = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollPos = document.body.scrollTop;
      }
      return scrollPos;
    }

    const loadData = function (starData) {
      starData.setLoad.canMore = false;
      if (starData.setLoad.pageIndex > starData.setLoad.pageMaxIdx) {
        loading.value = false;
        return;
      }
      api
        .getRows({
          pageSize: 8,
          categoryId: 538,
          pageIndex: starData.setLoad.pageIndex,
          sub_title: 1,
          filter: "非置顶",
          other_cid: 525,
        })
        .then((res) => {
          starData.setLoad.pageMaxIdx = Math.ceil(res.total / 8);
          starData.list.push(...res.data);
          starData.setLoad.pageIndex++;
          starData.setLoad.canMore = true;
        });
    };

    const initScroll = function (starData) {
      window.addEventListener("scroll", function () {
        var loadTop = iloader.value && iloader.value.offsetTop;
        if (loadTop < $(window).height() + getScrollTop() + 500) {
          starData.setLoad.canMore && loadData(starData);
        }
      });
    };

    const showImgs = (id) => {
      api.getAlbum({ id: id }).then((res) => {
        viewerApi({
          options: {
            toolbar: true,
            url: "original_path",
          },
          images: res.data,
        });
      });
    };

    onMounted(() => {
      loadData(starData);
      initScroll(starData);
    });

    onUpdated(() => {
      if (pageLoading.value) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
        instance.proxy.$wow.init();
      }
      if (starData.list.length > 8) {
        instance.proxy.$wow.init();
      }
    });

    return {
      starData,
      iloader,
      showImgs,
      loading,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
