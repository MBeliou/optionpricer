import ECharts from "vue-echarts";

import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";

// "async" is optional
export default async ({ Vue }) => {
  Vue.use(ECharts);
  Vue.component("v-charts", ECharts);
};
