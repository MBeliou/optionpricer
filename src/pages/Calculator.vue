<template>
  <q-page padding>
    <q-card
      class="q-mb-md q-mt-sm banner-pwa"
      v-show="seeBanner"
      dark
    >
      <q-card-section class="q-py-xs">
        <q-item class="q-px-lg q-py-none">
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
    <q-card
      flat
      id="card-calculator"
    >
      <q-card-section class="row">
        <div class="col-md-4 col-xs-12 q-px-md">

          <q-form
            @submit="onSubmit"
            class="q-px-lg q-py-lg"
            id="input-form"
          >
            <div class="text-center q-mb-md">
              <q-btn-toggle
                v-model="optionType"
                toggle-color="deep-purple-8"
                :options="[
        {label: 'Call', value: 'call'},
        {label: 'Put', value: 'put'},
      ]"
              />
            </div>
            <q-input
              label="Underlying Price"
              dense
              v-model.number="underlying"
              color="deep-purple-8"
              min=0
              step="0.01"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid number']"
            >
            </q-input>
            <q-input
              label="Strike"
              dense
              step="0.01"
              color="deep-purple-8"
              min=0
              v-model.number="strike"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid strike']"
            >
            </q-input>
            <q-input
              label="Time to expiry"
              dense
              min=0
              color="deep-purple-8"
              suffix="Days"
              v-model.number="expiry"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid expiration time']"
            />

            <q-input
              label="Interest Rates"
              dense
              suffix="%"
              step="0.01"
              color="deep-purple-8"
              min=0
              v-model.number="rate"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid rate']"
            />
            <q-input
              label="Volatility"
              dense
              suffix="%"
              color="deep-purple-8"
              step="0.01"
              min=0
              v-model.number="volatility"
              :rules="[val => val && val !== 0 && typeof val === 'number' || 'Please enter a valid volatility']"
            />
            <div class="text-center">
              <q-btn
                label="Calculate"
                type="submit"
                color="deep-purple-8"
                class="text-bold"
              />
            </div>
            <q-separator class="q-my-sm invisible" />
            <div
              id="option-container"
              class="col-12 text-center q-pa-sm"
            >
              This option is worth: <br>{{ optionPrice.toFixed(2) }} $
            </div>
          </q-form>
        </div>
        <q-space />
        <div class="col-md-8 col-xs-12">
          <graph
            :input="graphValues"
            class="q-pa-sm col-12"
          ></graph>
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
      underlying: 100,
      expiry: 30,
      strike: 100,
      optionType: "call",
      rate: 5,
      volatility: 25,

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

<style lang="stylus">
.banner-pwa {
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
  background-color: $deep-purple-8;
}

#input-header {
  color: $deep-purple-8;
  background-color: $blue-grey-1;
  border-radius: 25px;
  max-width: 150px;
  margin: 0 auto;
  margin-bottom: 8px;
  font-family: 'Martel Sans', sans-serif;
}

#input-form {
  color: $deep-purple-8;
  background-color: $blue-grey-1;
  letter-spacing: 0.05em;
  border-radius: 25px;
  margin: 0 auto;
  margin-bottom: 8px;
}

#option-container {
  color: $deep-purple-8;
  text-transform: uppercase;
  font-weight: bold;
  background-color: white;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 25px;
  border: 1px solid $deep-purple-8;
}

#card-calculator {
  border-radius: 25px;
}

.banner-text {
  font-size: 16px;
}
</style>
