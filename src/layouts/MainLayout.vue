<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row">
      <div class="col-md-2 col-sm-12 sidebar">
        <div
          id="github-container"
          class="text-center q-mt-md q-mx-lg cursor-pointer q-pt-sm"
          @click="navigateTo(repoLink)"
        >
          <q-img
            :src="octocat"
            style="height:50px; width:50px;"
            class="q-pd-md"
          >
          </q-img>
          <p
            class="q-mt-sm q-pb-sm"
            id="github-text"
          >See me on github!</p>
        </div>
        <q-list
          class="col-sm-6 col-md-12"
          dark
        >
          <q-item-label
            header
            id="header-sidebar"
            class="text-center q-py-sm"
          >Option Pricer</q-item-label>
          <q-separator class="q-my-md invisible"></q-separator>
          <q-item
            clickable
            v-ripple
            @click="goto('home')"
            style="color: white;"
            :class="active==='home' ? 'active-router' : ''"
          >
            <q-item-section avatar>
              <q-icon
                name="home"
                color="white"
                class="q-ml-lg"
              />
            </q-item-section>
            <q-item-section class="text-bold text-subtitle1 text-uppercase q-ml-lg">
              Home
            </q-item-section>

          </q-item>
          <q-item
            clickable
            v-ripple
            style="color: white;"
            @click="goto('news')"
            :class="active==='news' ? 'active-router' : ''"
          >
            <q-item-section avatar>
              <q-icon
                name="announcement"
                color="white"
                class="q-ml-lg"
              />
            </q-item-section>
            <q-item-section class="text-bold text-subtitle1 text-uppercase q-ml-lg">
              News
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            style="color: white;"
            @click="goto('about')"
            :class="active==='about' ? 'active-router' : ''"
          >
            <q-item-section avatar>
              <q-icon
                name="code"
                color="white"
                class="q-ml-lg"
              />
            </q-item-section>
            <q-item-section class="text-bold text-subtitle1 text-uppercase q-ml-lg">
              About
            </q-item-section>
          </q-item>

        </q-list>
      </div>
      <div class="col-md-10 col-sm-12">
        <q-page-container id="page-container">
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",
  data() {
    return {
      octocat: require("../assets/octocat.png"),
      repoLink: "https://github.com/MBeliou/optionpricer",
      active: "home"
    };
  },
  methods: {
    goto(url) {
      this.active = url;
      this.$router.push(`/${url}`);
    },
    navigateTo(url) {
      window.open(url, "_blank");
    }
  },
  beforeCreate() {
    this.$store.dispatch("INITIALIZE_STORE");
  }
};
</script>

<style lang="stylus">
#page-container {
  max-width: 1040px;
  margin: 0 auto;
}

.sidebar {
  background-color: $deep-purple-8;
}

#header-sidebar {
  color: $indigo-8;
  width: 100%;
  background-color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  font-family: 'Martel Sans', sans-serif;
}

.sidebar-router-btn {
  color: white;
  font-weight: bold;
}

.active-router {
  background: linear-gradient(90deg, $deep-purple-8, hsla(280, 79%, 73%, 0.1), 99%, white 1%);
}

#github-text {
  color: white;
  font-weight: bold;
}

#github-container {
  border-radius: 50%;
}

#github-container:hover {
  background-color: hsla(191, 63, 63, 0.2);
}

:root {
  background-color: $blue-grey-1;
}
</style>
