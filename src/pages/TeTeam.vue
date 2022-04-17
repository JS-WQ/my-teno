<template>
  <div class=''>
    <div class="teTeamScreen1">
      <div class="title-100">
        <p>Our team</p>
        <h2 class="h2-100">Design team</h2>
        <span></span>
      </div>
      <ul class="content">
        <li class="wow fadeInLeft">
          <img :src="teamData.design.img_url">
        </li>
        <li class="wow fadeInRight">
          <h3 class="h3-50">{{teamData.design.title}}</h3>
          <div v-html="teamData.design.content"></div>
        </li>
      </ul>
    </div>
    <div class="teTeamScreen2">
      <div class="left">
        <h3 class="h3-50">ITALIAN STUDIO</h3>
        <div
          class="imgItem"
          v-for="item in teamData.leftAlbums"
        >
          <img :src="item.original_path">
        </div>
      </div>
      <div class="right">
        <div
          class="imgItem"
          v-for="item in teamData.rightAlbums"
        >
          <img :src="item.original_path">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive, ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  setup() {
    const teamData = reactive({
      design: {},
      leftAlbums: [],
      rightAlbums: [],
    });
    const pageLoading = ref(true);

    const store = useStore();

    const getData = () => {
      Promise.all([api.getRow({ id: 1913 }), api.getRow({ id: 1914 })]).then(
        (res) => {
          teamData.design = res[0].data[0];
          teamData.leftAlbums = res[1].data[0].albums.slice(0, 3);
          teamData.rightAlbums = res[1].data[0].albums.slice(3);
        }
      );
    };

    onMounted(() => {
      getData();
    });

    onUpdated(() => {
      if (pageLoading.value) {
        store.commit("mainStore/hideLoading", false);
        pageLoading.value = false;
      }
    });

    return {
      teamData,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
