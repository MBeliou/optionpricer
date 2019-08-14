<template>
  <q-card
    flat
    id="chart-card"
  >
    <q-card-section v-if="!loading">
      <div id="chart-container"></div>
    </q-card-section>
    <q-card-section v-else>
      <div
        v-if="errored"
        class="text-center text-italic text-bold text-uppercase"
      >
        Couldn't connect to the chart provider...<br>
        Are you offline?
      </div>
      <div
        v-else
        class="lds-ring"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { setTimeout } from "timers";
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
    return { loading: true, errored: false };
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
    async createChartContainer(market) {
      this.loading = true;
      setTimeout(() => {
        if (this.loading) {
          this.errored = true;
        }
      }, 5000);

      /* eslint-disable-next-line no-undef, no-new, new-cap */
      let chartObject = await new TradingView.widget({
        container_id: "chart-container",
        symbol: market,
        interval: "D",
        width: "100%",
        fontColor: "rgba(101,101,101,1)",
        chartOnly: true,
        save_image: false,
        hide_legend: true
      });
      const chartIsReady = (await chartObject.id) !== null;
      if (chartIsReady === true) {
        // this.loading = false;
        const chartContainer = document.getElementById(chartObject.id);
        chartContainer.onload = () => (this.loading = false);
      }
      if (chartIsReady === false) {
        this.loading = false;
        this.errored = true;
      }
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

    this.$watch("product", product => {
      if (product) {
        this.createChartContainer();
      }
    });
  }
};
</script>

<style lang="stylus">
.lds-ring {
  margin: auto auto;
  padding-top: 10%;
  width: 86px;
  height: 86px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid $deep-purple-10;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: $deep-purple-8 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#chart-card {
  background-color: $blue-grey-1;
}
</style>
