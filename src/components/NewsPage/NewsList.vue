<template>
  <div>
    <div
      v-if="!loading"
      class="row justify-center"
    >
      <newsCard
        v-for="(newsItem, index) in newsList"
        v-bind:key="index"
        :NewsItem="newsItem"
        class="col-md-5 col-sm-12 q-ma-sm"
      />
    </div>
    <div
      v-else
      style="min-height:500px;"
    >
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsList",
  components: {
    newsCard: () => import("./NewsCard")
  },
  props: {
    newsList: { type: Array, default: () => [] }
  },
  computed: {
    loading() {
      return this.newsList.length === 0;
      // return true;
    }
  }
};
</script>

<style lang="stylus">
.lds-ring {
  margin: auto auto;
  padding-top: 10%;
  width: 86px;
  height: 86px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid $indigo-8;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: $indigo-8 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
