<template>
  <div>
    <el-backtop
      id="g-goTop"
      :right='initData.right'
      :bottom='initData.bottom'
      :visibility-height='initData.visibilityHeight'
    >
      <img src="../../assets/images/png/top.png">
    </el-backtop>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from '@vue/runtime-core';
export default {
  data() {
    return {};
  },
  setup() {
    const initData = reactive({
      right: 60,
      bottom: 200,
      visibilityHeight: 200,
    });

    const setData = (initData)=>{
        if(window.innerWidth < 991){
            initData.right = 10;
            initData.bottom = 86;
            initData.visibilityHeight = 350;
        }
    }

    onMounted(()=>{
        setData(initData)
    })
    return {
      initData
    };
  },
};
</script>

<style lang='scss' scoped>
//返回顶部
#g-goTop {
  
}
</style>
