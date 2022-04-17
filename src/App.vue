<template>
  <div class="">
    <keep-alive>
      <component :is="getPageName"></component>
    </keep-alive>
    <my-loader
      v-if="isloading"
      :name='pageName'
    ></my-loader>
    <router-view></router-view>
    <my-footer :name='pageName'></my-footer>
    <my-go-top></my-go-top>
  </div>
</template>

<script>
import api from "@/api";
import Footer from "./components/Footer/Index.vue";
import mainHeader from "./components/Header/Index.vue";
import laHeader from "./components/Header/LaHead.vue";
import teHeader from "./components/Header/TeHead.vue";
import Loader from "./components/Loader/Index.vue";
import GoTop from "./components/Gotop/Index.vue";
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "App",
  components: {
    myFooter: Footer,
    myLoader: Loader,
    myGoTop: GoTop,
    mainHeader,
    laHeader,
    teHeader,
  },
  setup() {
    const store = useStore();
    const pageName = ref("");
    const route = useRoute();

    watch(
      () => route.params,
      (toPath) => {
        store.commit("mainStore/hideLoading", true);
      },
      { immediate: true }
    );

    const getCampaignId = async () => {
      var teCampaignId = await api
        .getSubmenu({ categoryId: 547 })
        .then((res) => {
          return api.getSubmenu({ categoryId: res.data[0].id }).then((res) => {
            return res.data[0].id;
          });
        });

      var laCampaignId = await api
        .getSubmenu({ categoryId: 554 })
        .then((res) => {
          return api.getSubmenu({ categoryId: res.data[0].id }).then((res) => {
            return res.data[0].id;
          });
        });

      var headMenuImg = await api
        .getRow({ id: 2519, big_img: 1 })
        .then((res) => {
          return res.data[0].big_img;
        });

      store.dispatch("mainStore/setMainHeadData", {
        teId: teCampaignId,
        laId: laCampaignId,
        headImg: headMenuImg,
      });
      store.dispatch("teStore/setTeCampId", teCampaignId);
      store.dispatch("laStore/setTeCampId", laCampaignId);
    };

    const getPageName = computed(() => {
      var lareg = /^la/;
      var tereg = /^te/;

      if (lareg.test(route.name)) {
        pageName.value = "la";
        return laHeader;
      } else if (tereg.test(route.name)) {
        pageName.value = "te";
        return teHeader;
      } else {
        //首页不需要显示
        pageName.value = route.name === "index" ? "" : "main";
        return mainHeader;
      }
    });

    getCampaignId();

    return {
      isloading: computed(() => store.state.mainStore.isloading),
      getPageName,
      pageName,
    };
  },
};
</script>

<style>
@import url("//at.alicdn.com/t/font_2349954_55iatuk0g6.css");
</style>
