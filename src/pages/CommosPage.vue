<template>
  <q-page padding>
    <div
      id="container-button-commo"
      class="row q-pb-md justify-center "
    >
      <div
        v-for="(commo, index) in commodities"
        v-bind:key="index"
        @click="setSelected(commo)"
        class="button-commo cursor-pointer col-xs-3 col-md q-mx-xs q-mb-xs"
        :class="{'active-commo': commo===selected}"
      >
        <div
          class="text-button-commo"
          :class="{'active-commo-text': commo===selected}"
        >{{commo}}</div>
      </div>
    </div>

    <div
      class="col-md-12"
      id="chart-container"
    >
      <tvchart :product="selected"></tvchart>
    </div>
  </q-page>
</template>

<script>
const COMMODITIES_NAMES = [
  "Gold",
  "Silver",
  "Oil",
  "Palladium",
  "Wheat",
  "Corn",
  "Sugar",
  "Soybeans"
];

export default {
  name: "CommoditiesPage",
  components: {
    tvchart: () => import("../components/Commodities/TVChart")
  },
  data() {
    return {
      commodities: COMMODITIES_NAMES,
      selected: "Gold"
    };
  },
  methods: {
    setSelected(product) {
      this.selected = product;
    }
  }
};
</script>

<style lang="stylus">
.button-commo {
  background-color: $deep-purple-8;
  width: 125px;
  height: 50px;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
}

.button-commo:before {
  display: inline-block;
  vertical-align: middle;
}

.button-commo:hover:not(.active-commo) {
  background-color: hsla(258, 58%, 42%, 0.6);
}

.text-button-commo {
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  vertical-align: middle;
  width: 100%;
  padding-bottom: 5px;
  padding-top: 10px;
}

#chart-container {
  min-height: 400px;
}

.active-commo {
  background-color: white;
  border: 2px solid $deep-purple-8;
  vertical-align: middle;
}

.active-commo-text {
  color: $deep-purple-8;
}

#commo-title {
  color: $deep-purple-8;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
}
</style>
