<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row">
      <div class="col-md-2 col-sm-12 sidebar">
        <div class="text-center q-py-lg">
          <q-img
            :src="octocat"
            style="height:50px; width:50px;"
          >
          </q-img>
        </div>
        <q-list
          class="col-sm-6 col-md-12"
          padding
          dark
        >
          <q-item
            clickable
            v-ripple
            style="color: white;"
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
      octocat: require("../assets/octocat.png")
    };
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="stylus">
#page-container {
  max-width: 1080px;
  margin: 0 auto;
}

.sidebar {
  background-color: $deep-purple-8;
}

.sidebar-router-btn {
  color: white;
  font-weight: bold;
}

:root {
  background-color: $blue-grey-1;
}
</style>
