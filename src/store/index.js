/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Actions and mutations
const INITTIALIZE_STORE = "INITIALIZE_STORE";
const SET_GOOGLE_NEWS = "SET_GOOGLE_NEWS";
const SET_TIMESTAMP = "SET_TIMESTAMP";

// State
const TIMESTAMP = "TIMESTAMP";
const GOOGLE_NEWS = "GOOGLE_NEWS";

// Getters
const GET_TIMESTAMP = "GET_TIMESTAMP";
const GET_GOOGLE_NEWS = "GET_GOOGLE_NEWS";

const state = {
  [TIMESTAMP]: 0,
  [GOOGLE_NEWS]: []
};

const actions = {
  [INITTIALIZE_STORE]: ({ commit }) => {
    commit(INITTIALIZE_STORE);
  },
  [SET_GOOGLE_NEWS]: ({ commit }, news) => {
    commit(SET_GOOGLE_NEWS, news);
  },
  [SET_TIMESTAMP]: ({ commit }, timestamp) => {
    commit(SET_TIMESTAMP, timestamp);
  }
};

const getters = {
  [GET_TIMESTAMP]: state => state[TIMESTAMP],
  [GET_GOOGLE_NEWS]: state => state[GOOGLE_NEWS]
};

const mutations = {
  INITIALIZE_STORE: state => {
    const fromStorage = localStorage.getItem("store");
    if (fromStorage) {
      Object.assign(state, JSON.parse(fromStorage));
    }
  },
  SET_GOOGLE_NEWS: (state, news) => {
    state[GOOGLE_NEWS] = news;
  },
  SET_TIMESTAMP: (state, timestamp) => {
    state[TIMESTAMP] = timestamp;
  }
};

export default function() {
  const Store = new Vuex.Store({
    state,
    actions,
    getters,
    mutations
  });

  Store.subscribe((mutation, state) => {
    console.log("Mutation detected. Saving store");
    localStorage.setItem("store", JSON.stringify(state));
  });
  return Store;
}
