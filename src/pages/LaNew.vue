<template>
  <div class=''>
    <div class="laNewsBox">
      <div class="title-100">
        <p>La Danum</p>
        <h2 class="h2-100">Brand news</h2>
        <span></span>
      </div>
      <ul
        class="newsList"
        ref="newList"
      >
        <li
          class="newsItem wow zoomIn"
          v-for="item in newData.list"
          :key="item.id"
        >
          <a :href="item.link_url">
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

    const loadData = function (newData) {
      newData.setLoad.canMore = false;
      if (newData.setLoad.pageIndex > newData.setLoad.pageMaxIdx) {
        loading.value = false;
        return;
      }
      api
        .getRows({
          other_cid: 525,
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

    onUpdated(() => {
      if (pageLoading.value) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
        instance.proxy.$wow.init();
      }
      if (newData.list.length > 6) {
        instance.proxy.$wow.init();
      }
    });

    onMounted(() => {
      loadData(newData);
      initScroll(newData);
    });

    return {
      newData,
      newList,
      iloader,
      loading,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
