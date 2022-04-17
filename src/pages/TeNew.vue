<template>
  <div class=''>
    <div class="teNewsBox">
      <div class="title-100">
        <p>MY TENO</p>
        <h2 class="h2-100">Brand news</h2>
        <span></span>
      </div>
      <div class="newsBanner">
        <div class="wrapper">
          <img :src="newData.topData.img_url">
        </div>
        <div class="text">
          <h4>{{newData.topData.title_en}}</h4>
          <h3 class="h3-50">MY TENO丨{{newData.topData.title}}</h3>
          <p>{{newData.topData.sub_title}}</p>
          <a :href="newData.topData.link_url">探索更多</a>
        </div>
      </div>
      <div class="newsListBox">
        <ul
          class="newsList"
          ref="newList"
        >
          <li
            class="newsItem wow zoomIn"
            v-for="item in newData.list"
            :key="item.id"
            :ref="setItemRef"
          >
            <a
              :href="item.link_url"
              target="_blank"
            >
              <div class="img">
                <img :src="item.img_url">
              </div>
              <div class="text">
                <p>{{item.sub_title}}</p>
                <h4>MY TENO | {{item.title}}</h4>
                <span>{{item.addtime}}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
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
import { nextTick, onMounted, onUpdated, watch } from "@vue/runtime-core";
import Masonry from "masonry-layout";
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
    const newList = ref(null);
    const newData = reactive({
      topData: {},
      list: [],
      setLoad: {
        pageIndex: 1,
        pageMaxIdx: 1,
        canMore: true,
      },
      imasonry: null,
    });
    const loading = ref(true);
    const pageLoading = ref(true);

    const itemRefs = reactive([]);
    const instance = getCurrentInstance();
    const store = useStore();

    const getBanner = (id) => {
      api
        .getRows({
          other_cid: 524,
          categoryId: 539,
          filter: "置顶",
          title_en: 1,
          sub_title: 1,
        })
        .then((res) => {
          newData.topData = res.data[0];
        });
    };

    const initMasonry = () => {
      Promise.all(
        newData.list.map((item) => {
          return new Promise((resolve, reject) => {
            let imgEm = new Image();
            imgEm.src = item.img_url;
            imgEm.onload = function () {
              resolve(item.img_url);
            };
          });
        })
      ).then((res) => {
        newData.imasonry = new Masonry(newList.value, {
          percentPosition: true,
        });
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

    const loadData = function (newData) {
      newData.setLoad.canMore = false;
      if (newData.setLoad.pageIndex > newData.setLoad.pageMaxIdx) {
        loading.value = false;
        return;
      }
      api
        .getRows({
          other_cid: 524,
          categoryId: 539,
          pageSize: 6,
          pageIndex: newData.setLoad.pageIndex,
          sub_title: 1,
          filter: "非置顶",
        })
        .then((res) => {
          newData.setLoad.pageMaxIdx = Math.ceil(res.total / 6);
          newData.list.push(...res.data);
          newData.setLoad.pageIndex++;
          newData.setLoad.canMore = true;
        });
    };

    const initScroll = function (newData) {
      window.addEventListener("scroll", function () {
        var loadTop = iloader.value && iloader.value.offsetTop;
        if (loadTop < $(window).height() + getScrollTop() + 500) {
          newData.setLoad.canMore && loadData(newData);
        }
      });
    };

    const setItemRef = (el) => {
      if (el) {
        itemRefs.push(el);
      }
    };

    onMounted(() => {
      getBanner();
      loadData(newData);
      initScroll(newData);
    });

    onUpdated(() => {
      initMasonry();
      if (pageLoading.value && newData.list.length > 0) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
        instance.proxy.$wow.init();
      }

      if (newData.list.length > 8) {
        instance.proxy.$wow.init();
      }
    });
    
    return {
      newData,
      newList,
      iloader,
      setItemRef,
      loading,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
