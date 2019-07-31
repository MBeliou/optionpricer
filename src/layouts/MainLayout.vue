<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Option Pricer
        </q-toolbar-title>

        <div>Supercharge your trading</div>
      </q-toolbar>
    </q-header>

    <q-page-container id="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",
  data() {
    return {};
  }
};
</script>

<style lang="stylus">
#page-container {
  max-width: 1080px;
  margin: 0 auto;
}

:root {
  background-color: $blue-grey-1;
}
</style>
