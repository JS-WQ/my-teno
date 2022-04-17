<template>
  <div class=''>
    <div class="lookbookTitle title-100">
      <p>MY TENO</p>
      <h2 class="h2-100">{{teLookBookData.title_en}}</h2>
      <span></span>
    </div>
    <div class="lookbookBox">
      <div
        class="lookbookNavBox"
        id="lookbookNavBox"
      >
        <h4>LOOKBOOK</h4>
        <ul>
          <li
            class="set-one-colums"
            :class="{'active':teLookBookData.state == 1}"
            @click="changeState(1)"
          ><i class="iconfont icon-one"></i></li>
          <li
            class="set-two-colums"
            :class="{'active':teLookBookData.state == 2}"
            @click="changeState(2)"
          ><i class="iconfont icon-er"></i></li>
          <li
            class="set-four-colums"
            :class="{'active':teLookBookData.state == 4}"
            @click="changeState(4)"
          ><i class="iconfont icon-fourth"></i></li>
        </ul>
      </div>
      <ul
        id="lookbookList"
        :class="{'four-colums':teLookBookData.state == 4,'two-colums':teLookBookData.state == 2,'one-colums':teLookBookData.state == 1}"
        v-viewer
      >
        <li
          class="lookbookItem wow zoomIn"
          v-for="item in teLookBookData.list"
        >
          <a>
            <div class="img">
              <img :src="item.img_url">
            </div>
          </a>
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
import { onMounted, onUpdated, watch } from "@vue/runtime-core";
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
    const teLookBookData = reactive({
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
      teLookBookData.list = [];
      teLookBookData.setLoad = {
        pageIndex: 1,
        pageMaxIdx: 1,
        canMore: true,
      };
      teLookBookData.state = 4;
      pageLoading.value = true;
    };

    const getBanner = (id) => {
      api.getRow({ id: id, title_en: 1 }).then((res) => {
        teLookBookData.title_en = res.data[0].title_en;
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
        teLookBookData.setLoad.pageIndex > teLookBookData.setLoad.pageMaxIdx
      ) {
        loading.value = false;
        return;
      }
      api
        .getRows({
          pageSize: 8,
          pageIndex: teLookBookData.setLoad.pageIndex,
          categoryId: route.params.id,
          title_en: 1,
          filter: "非置顶",
        })
        .then((res) => {
          teLookBookData.setLoad.pageMaxIdx = Math.ceil(res.total / 8);
          teLookBookData.list.push(...res.data);
          teLookBookData.setLoad.pageIndex++;
          teLookBookData.setLoad.canMore = true;
        });
    };

    const initScroll = function () {
      window.removeEventListener("scroll", scrollFn);
      window.addEventListener("scroll", scrollFn);
    };

    const scrollFn = () => {
      var loadTop = iloader.value && iloader.value.offsetTop;
      if (loadTop < $(window).height() + getScrollTop() + 500) {
        teLookBookData.setLoad.canMore && loadData(teLookBookData);
      }
    };

    const initState = function (teLookBookData) {
      if (window.innerWidth < 991) {
        teLookBookData.state = 2;
      }
    };

    const changeState = function (num) {
      teLookBookData.state = num;
    };

    watch(
      () => route.params,
      (newParams) => {
        resetData();
        initState(teLookBookData);
        getBanner(route.params.id);
        loadData(teLookBookData);
        initScroll();
      },
      { deep: true, immediate: true }
    );

    onUpdated(() => {
      if (pageLoading.value && teLookBookData.list.length > 0) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
        $('html,body').stop(true, false).animate({
                scrollTop: 1
            }, 500);
      }

      if (teLookBookData.list.length > 0) {
         instance.proxy.$wow.init();
      }
    });

    return {
      teLookBookData,
      iloader,
      changeState,
      loading,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
