<template>
  <div id="g-loading">
    <div class="loading-gezi">
      <div class="inner">
        <i
          class="teLogo"
          style="background-image:url(../../assets/images/icons/logo-black.png)"
          v-if="name === 'te'"
        ></i>
        <i
          class="adLogo"
          style="background-image:url(../../assets/images/icons/logo-black.png)"
          v-if="name === 'la'"
        ></i>
        <i
          class="normalLogo"
          style="background-image:url(../../assets/images/icons/logo-black.png)"
          v-if="name === 'main' || name === ''"
        ></i>
        <span></span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Loader",
  data() {
    return {};
  },
  props: ["name"],
};
</script>

<style lang='scss' scoped>
</style>
