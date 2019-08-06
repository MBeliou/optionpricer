<template>
  <v-charts
    :options="chartData"
    autoresizes
    style="width:100%; height: 100%; min-height:400px;"
  ></v-charts>
</template>

<script>
export default {
  name: "PayoutGraph",
  props: {
    input: { type: Object, default: () => {} }
  },
  data() {
    return {
      grid: {
        top: 20,
        bottom: 20,
        left: 30,
        right: 30
      },
      tooltip: {
        trigger: "axis",
        formatter: "{b0}: {c0}$<br />{b1}: {c1}$"
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false
        }
      }
    };
  },
  computed: {
    optionPayoff() {
      try {
        return Object.keys(this.input["profitOption"]).length > 0
          ? this.input["profitOption"]
          : [];
      } catch {
        return [];
      }
    },
    underlyingPayoff() {
      try {
        return Object.keys(this.input["payoffUnderlying"]).length > 0
          ? this.input["payoffUnderlying"]
          : [];
      } catch {
        return [];
      }
    },
    xAxis() {
      let data = [];
      try {
        data =
          Object.keys(this.input["pricesUnderlying"]).length > 0
            ? this.input["pricesUnderlying"]
            : [];
      } catch {
        data = [];
      }

      return {
        type: "category",
        data: data,
        boundaryGap: true
      };
    },
    chartData() {
      return {
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        tooltip: this.tooltip,
        grid: this.grid,
        areaStyle: this.areaStyle,
        series: [
          {
            name: "Option Payoff",
            data: this.optionPayoff,
            type: "line",
            smooth: false,
            tooltip: {
              trigger: "axis"
            }
          },
          {
            name: "Payoff Underlying",
            data: this.underlyingPayoff,
            type: "line",
            smooth: false,
            tooltip: {
              trigger: "axis"
            }
          }
        ]
      };
    }
  }
};
</script>

<style>
</style>
