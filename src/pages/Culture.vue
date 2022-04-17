<template>
  <div class=''>
    <div
      class="groupBanner cultureBanner"
      v-if="cultureData.banner.categoryid"
    >
      <div
        class="img"
        :style="{backgroundImage: `url(${cultureData.banner.img_url})`}"
      ></div>
      <h2 class="h2-100">{{cultureData.banner.title}}</h2>
    </div>
    <div class="cultureBox">
      <div class="title">
        <p v-html="cultureData.banner.content"></p>
      </div>
      <ul class="cultureList">
        <li
          class="cultureItem wow fadeInUp"
          v-for="(item,index) in cultureData.list"
          :key="item.id"
          :data-wow-delay="delayTime(index)"
        >
          <a :href="`https://www.myteno.com/casexqx-${item.id}.html`" target="_blank">
            <div class="img">
              <img :src="item.img_url">
            </div>
            <div class="text">
              <h4>{{item.title}}</h4>
              <p>{{item.title_en}}</p>
              <span>Read more</span>
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
import { onMounted, onUpdated } from "@vue/runtime-core";
import $ from "jquery";
import { getCurrentInstance } from "vue";
import { useStore } from 'vuex';

export default {
  data() {
    return {};
  },
  components: {},
  setup() {
    const iloader = ref(null);
    const cultureData = reactive({
      banner: {},
      list: [],
      setLoad: {
        pageIndex: 1,
        pageMaxIdx: 1,
        canMore: true,
      },
    });
    const instance = getCurrentInstance();
    const store = useStore();
    const loading = ref(true);
    const pageLoading = ref(true);

    const getBanner = () => {
      api.getRow({ id: 2541 }).then((res) => {
        cultureData.banner = res.data[0];
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

    const loadData = function (cultureData) {
      cultureData.setLoad.canMore = false;
      if (cultureData.setLoad.pageIndex > cultureData.setLoad.pageMaxIdx){
        loading.value = false;
        return;
      }
      api
        .getRows({
          pageSize: 4,
          categoryId: 570,
          pageIndex: cultureData.setLoad.pageIndex,
          sub_title: 1,
          filter: "非置顶",
          title_en: 1,
        })
        .then((res) => {
          cultureData.setLoad.pageMaxIdx = Math.ceil(res.total / 4);
          cultureData.list.push(...res.data);
          cultureData.setLoad.pageIndex++;
          cultureData.setLoad.canMore = true;
        });
    };

    const initScroll = function (cultureData) {
      window.addEventListener("scroll", function () {
        var loadTop = iloader.value && iloader.value.offsetTop;
        if (loadTop < $(window).height() + getScrollTop() + 300) {
          cultureData.setLoad.canMore && loadData(cultureData);
        }
      });
    };

    onUpdated(()=>{
        if(pageLoading.value && cultureData.list.length > 0){
            store.commit("mainStore/hideLoading", false);
            pageLoading.value = false;
            instance.proxy.$wow.init();
        };
    })

    const delayTime = (index)=>{
        return index % 2 === 0 ? '0.1s' : 0;
    }

    onMounted(() => {
      getBanner();
      loadData(cultureData)
      initScroll(cultureData);
    });

    return {
      cultureData,
      iloader,
      loading,
      delayTime
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
