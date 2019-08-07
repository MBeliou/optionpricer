<template>
  <q-card id="chart-container"></q-card>
</template>

<script>
const MARKETS = {
  Gold: "FX_IDC:XAUUSD",
  Silver: "TVC:SILVER",
  Oil: "TVC:USOIL",
  Palladium: "TVC:PALLADIUM",
  Wheat: "OANDA:WHEATUSD",
  Corn: "OANDA:CORNUSD",
  Sugar: "OANDA:SUGARUSD",
  Soybeans: "OANDA:SOYBNUSD"
};

export default {
  name: "TVChart",
  data() {
    return {};
  },
  props: {
    product: { type: String, default: "Gold" }
  },
  computed: {
    usedMarket() {
      return MARKETS[this.props] || MARKETS["Gold"];
    }
  },
  methods: {
    loadTradingView() {
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://s3.tradingview.com/tv.js";
      scriptTag.setAttribute("type", "text/javascript");
      scriptTag.id = "tv-chart";

      document.getElementsByTagName("head")[0].appendChild(scriptTag);

      scriptTag.onload = () => {
        this.createChartContainer(this.usedMarket);
      };
    },
    createChartContainer(market) {
      console.log("createchartcontainer for:", market);
      /* eslint-disable-next-line no-undef, no-new, new-cap */
      new TradingView.widget({
        container_id: "chart-container",
        symbol: market,
        interval: "D",
        width: "100%",
        fontColor: "rgba(101,101,101,1)",
        chartOnly: true,
        save_image: false,
        hide_legend: true
      });
    }
  },
  mounted() {
    const chartHead = document.getElementById("tv-chart");
    if (!chartHead) {
      this.loadTradingView();
    } else {
      chartHead.onload = () => {
        this.createChartContainer(this.usedMarket);
      };
    }

    this.$watch(
      "product",
      product => {
        if (product) {
          this.createChartContainer();
          // this.createChartContainer(this.createMarkets()[0]);
          // this.createChartContainer("BTCUSD");
        }
      },
      { immediate: true }
    );
  }
};
</script>

<style>
</style>
