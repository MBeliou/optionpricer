<template>
  <q-page padding>
    <newsList :newsList="googleNews" />
  </q-page>
</template>

<script>
import RSSParser from "../utils/rss.js";

export default {
  name: "NewsPage",
  components: {
    newsList: () => import("../components/NewsPage/NewsList")
  },
  data() {
    return {
      parser: {},
      googleNews: []
    };
  },
  async mounted() {
    const parser = RSSParser();

    this.googleNews = await parser.getGoogleNews();
  }
};
</script>

<style>
</style>
