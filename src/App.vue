<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Farm Hub</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height main-background" fluid>
        <v-row align="center" justify="center" class="align-self-start">
          <v-col cols="12"><h1>Welcome,</h1></v-col>
          <v-col cols="12"><v-divider /></v-col>
          <v-col cols="12" align="center" justify="center">
            <FarmInput v-on:refreshFarms="getFarms" />
          </v-col>
          <v-col cols-12>
            <v-row align="center" justify="center" class="align-self-start">
              <v-col cols="12"><h3>Your farms</h3></v-col>
              <v-col cols="12"><v-divider /></v-col>
              <v-col v-for="n in farms" :key="n.index" cols="3" class="shrink">
                <v-card class="mx-auto">
                  <v-img src="@/assets/card-farm.jpg" class="align-end">
                    <v-card-title> {{ n.farm_name }}</v-card-title>
                  </v-img>
                  <v-card-text>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          ><h4>
                            Coords : {{ n.farm_center }}
                            <h5></h5>
                          </h4>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          ><h4>Crop Type : {{ n.corp_type }}</h4>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <h4>Sustainable :</h4>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <v-icon large :color="n.sustainable ? 'green' : 'red'">
                          {{
                            n.sustainable
                              ? "mdi-check-circle"
                              : "mdi-close-circle"
                          }}</v-icon
                        >
                      </v-list-item-icon>
                    </v-list-item>
                    <!-- <h4>Coords : <h5> {{ n.farm_center }}</h5></h4> 
                      <h4>Crop Type :</h4> {{ n.corp_type }} <br />
                      <h4>Sustainable :</h4> {{ }} <v-icon large :color="n.sustainable ? 'green' : 'red'"> {{n.sustainable ? 'mdi-check-circle': 'mdi-close-circle'}}</v-icon> -->
                    <!--<apexchart
                  type="line"
                  height="350"
                  width="500"
                  :options="chartOptions"
                  :series="series"
                />-->
                  </v-card-text>
                  <v-card-actions> </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios2 from "axios";
import FarmInput from "@/views/FarmInput";

export default {
  components: {
    FarmInput
  },
  props: {
    source: String
  },
  data: () => ({
    farms: [],
    drawer: null,
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    chartOptions: {
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      chart: {
        height: 350,
        background: "#424242",
        zoom: {
          enabled: false
        },
        fontFamily: "Oxygen, Arial, sans-serif"
      },
      theme: {
        mode: "dark"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    }
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  mounted() {
    this.getFarms();
  },
  methods: {
    async getFarms() {
      try {
        const gottenFarms = await axios2.get(
          "http://10.0.0.93:8000/post/farms/"
        );
        this.farms = gottenFarms.data;
        console.log(gottenFarms);
      } catch (error) {
        console.log(error);
      }
    }
    /* async sendCords() {
      try {
        const res = await axios.post("http://10.0.0.86:8000/post/farms-api/", [
          {
            x1: "34",
            y1: "45",
            x2: "34",
            y2: "45",
            x3: "34",
            y3: "45",
            x4: "34",
            y4: "45",
            name: "Joe Farm",
            type: "Corn"
          }
        ]);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }*/
  }
};
</script>

<style>
.main-background {
  background-image: linear-gradient(
    -225deg,
    #22e1ff 0%,
    #1d8fe1 48%,
    #625eb1 100%
  );
}
</style>
