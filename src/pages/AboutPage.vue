<template>
  <q-page
    padding
    class="row"
  >
    <div class="col-8">
      <q-card class="about-card">
        <q-card-section>About Me</q-card-section>
        <q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="about-card">
        <q-card-section>How can this website work offline?</q-card-section>
        <q-card-section>
          This website is actually a Progressive Web App (PWA), meaning that it uses all the recent features of web browsers such as Chrome or Firefox to "install" the website on your device, allowing for a convenient, fast and secure cross-platform experience.
        </q-card-section>
      </q-card>
    </div>
    <div
      class="col-4"
      id="side-container"
      style="height: 100%;"
    >
      placeholder
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AboutPage"
};
</script>

<style lang="stylus">
.about-card {
  max-width: 560px;
  margin-top: 20px;
}

#side-container {
  background-color: white;
  height: 100%;
}
</style>
