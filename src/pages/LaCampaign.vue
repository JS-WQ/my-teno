<template>
  <div class=''>
    <my-banner
      class="campaignBanner lacampaignBanner "
      :bannerData='campaginData.bannerData'
    ></my-banner>
    <div class="campaignBox">
      <ul
        class="campaignList laCampaignList"
        v-viewer
      >
        <li
          class="campaignItem wow zoomIn"
          v-for="item in campaginData.list"
        >
          <div class="imgBox">
            <div class="img">
              <img :src="item.img_url">
            </div>
            <div class="txt">
              <h4>{{item.title_en}}</h4>
            </div>
          </div>
          <p>
            <span>{{item.title}}</span>
            <i
              class="iconImg"
              style="background-image:url(/images/png/campaign-btn.png)"
            ></i>
          </p>
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
import { useRoute } from "vue-router";
import { onMounted, watch, onUpdated } from "@vue/runtime-core";
import myBanner from "../components/Banner/Index.vue";
import $ from "jquery";
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";

export default {
  name: "teCampaign",
  data() {
    return {};
  },
  components: {
    myBanner,
  },
  setup() {
    const iloader = ref(null);
    const campaginData = reactive({
      bannerData: {},
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
    const route = useRoute();

    const resetData = () => {
      campaginData.list = [];
      campaginData.setLoad = {
        pageIndex: 1,
        pageMaxIdx: 1,
        canMore: true,
      };
      pageLoading.value = true;
    };

    const getBanner = (id) => {
      api
        .getRows({ categoryId: id, vidoe_src: 1, filter: "置顶" })
        .then((res) => {
          campaginData.bannerData = res.data[0];
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

    const loadData = function (campaginData) {
      campaginData.setLoad.canMore = false;
      if (campaginData.setLoad.pageIndex > campaginData.setLoad.pageMaxIdx) {
        loading.value = false;
        return;
      }
      api
        .getRows({
          pageSize: 6,
          pageIndex: campaginData.setLoad.pageIndex,
          categoryId: route.params.id,
          title_en: 1,
          filter: "非置顶",
        })
        .then((res) => {
          campaginData.setLoad.pageMaxIdx = Math.ceil(res.total / 6);
          campaginData.list.push(...res.data);
          campaginData.setLoad.pageIndex++;
          campaginData.setLoad.canMore = true;
        });
    };

    const initScroll = function () {
      window.removeEventListener("scroll", scrollFn);
      window.addEventListener("scroll", scrollFn);
    };

    const scrollFn = () => {
      var loadTop = iloader.value && iloader.value.offsetTop;
      if (loadTop < $(window).height() + getScrollTop() + 500) {
        campaginData.setLoad.canMore && loadData(campaginData);
      }
    };

    watch(
      () => route.params,
      (newParams) => {
        resetData();
        getBanner(route.params.id);
        loadData(campaginData);
        initScroll();
      },
      { deep: true, immediate: true }
    );

    onUpdated(() => {
      if (pageLoading.value && campaginData.list.length > 0) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
      }

      if(campaginData.list.length > 0){
        instance.proxy.$wow.init();
      }
    });

    return {
      campaginData,
      iloader,
      loading,
    };
  },
};
</script>

<style lang='scss' scoped>
.iconImg {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  width: 10px;
  height: 11px;
}
</style>
