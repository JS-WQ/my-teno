<template>
  <div class=''>
    <div
      class="groupBanner"
      v-if="groupData.banner.categoryid"
    >
      <div
        class="img"
        :style="{backgroundImage: `url(${groupData.banner.img_url})`}"
      ></div>
      <h2 class="h2-100">{{groupData.banner.title}}</h2>
    </div>
    <div
      class="groupScreen2"
      v-if="groupData.banner.categoryid"
    >
      <div class="module-title wow fadeInUp">
        <img src="../images/png/myteno-icon.png">
        <h2>About Group</h2>
        <span></span>
        <h5>关于集团</h5>
      </div>
      <ul
        class="textBox wow fadeInUp"
        v-html="setImgStr(groupData.banner.content)"
      ></ul>
      <div class="imgBox">
        <ul class="imgWrapper">
          <li class="left">
            <h3 class="h3-50">{{groupData.banner.title_en}}</h3>
            <img :src="groupData.banner.albums[0].original_path">
          </li>
          <li class="right">
            <div>
              <div
                class="img1"
                :style="{backgroundImage:`url(${groupData.banner.albums[1].original_path})`}"
              >
                <img :src="groupData.banner.albums[1].original_path">
              </div>
              <div
                class="img2"
                :style="{backgroundImage:`url(${groupData.banner.albums[2].original_path})`}"
              >
                <img :src="groupData.banner.albums[2].original_path">
              </div>
            </div>
            <img :src="groupData.banner.albums[3].original_path">
          </li>
        </ul>
      </div>
    </div>
    <div class="groupScreen3">
      <div class="module-title wow fadeInUp">
        <h2>MY TENO</h2>
        <span></span>
        <h6>“ 马天奴时尚集团旗下拥有三个品牌，分别是MYTENO、LADANUM、KODICE。”</h6>
      </div>
      <ul class="brandList">
        <li
          v-for="(item,idx) in groupData.list"
          :key="item.id"
        >
          <div
            class="textBox wow fadeInLeft"
            v-if="idx % 2 === 0"
          >
            <div v-html="setImgStr(item.content)"></div>
            <template v-if="checkLink(item.link_url)">
              <a
                :href="item.link_url"
                target="_blank"
              >探索</a>
            </template>
            <router-link
              v-else
              :to="{name:getRoutName(item.link_url),params:{id:getRoutId(item.link_url)}}"
            >探索</router-link>
          </div>
          <div class="imgBox wow fadeInRight">
            <img :src="item.img_url">
          </div>
          <div
            class="textBox wow fadeInLeft"
            v-if="idx % 2 !== 0"
          >
            <div v-html="setImgStr(item.content)"></div>
            <template v-if="checkLink(item.link_url)">
              <a
                target="_blank"
                :href="item.link_url"
              >探索</a>
            </template>
            <router-link
              v-else
              :to="{name:getRoutName(item.link_url),params:{id:getRoutId(item.link_url)}}"
            >探索</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive,ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";

export default {
  data() {
    return {};
  },
  components: {},
  setup() {
    const groupData = reactive({
      banner: {},
      list: [],
    });
    const instance = getCurrentInstance();
    const store = useStore();
    const pageLoading = ref(true);

    const getData = () => {
      Promise.all([
        api.getRow({ id: 1844, title_en: 1 }),
        api.getRows({ categoryId: 531 }),
      ]).then((res) => {
        groupData.banner = res[0].data[0];
        groupData.list = res[1].data;
      });
    };

    const setImgStr = (str) => {
      return str.replace(/(\.\/assets)/gi, "https://www.myteno.com/assets");
    };

    const getRoutName = (str) => {
      return str.match(/(.*).html/)[1];
    };
    const getRoutId = (str) => {
      return str.match(/id=(.[0-9]*)/)[1];
    };
    const checkLink = (str) => {
      //判断外链
      var strReg = /http|https/;
      return strReg.test(str);
    };

    onUpdated(() => {
      if (pageLoading.value) {
        store.commit("mainStore/hideLoading", false);
        instance.proxy.$wow.init();
      }
    });

    onMounted(() => {
      getData();
    });

    return {
      groupData,
      setImgStr,
      getRoutName,
      getRoutId,
      checkLink,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
