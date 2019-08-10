<template>
  <q-card
    class="news-card"
    @click="navigateTo(link)"
  >
    <q-card-section style="min-height: 50px; max-height:50px;">
      <div class="news-card-title text-center text-no-wrap">
        {{title}}
      </div>
    </q-card-section>
    <q-separator
      color="indigo"
      style="height:2px;"
      inset
    />
    <q-card-section style="min-height: 90px; max-height:120px;">
      {{description}}
    </q-card-section>
    <q-card-section class="text-right news-card-footer">
      By <a
        :href="sourceLink"
        target="_blank"
      >{{ source }}</a> ~ {{date}}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "NewsCard",
  props: {
    NewsItem: { type: Object, default: () => {} }
  },
  computed: {
    title() {
      return this.NewsItem.title || "";
    },
    date() {
      const timeDiff =
        (new Date() - new Date(this.NewsItem.date)) / 1000 / 3600;
      const hours = Math.floor(timeDiff);
      const minutes = ((timeDiff - hours) * 60).toFixed(0);
      if (hours < 1) {
        return `${minutes} minutes ago`;
      } else {
        return `${hours} hours, ${minutes} minutes ago`;
      }

      // return this.NewsItem.date.toLocaleString() || 0;
    },
    link() {
      return this.NewsItem.link || "";
    },
    guid() {
      return this.NewsItem.guid || "";
    },
    description() {
      return this.NewsItem.description || "";
    },
    source() {
      return this.NewsItem.source || "";
    },
    sourceLink() {
      return this.NewsItem.sourceLink || "";
    }
  },
  methods: {
    navigateTo(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style lang="stylus">
.news-card:hover {
  background-color: $indigo-1;
  cursor: pointer;
}

.news-card-title {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.05em;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
}

.news-card-footer {
  color: grey;
  font-weight: bold;
  font-size: 12px;
}

.news-card-footer a {
  color: $indigo-10;
  text-decoration: none;
}
</style>
