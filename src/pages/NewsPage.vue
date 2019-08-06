<template>
  <q-page padding>
    <div class="q-my-sm">
      <q-card
        class="text-center"
        id="header-news"
      >
        <q-card-section>
          {{lastUpdated}}
        </q-card-section>
      </q-card>
    </div>
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
    return {};
  },
  computed: {
    timestamp() {
      return this.$store.getters["GET_TIMESTAMP"];
    },
    lastUpdated() {
      const timestamp = this.timestamp;
      if (timestamp === 0) {
        return "Querying the latest news...";
      }
      const dateString = new Date(timestamp).toLocaleString();
      const text = `Last update on ${dateString}`;
      return text;
    },
    googleNews() {
      return this.$store.getters["GET_GOOGLE_NEWS"];
    }
  },
  methods: {
    async updateGoogleNews() {
      // Check last update
      const delay = 30 * 1000; // 30 seconds
      const now = Date.now();
      if (now < this.timestamp + delay) {
        // Not enough delay
        console.log("not enough delay to update store");
        return;
      }
      const parser = RSSParser();
      const news = await parser.getGoogleNews();
      this.$store.dispatch("SET_GOOGLE_NEWS", news);
      this.$store.dispatch("SET_TIMESTAMP", now);
    }
  },
  async mounted() {
    this.updateGoogleNews();
  }
};
</script>

<style lang="stylus">
#header-news {
  background-color: $indigo-8;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  max-width: 600px;
  margin: 0 auto;
}
</style>
