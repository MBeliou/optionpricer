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
    <div v-else>
      Muh loading
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
    }
  }
};
</script>

<style>
</style>
