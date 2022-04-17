<template>
  <div class=''>
    <div class="careerBox">
      <h2 class="h2-100 wow fadeInUp">Join us</h2>
      <ul
        class="careerList"
      >
        <li
          class="careerItem wow fadeInUp"
          v-for="(item,index) in careerData.list"
          :key="item.id"
          @click="switchBox($event)"
          :data-wow-delay="index / 10 + 's'"
        >
          <div class="itemTitle">
            <span>{{item.title}}</span>
            <div class="itemBtn">
              <img src="../images/png/career-btn.png">
            </div>
          </div>
          <div
            class="itemContent"
            v-html="item.content"
          ></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive, ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import $ from 'jquery'
import { getCurrentInstance } from "vue";
import { useStore } from 'vuex';

export default {
  data() {
    return {};
  },
  components: {},
  setup() {
    const careerData = reactive({
      list: [],
    });
    const instance = getCurrentInstance();
    const store = useStore();
    const pageLoading = ref(true);

    const getBanner = () => {
      api.getRows({ categoryId: 526 }).then((res) => {
        careerData.list = res.data;
      });
    };

    const switchBox = (el)=>{
        $(el.currentTarget).toggleClass('active').find('.itemContent').slideToggle()
    }

    onUpdated(()=>{
        if(pageLoading.value){
            store.commit("mainStore/hideLoading", false);
            pageLoading.value = false;
            instance.proxy.$wow.init();
        };
    })

    onMounted(()=>{
        getBanner()
    })
    
    return {
      careerData,
      switchBox
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
