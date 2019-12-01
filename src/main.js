import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCERuPxbcV5EdRMtIlTtUbetKtuVKFvwpc",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
