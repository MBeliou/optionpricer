<template>
  <q-page padding>
    <div class="row justify-center q-gutter-md">
      <q-card
        square
        class="about-card col-md-5 col-xs-12"
      >
        <q-card-section class="about-card-title">About Me</q-card-section>
        <q-card-section class="text-justify about-text">
          <p>I'm a french guy who used to work as a financial analyst.<br>Working with Excel's VBA proved limiting, which brought me to learning python and got me hooked to programming.<br> Some time and quite a few lines of codes later, here I am.</p>
          <p>I made this website as a way for a family member to easily price and trade commodity options, even through network issues.</p>
          <p>If you are interested, you can find more of my work over <a
              href="https://github.com/MBeliou"
              target="_blank"
              class="about-link"
            >here</a>.</p>
        </q-card-section>
      </q-card>
      <q-card
        square
        class="about-card col-md-5 col-xs-12"
      >
        <q-card-section class="about-card-title">How was this website made?</q-card-section>
        <q-card-section class="text-justify">
          <p>This website is powered by <a
              href="https://quasar.dev/"
              target="_blank"
              class="about-link"
            >Quasar</a>, a VueJS based framework following Google's <a>Material Design</a> styling.</p>
          <p>Charts are implementing a workaround using the <a
              href="https://www.tradingview.com/widget/"
              target="_blank"
              class="about-link"
            >Trading View</a> widget library while the news come straight from Google's Commodity RSS feed.</p>
          <p>Anything you think could be added to this website? <a
              href="https://github.com/MBeliou"
              target="_blank"
              class="about-link"
            >Let me know</a></p>
        </q-card-section>
      </q-card>
      <q-card
        square
        class="about-card col-md-7 col-xs-12"
      >
        <q-card-section class="about-card-title">How can this website work offline?</q-card-section>
        <q-card-section class="text-justify q-pb-none">
          <p>This website is actually a Progressive Web App (PWA), meaning that it can be cached by your browser or installed on your mobile device on your first visit.</p>
          <p>The next time you try to use the website, you'll either download the newest version or use the saved one.</p>
          <p>Want to learn more about PWAs? <a
              href="https://developers.google.com/web/progressive-web-apps/"
              target="_blank"
              class="about-link"
            >Google</a> has a developper website on the subject.</p>
        </q-card-section>
      </q-card>
      <q-card
        square
        class="about-card filled-bg col-md-3 col-xs-10"
      >
        <div
          id="update-btn"
          @click="update"
        >Update app</div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      octocat: require("../assets/octocat.png")
    };
  },
  methods: {
    update() {
      window.location.reload(true);
    }
  }
};
</script>

<style lang="stylus">
.about-card {
  margin-top: 16px;
  margin-bottom: 16px;
  border: 2px solid $deep-purple-8;
}

.about-card-title {
  color: white;
  background-color: $deep-purple-8;
  margin-bottom: 10px;
  font-weight: bold;
}

.about-text {
  line-height: 180%;
}

.about-link {
  color: $indigo-10;
  font-weight: bold;
  text-decoration: none;
}

.filled-bg {
  background-color: $deep-purple-8;
}

#update-btn {
  color: white;
  font-weight: bold;
  vertical-align: middle;
  text-align: center;
  line-height: 200px;
  width: 100%;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 18px;
}

#update-btn:hover {
  background-color: hsla(191, 63, 63, 0.2);
}
</style>
