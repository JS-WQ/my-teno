<template>
  <div class=''>
    <div class="lookbookTitle title-100">
      <p>La Danum</p>
      <h2 class="h2-100">{{laLookBookData.title_en}}</h2>
      <span></span>
    </div>
    <div class="lookbookBox">
      <div class="lookbookNavBox">
        <h4>LOOKBOOK</h4>
        <ul>
          <li
            class="set-one-colums"
            :class="{'active':laLookBookData.state == 1}"
            @click="changeState(1)"
          ><i class="iconfont icon-one"></i></li>
          <li
            class="set-two-colums"
            :class="{'active':laLookBookData.state == 2}"
            @click="changeState(2)"
          ><i class="iconfont icon-er"></i></li>
          <li
            class="set-four-colums"
            :class="{'active':laLookBookData.state == 4}"
            @click="changeState(4)"
          ><i class="iconfont icon-fourth"></i></li>
        </ul>
      </div>
      <ul
        id="lookbookList"
        :class="{'four-colums':laLookBookData.state == 4,'two-colums':laLookBookData.state == 2,'one-colums':laLookBookData.state == 1}"
        v-viewer
      >
        <li
          class="lookbookItem wow zoomIn"
          v-for="item in laLookBookData.list"
        >
          <div class="img">
            <img :src="item.img_url">
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
import { useRoute } from "vue-router";
import { nextTick, onMounted, onUpdated, watch } from "@vue/runtime-core";
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
    const laLookBookData = reactive({
      title_en: "",
      list: [],
      setLoad: {
        pageIndex: 1,
        pageMaxIdx: 1,
        canMore: true,
      },
      state: 4,
    });
    const loading = ref(true);
    const pageLoading = ref(true);

    const instance = getCurrentInstance();
    const store = useStore();
    const route = useRoute();

    const resetData = () => {
      laLookBookData.list = [];
      laLookBookData.setLoad = {
        pageIndex: 1,
        pageMaxIdx: 1,
        canMore: true,
      };
      laLookBookData.state = 4;
      pageLoading.value = true;
    };

    const getBanner = (id) => {
      api.getRow({ id: id, title_en: 1 }).then((res) => {
        laLookBookData.title_en = res.data[0].title_en;
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

    const loadData = function (teLookBookData) {
      teLookBookData.setLoad.canMore = false;
      if (
        laLookBookData.setLoad.pageIndex > laLookBookData.setLoad.pageMaxIdx
      ) {
        loading.value = false;
        return;
      }
      api
        .getRows({
          pageSize: 8,
          pageIndex: laLookBookData.setLoad.pageIndex,
          categoryId: route.params.id,
          title_en: 1,
          filter: "非置顶",
        })
        .then((res) => {
          laLookBookData.setLoad.pageMaxIdx = Math.ceil(res.total / 8);
          laLookBookData.list.push(...res.data);
          laLookBookData.setLoad.pageIndex++;
          laLookBookData.setLoad.canMore = true;
        });
    };

    const initScroll = function () {
      window.removeEventListener("scroll", scrollFn);
      window.addEventListener("scroll", scrollFn);
    };

    const scrollFn = () => {
      var loadTop = iloader.value && iloader.value.offsetTop;
      if (loadTop < $(window).height() + getScrollTop() + 500) {
        laLookBookData.setLoad.canMore && loadData(laLookBookData);
      }
    };

    const initState = function (laLookBookData) {
      if (window.innerWidth < 991) {
        laLookBookData.state = 2;
      }
    };

    const changeState = function (num) {
      laLookBookData.state = num;
    };

    onUpdated(() => {
      if (pageLoading.value && laLookBookData.list.length > 0) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
        $('html,body').stop(true, false).animate({
                scrollTop: 1
            }, 500);
      }
      
      if (laLookBookData.list.length > 0) {
        instance.proxy.$wow.init();
      }
    });

    watch(
      () => route.params,
      (newParams) => {
        resetData();
        initState(laLookBookData);
        getBanner(route.params.id);
        loadData(laLookBookData);
        initScroll();
      },
      { deep: true, immediate: true }
    );

    return {
      laLookBookData,
      iloader,
      changeState,
      loading,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
