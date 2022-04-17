<template>
  <div class=''>
    <div class="laStoresBanner">
      <div class="title-100">
        <p>MY TENO</p>
        <h2 class="h2-100">Store images</h2>
        <span></span>
      </div>
      <div class="img">
        <img :src="storeData.topData.img_url">
        <p>{{storeData.topData.title}}</p>
      </div>
    </div>
    <ul
      class="teStoresList"
      v-viewer
    >
      <template v-for="(item,index) in storeData.list">
        <li class="listItem">
          <div class="left wow fadeInLeft">
            <h2>Stores</h2>
            <div class="firstItem">
              <div class="img">
                <img :src="item[0].img_url">
              </div>
              <div class="txt">
                <span>{{item[0].title}}</span>
                <i
                  class="iconImg"
                  style="background-image:url(/images/png/campaign-btn.png)"
                ></i>
              </div>
            </div>
            <h4>MY TENO</h4>
          </div>
          <div class="right wow fadeInRight">
            <div class="firstItem">
              <div class="img">
                <img :src="item[1].img_url">
              </div>
              <div class="txt">
                <span>{{item[1].title}}</span>
                <i
                  class="iconImg"
                  style="background-image:url(/images/png/campaign-btn.png)"
                ></i>
              </div>
            </div>
          </div>
        </li>
        <li class="listItem">
          <ul>
            <li class="wow fadeInUp">
              <div class="img">
                <img :src="item[2].img_url">
              </div>
              <div class="txt">
                <span>{{item[2].title}}</span>
                <i
                  class="iconImg"
                  style="background-image:url(/images/png/campaign-btn.png)"
                ></i>
              </div>
            </li>
            <li class="wow fadeInUp">
              <div class="img">
                <img :src="item[3].img_url">
              </div>
              <div class="txt">
                <span>{{item[3].title}}</span>
                <i
                  class="iconImg"
                  style="background-image:url(/images/png/campaign-btn.png)"
                ></i>
              </div>
            </li>
            <li class="wow fadeInUp">
              <div class="img">
                <img :src="item[4].img_url">
              </div>
              <div class="txt">
                <span>{{item[4].title}}</span>
                <i
                  class="iconImg"
                  style="background-image:url(/images/png/campaign-btn.png)"
                ></i>
              </div>
            </li>
          </ul>
        </li>
        <li class="listItem">
          <div class="left wow fadeInLeft">
            <div class="img">
              <img :src="item[5].img_url">
            </div>
            <div class="txt">
              <span>{{item[4].title}}</span>
              <i
                class="iconImg"
                style="background-image:url(/images/png/campaign-btn.png)"
              ></i>
            </div>
          </div>
          <div class="right wow fadeInRight">
            <h3>Store Images</h3>
          </div>
        </li>
        <li class="listItem bottomBanner wow zoomIn">
          <img :src="item[6].img_url">
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
          pageSize: 7,
          categoryId: 559,
          other_cid: 524,
          title_en: 1,
        })
        .then((res) => {
          storeData.setLoad.pageMaxIdx = Math.ceil(res.total / 7);
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
      if (pageLoading.value) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
        instance.proxy.$wow.init();
      }

      if (storeData.list.length > 0) {
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
