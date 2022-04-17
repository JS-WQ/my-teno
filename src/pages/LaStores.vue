<template>
  <div class=''>
    <div class="laStoresBanner">
      <div class="title-100">
        <p>La Danum</p>
        <h2 class="h2-100">Store images</h2>
        <span></span>
      </div>
      <div class="img">
        <img :src="storeData.topData.img_url">
        <p>{{storeData.topData.title}}</p>
      </div>
    </div>
    <ul
      class="laStoresList"
      v-viewer
    >
      <template v-for="(item,index) in storeData.list">
        <li class="listItem">
          <div
            class="left wow fadeInLeft"
            v-if="item[0]"
          >
            <h2>Stores</h2>
            <div class="firstItem">
              <div class="img">
                <img :src="item[0].img_url">
              </div>
              <div
                class="txt"
                v-if="item[0].title"
              >
                <span>{{item[0].title}}</span>
                <i
                  class="iconImg"
                  style="background-image:url(/images/png/campaign-btn.png)"
                ></i>
              </div>
            </div>
            <h4>LA DANUM</h4>
          </div>
          <div
            class="right wow fadeInRight"
            v-if="item[1]"
          >
            <div class="firstItem">
              <div class="img">
                <img :src="item[1].img_url">
              </div>
              <div
                class="txt"
                v-if="item[1].title"
              >
                <span>{{item[1].title}}</span>
                <i
                  class="iconImg"
                  style="background-image:url(/images/png/campaign-btn.png)"
                ></i>
              </div>
            </div>
          </div>
        </li>
        <li
          class="listItem bottomBanner wow zoomIn"
          v-if="item[2]"
        >
          <img :src="item[2].img_url">
        </li>
      </template>
    </ul>
    <div
      class="grid-loader"
      ref="iloader"
      v-loading="loading"
    >
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive, ref } from "@vue/reactivity";
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
    const iloader = ref(null);
    const storeData = reactive({
      topData: {},
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

    const getBanner = (id) => {
      api
        .getRow({
          id: 1853,
        })
        .then((res) => {
          storeData.topData = res.data[0];
        });
    };

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

    const loadData = function (storeData) {
      storeData.setLoad.canMore = false;
      if (storeData.setLoad.pageIndex > storeData.setLoad.pageMaxIdx) {
        loading.value = false;
        return;
      }
      api
        .getRows({
          pageIndex: storeData.setLoad.pageIndex,
          filter: "非置顶",
          pageSize: 3,
          categoryId: 559,
          other_cid: 525,
          title_en: 1,
        })
        .then((res) => {
          storeData.setLoad.pageMaxIdx = Math.ceil(res.total / 3);
          storeData.list.push(res.data);
          storeData.setLoad.pageIndex++;
          storeData.setLoad.canMore = true;
        });
    };

    const initScroll = function (storeData) {
      window.addEventListener("scroll", function () {
        var loadTop = iloader.value && iloader.value.offsetTop;
        if (loadTop < $(window).height() + getScrollTop() + 500) {
          storeData.setLoad.canMore && loadData(storeData);
        }
      });
    };

    onMounted(() => {
      getBanner();
      loadData(storeData);
      initScroll(storeData);
    });

    onUpdated(() => {
      if (pageLoading.value && storeData.list.length > 0) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
      }
      
      if(storeData.list.length > 0){
        instance.proxy.$wow.init();
      }
    });

    return {
      storeData,
      iloader,
      loading,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
