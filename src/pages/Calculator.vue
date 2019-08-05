<template>
  <q-page padding>
    <q-card
      class="q-mb-lg banner-pwa bg-positive"
      v-show="seeBanner"
      dark
    >
      <q-card-section class="q-py-sm">
        <q-item class="q-px-lg">
          <q-item-section
            avatar
            class="q-pl-lg"
          >
            <q-icon name="signal_wifi_off">
            </q-icon>
          </q-item-section>
          <q-item-section class="text-weight-medium text-center banner-text">
            <div>You can still use me once you go offline. Try it out!</div>
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              dense
              round
              icon="close"
              color="lime-1"
              @click="seeBanner=false"
            />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="card-header"></div>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-md-4 col-sm-12">
          <q-form
            @submit="onSubmit"
            class="q-mx-md"
          >
            <q-input
              label="Underlying Price"
              v-model.number="underlying"
              min=0
              step="0.01"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid number']"
            >
            </q-input>
            <q-input
              label="Time to expiry"
              min=0
              hint="In days"
              v-model.number="expiry"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid expiration time']"
            />
            <q-input
              label="Strike"
              step="0.01"
              min=0
              v-model.number="strike"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid strike']"
            >
            </q-input>
            <q-input
              label="Interest Rates"
              hint="As Percent"
              step="0.01"
              min=0
              v-model.number="rate"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid rate']"
            />
            <q-input
              label="Volatility"
              hint="As Percent"
              step="0.01"
              min=0
              v-model.number="volatility"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid volatility']"
            />
            <q-item>
              <q-item-section>
                <q-btn-toggle
                  v-model="optionType"
                  toggle-color="primary"
                  :options="[
        {label: 'Call', value: 'call'},
        {label: 'Put', value: 'put'},
      ]"
                />
              </q-item-section>
              <q-item-section>
                <q-btn
                  label="Calculate"
                  type="submit"
                  color="primary"
                />
              </q-item-section>
            </q-item>
          </q-form>
        </div>
        <div class="col-md-8 col-sm-12">
          <graph :input="graphValues"></graph>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { BlackScholes } from "../utils/bs2";
import { genBuyCall, genBuyPut } from "../utils/options";

export default {
  name: "CalculatorPage",
  components: {
    graph: () => import("../components/Payout/Graph.vue")
  },
  data() {
    return {
      seeBanner: true,
      underlying: 16.8,
      expiry: 10,
      strike: 16,
      optionType: "call",
      rate: 5,
      volatility: 5,

      graphValues: {},
      optionPrice: 0
    };
  },
  methods: {
    onSubmit() {
      // Will automatically check the form values before going further

      const bs = BlackScholes(
        this.underlying,
        this.strike,
        this.expiry / 365,
        this.rate / 100,
        this.volatility / 100
      );

      if (this.optionType === "call") {
        this.optionPrice = bs["call"];
        this.graphValues = genBuyCall(this.strike, this.underlying, bs["call"]);
      } else {
        this.optionPrice = bs["put"];
        this.graphValues = genBuyPut(this.strike, this.underlying, bs["put"]);
      }
    }
  },
  mounted() {
    this.onSubmit();
  }
};
</script>

<style lanng="stylus">
.banner-pwa {
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
}

.banner-text {
  font-size: 16px;
}
</style>
